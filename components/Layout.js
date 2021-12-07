import React from 'react'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography, Link } from '@mui/material'
import useStyles from '../utils/styles'
import NextLink from 'next/link'

export default function Layout ({ children }) {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>ecommerce-web.com</title>
      </Head>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <NextLink href='/' passHref>
            <Link>
              <Typography className={classes.brand}>ecommerce-web.com</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>Carrito</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Next ecommerce.com</Typography>
      </footer>
    </div>
  )
}
