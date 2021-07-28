const File = require("../../../models/file")
import connectDB from "../../../connectDB"
const path = require("path")

import fs from "fs"
connectDB()

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.query.id)
    if (file) {
      await file.remove()
      const filePath = `${process.cwd()}\\public\\${file.name}`
      fs.unlinkSync(filePath) // remove from public folder
      res.json({ message: "Course File removed" })
    }
  } catch (error) {
    res.status(404).json({ messsage: "Course File not found" })
  }
}

export default (req, res) => {
  req.method === "POST"
    ? console.log("POST")
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? deleteFile(req, res)
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("")
}
