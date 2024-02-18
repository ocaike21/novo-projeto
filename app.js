const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const methodOverride = require('method-override')
const app = express()

// Configurações de segurança
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))

// Configuração do EJS
app.set('view engine', 'ejs')

// Importar rotas
const postRoutes = require('./controllers/postController')
app.use('/posts', postRoutes)

app.listen(3000, () =>{
    console.log('Servidor rodando na porta 3000')
})