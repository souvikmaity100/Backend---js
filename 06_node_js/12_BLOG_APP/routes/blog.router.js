const { Router } = require("express")
const { renderAddBlog, handelAddBlog, renderSelectedBlog } = require("../controllers/blog.controller")
const upload = require("../middlewares/multer.middleware")

const router = Router()


router.get('/add-blog', renderAddBlog)

router.post('/', upload.single('coverImage'), handelAddBlog)

router.get('/:id', renderSelectedBlog)

module.exports = router