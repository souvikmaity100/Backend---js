import express from "express"
import cors from "cors"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs"
import { exec } from "child_process" // Watch out
import { stderr, stdout } from "process"


const app = express()

// multer middleware

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})

// multer configuration
const upload = multer({ storage: storage })



app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true
    })
)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") // Not recomended in Production
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))


app.get("/", (req, res) => {
    console.log("welcome");
    res.json({ message: "Welcome to V-Player" })
})

app.post("/upload", upload.single('file'), (req, res) => {
    const lessonId = uuidv4()
    const videoPath = req.file.path
    const outputPath = `./uploads/courses/${lessonId}`
    const hlsPath = `${outputPath}/index.m3u8`

    console.log(`hlsPath: ${hlsPath}`)

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true })
    }

    // ffmpeg cmd
    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`

    // no queue because of POC, not use in Production
    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`exec error: ${error}`)
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)

        const videoUrl = `http://localhost:8000/uploads/courses/${lessonId}/index.m3u8`;

        fs.appendFile('video_url.txt', `Video Added Time: ${Date.now()} | Video URL: ${videoUrl} \n`, (err, data) =>{
            
        })

        res.json({
            message: "Video converted to HLS format",
            videoUrl: videoUrl,
            lessonId: lessonId
          })
    })

})

app.listen(8000, () => {
    console.log("App Running at Port 8000");
})