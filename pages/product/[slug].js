import React,{ useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@mui/material';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state,dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= quantity) {
      window.alert('Disculpa. Este producto no se encuentra disponible');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>regresar a catalogo</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
            <Typography component="h1" variant="h1">
                {product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Categoria: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Marca: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Descripción: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Precio</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Estatus</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary" endIcon={<AddShoppingCartIcon/>}  onClick={addToCartHandler} >
                  Agregar al carrito
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}