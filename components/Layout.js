 import React, { useContext } from 'react';
 import Head from 'next/head';
 import NextLink from 'next/link';
 import {
   AppBar,
   Toolbar,
   Typography,
   Container,
   Link,
   createTheme,
   ThemeProvider,
   CssBaseline,
   Switch,
   Badge,
   IconButton,
 } from '@mui/material';
 import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
 import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import useStyles from '../utils/styles';
 import { Store } from '../utils/Store';
 import Cookies from 'js-cookie';
 
 export default function Layout({ title, description, children }) {
   const { state, dispatch } = useContext(Store);
   const { darkMode,cart } = state;
   const theme = createTheme({
     typography: {
       h1: {
         fontSize: '1.6rem',
         fontWeight: 400,
         margin: '1rem 0',
       },
       h2: {
         fontSize: '1.4rem',
         fontWeight: 400,
         margin: '1rem 0',
       },
     },
     palette: {
      mode: darkMode ? 'dark' : 'light',
       primary: {
         main: '#f0c000',
       },
       secondary: {
         main: '#208080',
       },
     },
   });
   const classes = useStyles();
   const darkModeChangeHandler = () => {
     dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
     const newDarkMode = !darkMode;
     Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
   };
   return (
     <div>
       <Head>
         <title>{title ? `${title} -web-ecommerce.com.` : 'web-ecommerce.com.'}</title>
         {description && <meta name="description" content={description}></meta>}
       </Head>
       <ThemeProvider theme={theme}>
         <CssBaseline />
         <AppBar position="static" className={classes.navbar}>
           <Toolbar>
             <NextLink href="/" passHref>
               <Link>
                 <Typography className={classes.brand}>web-ecommerce.com.</Typography>
               </Link>
             </NextLink>
             <div className={classes.grow}></div>
             <div>
               <Switch
                 checked={darkMode}
                 onChange={darkModeChangeHandler}
               ></Switch>
               <NextLink href="/cart" passHref>
                 <Link>
                 
                 {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <IconButton color="primary" aria-label="add to shopping cart" >
                    <ShoppingCartIcon />
                  </IconButton>
                    
                    </Badge>
                  ) : (
                    <IconButton color="primary" aria-label="add to shopping cart" >
                    <ShoppingCartIcon />
                  </IconButton>
                  )}
                  </Link>

               </NextLink>
               <NextLink href="/login" passHref>
               <Link>
               <IconButton color="primary" aria-label="add to shopping cart" >
                    <AccountCircleIcon />
                  </IconButton>
                  </Link>
               </NextLink>
             </div>
           </Toolbar>
         </AppBar>
         <Container className={classes.main}>{children}</Container>
         <footer className={classes.footer}>
           <Typography>Esta  es una página creada con fines educativos. Todos los derechos reservados  web-ecommerce.com.</Typography>
         </footer>
       </ThemeProvider>
     </div>
   );
 }