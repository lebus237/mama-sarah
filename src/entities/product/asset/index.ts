import { type ProductCategory } from '../model/product-category'
import { Product } from '../model/product'

export const productCategoryList: Array<ProductCategory> = [
   {
      id: 'pc-1',
      designation: 'Braises',
   },
   {
      id: 'pc-2',
      designation: 'Repas complet',
   },
   {
      id: 'pc-3',
      designation: 'Bieres',
   },
   {
      id: 'pc-4',
      designation: 'Jus',
   },
]

export const productList: Array<Product> = [
   {
      id: 'p-1',
      designation: 'Product One',
      price: 1000,
      categoryId: 'pc-1',
      imageUrl: 'https://foodish-api.com/images/dosa/dosa23.jpg',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-2',
      designation: 'Product two',
      price: 1000,
      categoryId: 'pc-1',
      imageUrl: 'https://foodish-api.com/images/dessert/dessert3.jpg',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-3',
      designation: 'Product three',
      price: 1000,
      categoryId: 'pc-1',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-4',
      designation: 'Product 4',
      price: 1300,
      categoryId: 'pc-2',
      imageUrl: '/images/product-1.png',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-5',
      designation:
         'Product 4 XXX YYYYYYYYYYY VV FFFFFFFFFFFFFF xxxxxxxxxxxxxxxxxxxxxxxxx jjjjjjjjjjjjjjjjjjjjjjjjjj',
      price: 1300,
      categoryId: 'pc-2',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-6',
      designation: 'Product 4',
      price: 1300,
      categoryId: 'pc-2',
      imageUrl: 'https://iderma.s3.eu-west-1.amazonaws.com/landing/1CS7HHB6e2Xwa59aiEZ21x.jpg',
      description:
         'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-7',
      designation: 'Beer one',
      price: 1300,
      categoryId: 'pc-3',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-8',
      designation: 'Beer two',
      price: 1300,
      categoryId: 'pc-3',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-9',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-10',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-11',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-12',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-13',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-14',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-15',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
   {
      id: 'p-16',
      designation: 'Juice 0ne',
      price: 1300,
      categoryId: 'pc-4',
      imageUrl: '/images/product-1.png',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
   },
]
