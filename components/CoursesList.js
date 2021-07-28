import React, { useState, useEffect } from "react"
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  CircularProgress,
  Link,
  Button,
} from "@material-ui/core"

// import useStyles from "../../styles"

// import { Alert } from "@material-ui/lab"
import download from "downloadjs"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library, icon } from "@fortawesome/fontawesome-svg-core"

// import { faFilePdf } from "@fortawesome/free-regular-svg-icons"
import { faFileImage } from "@fortawesome/free-regular-svg-icons"
import { faFileCode } from "@fortawesome/free-regular-svg-icons"
import { deleteFileCourse, getFiles } from "../redux/fileActions"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

library.add(faFilePdf, faFileImage, faFileCode)

const CoursesList = ({}) => {
  // const classes = useStyles()
  const [filesList, setFilesList] = useState([])
  const [errorMsg, setErrorMsg] = useState("")

  const fileCreate = useSelector((state) => state.fileCreate)
  const { loading, error, file: newFile } = fileCreate

  const fileGet = useSelector((state) => state.fileGet)
  const { loading: filesLoading, files } = fileGet

  const fileDelete = useSelector((state) => state.fileDelete)
  const { loading: deleteLoading, success, error: deleteError } = fileDelete

  const dispatch = useDispatch()

  useEffect(() => {
    const getFilesList = async () => {
      try {
        // const { data } = await axios.get(`/api/getFiles`)
        dispatch(getFiles())
        setErrorMsg("")
        setFilesList(data)
      } catch (error) {
        error.response && setErrorMsg(error.response.data)
      }
    }

    getFilesList()
  }, [newFile, deleteError, deleteLoading])

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`/download/${id}`, {
        responseType: "blob",
      })
      const split = path.split("/")
      const filename = split[split.length - 1]
      setErrorMsg("")
      return download(result.data, filename, mimetype)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later")
      }
    }
  }

  const deleteHandler = async (id) => {
    dispatch(deleteFileCourse(id))
  }

  useEffect(() => {}, [newFile?.message, loading])

  return (
    <Grid item>
      {errorMsg && <Typography>{errorMsg}</Typography>}
      {loading || deleteLoading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Download File</TableCell>
              {/* {location.pathname === "/coursesadmin" && ( */}
              <TableCell>Delete</TableCell>
              {/* )} */}
            </TableRow>
          </TableHead>

          <TableBody>
            {files?.length > 0 ? (
              files.map(
                ({ _id, title, description, file_path, file_mimetype }) => (
                  <TableRow key={_id}>
                    <TableCell>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>
                      <Link
                        href="#/"
                        onClick={() =>
                          downloadFile(_id, file_path, file_mimetype)
                        }
                      >
                        Download{" "}
                        {file_mimetype.split("/").pop() === "pdf" ? (
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            width={400}
                            height={400}
                          />
                        ) : file_mimetype.split("/").pop() === "json" ? (
                          <FontAwesomeIcon
                            icon={faFileCode}
                            width={400}
                            height={400}
                          />
                        ) : file_mimetype.split("/").pop() === "document" ? (
                          <FontAwesomeIcon
                            icon={faFileCode}
                            width={400}
                            height={400}
                          />
                        ) : file_mimetype.split("/").pop() === "jpg" ? (
                          <FontAwesomeIcon
                            icon={faImage}
                            width={400}
                            height={400}
                          />
                        ) : file_mimetype.split("/").pop() === "jpeg" ? (
                          <FontAwesomeIcon
                            icon={faImage}
                            width={400}
                            height={400}
                          />
                        ) : file_mimetype.split("/").pop() === "png" ? (
                          <FontAwesomeIcon
                            icon={faImage}
                            width={400}
                            height={400}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faFile}
                            width={400}
                            height={400}
                          />
                        )}
                      </Link>
                    </TableCell>
                    {/* {location.pathname === "/coursesadmin" && ( */}
                    <TableCell>
                      <Button onClick={() => deleteHandler(_id)}>Delete</Button>
                    </TableCell>
                    {/* )} */}
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell style={{ fontWeight: "300" }}>
                  No files found. Please add some.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Grid>
  )
}

export default CoursesList
