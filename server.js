require("dotenv").config();

const express = require("express")
const app = express();
const nodemailer = require("nodemailer")

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static("public"));
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./docs/index.html")
})

app.post("/", (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.GMAIL_EMAIL,
        subject: `Message from ${req.body.email}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
            res.send("error")
        } else {
            console.log("Email sent")
            res.send("success")
        }
    })
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})