const express = require("express")

let app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(8080, () => {
    console.log("this server is running on port 8080")
})