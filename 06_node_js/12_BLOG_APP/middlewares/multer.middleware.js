const multer = require("multer")
const path = require("path")

function fileUpload(folderName) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(`./public/${folderName}/`))
        },
        filename: function (req, file, cb) {
            const fileName = `IMG-${Date.now()}-${file.originalname}`
            cb(null, fileName)
        }
    })
    
    const upload = multer({ storage: storage })
    return upload
}

module.exports = {
    fileUpload
}