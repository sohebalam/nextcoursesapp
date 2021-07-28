const File = require("../../../models/file")
import connectDB from "../../../connectDB"
const path = require("path")

import fs from "fs"
connectDB()

const fileId = async (req, res) => {
  try {
    const file = await File.findById(req.query.id)

    const filePath = `${process.cwd()}\\public\\${file.name}`

    const imageBuffer = fs.createReadStream(filePath)

    await new Promise(function (resolve) {
      res.setHeader("Content-Type", file.file_mimetype)
      imageBuffer.pipe(res)
      imageBuffer.on("end", resolve)
      imageBuffer.on("error", function (err) {
        if (err.code === "ENOENT") {
          res.status(400).json({
            error: true,
            message: "Sorry we could not find the file you requested!",
          })
          res.end()
        } else {
          res
            .status(500)
            .json({ error: true, message: "Sorry, something went wrong!" })
          res.end()
        }
      })
    })
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.")
  }
}

export default (req, res) => {
  req.method === "POST"
    ? console.log("POST")
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? fileId(req, res)
    : res.status(404).send("")
}
