const express = require('express')
const { error } = require('node:console')
const app = express()
const path = require('node:path')
require('dotenv').config();


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log(`Express App Listening On Port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})