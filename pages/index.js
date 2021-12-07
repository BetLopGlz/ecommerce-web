import Head from 'next/head';
import Image from 'next/image';
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
  Button,
} from '@mui/material';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
   <div>
     <h1>Productos</h1>
     <Grid container spacing={3}>
          {data.products.map((product) => (
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
                  <Button size="small" color="primary">
                    Añadir al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
   </div>
   </Layout>
  )
}
