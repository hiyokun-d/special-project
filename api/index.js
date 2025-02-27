const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")

require("dotenv").config()

const PORT = process.env.PORT || 5173

const app = express()

app.use(cors())
app.use(bodyParser.json())

let messages = []

// METHOD POST
app.post('/send', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "There's no message to send, message is field is required" });

  messages.push(message)

  res.json({ status: "Message is recevied by the API and ready to use" })
})

app.get('/messages', (req, res) => {
  res.json({ messages })
  messages = [];
})

app.listen(PORT, () => {
  console.log(`API SIAP DI JALANIN DI PORT http://localhost:${PORT}`)
})
