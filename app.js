import express from 'express'
import mongoose from 'mongoose'
import db from './db/conn.js'
import bodyParser from 'body-parser'
import indexrouter from './routes/index.js'




const app=express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))




   app.use("/",indexrouter)



app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad requ'
    })
})



app.set('view engine','ejs')
app.set('views','./views')

app.listen(3005)

console.log("http://localhost:3005")

