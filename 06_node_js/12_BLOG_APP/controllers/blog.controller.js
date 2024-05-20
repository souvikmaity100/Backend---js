const Blog = require("../models/blog.model")

const renderAddBlog = (req, res) => {
    return res.render("addBlog", {
        user: req.user
    })
}

const handelAddBlog = async (req, res) => {
    const { title, body } = req.body
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)

}

const renderSelectedBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy")
    const blogWithAuthor = {
        title: blog.title,
        body: blog.body,
        coverImageURL: blog.coverImageURL,
        author: blog.createdBy.fullName,
        profileImageURL: blog.createdBy.profileImageURL,
    }
    return res.render("blog", {
        user: req.user,
        blogWithAuthor
    })

}




module.exports = {
    renderAddBlog,
    handelAddBlog,
    renderSelectedBlog
}