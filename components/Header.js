import React, { useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  Link,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { Alert } from "@material-ui/lab"

// import logo from "../images/v3.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div>
      <Box component="nav" marginBottom="1rem">
        <AppBar position="static" style={{ color: "primary" }}>
          <Toolbar>
            <IconButton aria-label="menu">
              <Link href="/">
                {" "}
                {<img src="/logo/v3.png" height="40px" alt="logo" />}
              </Link>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              OpenFreeUni
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default NavBar
