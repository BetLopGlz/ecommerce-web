import Layout from '../components/Layout';
import NextLink from 'next/link';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../utils/Store';

export default function Home(props) {
const router = useRouter();
const { state, dispatch } = useContext(Store);
const { products } = props;
const addToCartHandler = async (product) => {
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await axios.get(`/api/products/${product._id}`);
  if (data.countInStock < quantity) {
    window.alert('Disculpa, el producto no se encuentra disponible');
    return;
  }
  dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  router.push('/cart');
};
  return (
    <Layout>
   <div>
     <h1>Productos</h1>
     <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <IconButton color="primary" aria-label="add to shopping cart" onClick={() => addToCartHandler(product)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
   </div>
   </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
