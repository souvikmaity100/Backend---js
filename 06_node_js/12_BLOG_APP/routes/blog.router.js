const { Router } = require("express")
const { renderAddBlog, handelAddBlog, renderSelectedBlog, handelComment } = require("../controllers/blog.controller")
const { fileUpload } = require("../middlewares/multer.middleware")

const router = Router()


router.get('/add-blog', renderAddBlog)

router.post('/', fileUpload('uploads').single('coverImage'), handelAddBlog)

router.get('/:id', renderSelectedBlog)

router.post('/comment/:blogId', handelComment)

module.exports = router