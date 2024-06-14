import React, { useState } from 'react';
import { Product } from './utils/interfaces';
import './App.css';
import { ProductList } from './components/ProductList';
import { AddModal } from './components/AddModal';
import { EditModal } from './components/EditModal';
import { Button, Grid } from 'semantic-ui-react';

const defaultData: Product[] = [
  {
    id: 1,
    name: 'Prod1',
    stock: 123,
    customers: [
      {
        id: 1,
        name: 'Target',
        prices: [
          {
            id: 1,
            price: '$2.50',
            date: new Date(),
          },
        ]
      },
      {
        id: 2,
        name: 'Walmart',
        prices: [
          {
            id: 1,
            price: '$2.70',
            date: new Date(),
          },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Prod2',
    stock: 456,
    customers: [
      {
        id: 1,
        name: 'Costco',
        prices: [
          {
            id: 1,
            price: '$3.50',
            date: new Date(),
          },
        ]
      },
      {
        id: 2,
        name: 'Walmart',
        prices: [
          {
            id: 1,
            price: '$4.70',
            date: new Date(),
          },
        ]
      }
    ]
  }
];

const App = () => {
  const [products, setProducts] = useState<Product[]>(defaultData);
  const [adding, setAdding] = useState<number>(-1);
  const [editing, setEditing] = useState(false);
  const [editingProd, setEditingProd] = useState<Product | undefined>(undefined);

  const startEdit = (productId: number) => {
    for (let i = 0; i < products.length; i += 1) {
      if (products[i].id == productId) {
        setEditingProd(products[i]);
        setEditing(true);
        return
      }
    }
  }

  const cancelEdit = () => {
    setEditingProd(undefined);
    setEditing(false);
  }

  const confirmEdit = (newData: Product) => {
    const newProducts = products.map((prod: Product) => {
      if (prod.id === newData.id) {
        return newData
      } 
      return prod
    });

    setProducts(newProducts);
  }

  const startAdd = () => {
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    setAdding(newId);
  }

  const cancelAdd = () => {
    setAdding(-1);
  }

  const confirmAdd = (newProduct: Product) => {
    setProducts([...products, newProduct])
    setAdding(-1);
  }

  return (
    <div className='App'>
      <Grid className='Content'>
        <ProductList products={products} edit={startEdit} />

        <Button onClick={startAdd}>
          Add Product
        </Button>
      </Grid>
      <AddModal id={adding} submit={confirmAdd} close={cancelAdd} />
      <EditModal open={editing} product={editingProd} submit={confirmEdit} close={cancelEdit} />
    </div>
  );
}

export default App;