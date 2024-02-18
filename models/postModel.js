const db = require('./db')

// Create
exports.createPost = (post, callback) => {
    let sql = 'INSERT INTO posts SET ?'
    db.query(sql, post, callback)
}

// Read
exports.getAllPosts = (callback) => {
    let sql = 'SELECT * FROM posts'
    db.query(sql, callback)
}

// Update
exports.updatePost = (id, post, callback) => {
    let sql = 'UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?'
    db.query(sql, [post.titulo, post.conteudo, id], callback)
}

// Delete
exports.deletePost = (id, callback) => {
    let sql = 'DELETE FROM posts WHERE id = ?'
    db.query(sql, id, callback)
}

exports.getAllPostById = (id, callback) => {
    let sql = 'SELECT * FROM posts WHERE id = ?'
    db.query(sql, id, callback)
}
