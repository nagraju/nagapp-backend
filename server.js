const express = require('express')
const userRoutes = require('./routes/user')

const cors = require('cors')
const mongoose = require('mongoose')


const app = express()

app.use(express.json())
app.use('/api/users', userRoutes)
app.use(cors())



const uri = "mongodb+srv://nag8888:Nagaraju786@nagapp-backend.xuwgvnw.mongodb.net/?appName=nagapp-backend"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

mongoose.connect(uri)
.then(()=>{
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
})

app.get('/',(req,res)=>{
    console.log("Hi..")
    res.send("okk..")
})

app.listen(process.env.PORT||8000,()=>{
console.log("running")

})