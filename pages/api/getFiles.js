const File = require("../../models/file")
import connectDB from "../../connectDB"
connectDB()

const getFiles = async (req, res) => {
  try {
    const files = await File.find({})
    const sortedByCreationDate = files.sort((a, b) => b.createdAt - a.createdAt)
    res.send(sortedByCreationDate)
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.")
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
    ? getFiles(req, res)
    : res.status(404).send("")
}
