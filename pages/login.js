import {
    List,
    ListItem,
    Typography,
    TextField,
    Button,
    Link,
  } from '@mui/material';
  import NextLink from 'next/link';
  import React from 'react';
  import Layout from '../components/Layout';
  import useStyles from '../utils/styles';
  import  LoginIcon from '@mui/icons-material/Login';
  
  export default function Login() {
    const classes = useStyles();
    return (
      <Layout title="Inicio Sesion">
        <form className={classes.form}>
          <Typography component="h1" variant="h1">
            Tu cuenta
          </Typography>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Tu correo Electrónico"
                inputProps={{ type: 'email' }}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Tu contraseña"
                inputProps={{ type: 'password' }}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button variant="contained" type="submit" fullWidth color="primary" endIcon={<LoginIcon/>}>
                Inicia Sesion
              </Button>
            </ListItem>
            <ListItem>
              ¿No tienes cuenta? &nbsp;
              <NextLink href="/register" passHref>
                <Link>Regístrate</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Layout>
    );
  }
