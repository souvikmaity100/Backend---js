const Blog = require("../models/blog.model")
const Comment = require("../models/comment.model")

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
        _id: blog._id,
        title: blog.title,
        body: blog.body,
        coverImageURL: blog.coverImageURL,
        author: blog.createdBy.fullName,
        profileImageURL: blog.createdBy.profileImageURL,
    }
    const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy")
    
    return res.render("blog", {
        user: req.user,
        blogWithAuthor,
        comments
    })

}

const handelComment = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}




module.exports = {
    renderAddBlog,
    handelAddBlog,
    renderSelectedBlog,
    handelComment
}