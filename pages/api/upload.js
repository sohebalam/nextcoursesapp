import formidable from "formidable"
import fs from "fs"
const File = require("../../models/file")
import connectDB from "../../connectDB"
connectDB()

export const config = {
  api: {
    bodyParser: false,
  },
}

const post = async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file, fields)
    return res.status(201).json({ message: "uploaded file" })
  })
}

const saveFile = async (file, fields) => {
  const { title, description } = fields
  // console.log(file.path, file.type, title, description)
  const data = fs.readFileSync(file.path)
  fs.writeFileSync(`./public/${file.name}`, data)
  await fs.unlinkSync(file.path)

  try {
    const dbfile = new File({
      title,
      name: file.name,
      description,
      file_path: file.path,
      file_mimetype: file.type,
    })
    await dbfile.save()
    // post(req, res)
    // res.send("file uploaded successfully.")
  } catch (error) {
    console.log(error)
    // post(req, res)
    // res.status(400).send("Error while uploading file. Try again later.")
  }

  return
}

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("")
}
