const express = require("express")
const cors = require("cors")
require("dotenv").config()
require("./config/database")

const app = express()
const router = require("./routes/index")
// Middlewares
app.use(cors())
app.use(express.json())

app.use("/api", router)

app.listen(4000, () => console.log("Server listening on http://localhost:4000"))
