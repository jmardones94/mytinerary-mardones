const express = require("express")
const cors = require("cors")
const passport = require("passport")
require("dotenv").config()
require("./config/database")
require("./config/passport")

const app = express()
const router = require("./routes/index")

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(process.env.PORT || 4000, process.env.HOST || "0.0.0.0", () =>
  console.log(`Server listening on port ${process.env.PORT || 4000}`)
)
