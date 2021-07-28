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
import { useDispatch, useSelector } from "react-redux"

// import Posts from "../components/Posts/PostList"
import Form from "../../components/ProductForm"
// import { getPosts } from "../actions/posts"
import useStyles from "../../styles"
import { deleteProduct, listProducts } from "../../redux/actions/productActions"
import { Alert } from "@material-ui/lab"
import Image from "material-ui-image"

const ProductEditPage = ({ history, match }) => {
  const [currentId, setCurrentId] = useState(0)
  const dispatch = useDispatch()
  const classes = useStyles()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success } = productDelete

  const userLogin = useSelector((state) => state.userLogin)

  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.result.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push("/login")
    }
  }, [
    history,
    userInfo,
    dispatch,
    success,

    successCreate,
    errorCreate,
    loadingCreate,
  ])

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              {loading || loadingCreate || loadingDelete ? (
                <CircularProgress />
              ) : error || errorCreate || errorDelete ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>IMAGE</TableCell>
                      <TableCell>TITLE</TableCell>
                      <TableCell>DESCRIPTION</TableCell>
                      <TableCell>PRICE</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>{product._id.substring(0, 5)}</TableCell>
                        <TableCell>
                          <Image
                            src={product.selectedFile}
                            name={product.title}
                          />
                        </TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>£{product.price}</TableCell>
                        <TableCell>
                          <Link href={`/product/${product._id}/edit`}>
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              Edit
                            </Button>
                          </Link>

                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => deleteHandler(product._id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default ProductEditPage
