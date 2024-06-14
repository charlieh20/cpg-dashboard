import React, { useState } from 'react';
import { GridRow, Header, Icon, Table } from 'semantic-ui-react'
import { Customer, Product } from '../utils/interfaces';

interface ProductListProps {
    products: Product[],
    edit: (id: number) => void,
}

export const ProductList: React.FC<ProductListProps> = ({ products, edit }) => {
    return  (
        <GridRow>
            <Header>Scheduled Appointments</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content={'Product Name'} />
                        <Table.HeaderCell content={'Stock'} />
                        <Table.HeaderCell content={'Customer'} />
                        <Table.HeaderCell content={'Unit Price'} />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {products.length === 0 ? 
                        <Table.Row>
                            <Table.Cell colSpan={4}>No products exist.</Table.Cell>
                        </Table.Row>
                        :
                        products.map((prod: Product) => {
                            if (prod.customers.length === 0) {
                                return (
                                    <Table.Row key={prod.id}>
                                        <Table.Cell>
                                            {prod.name}<Icon name='edit' onClick={() => edit(prod.id)} />
                                        </Table.Cell>
                                        <Table.Cell content={prod.stock} />
                                        <Table.Cell colSpan={2}></Table.Cell>
                                    </Table.Row>
                                );
                            }
                            let row = 1;
                            return prod.customers.map((cust: Customer, index: number) => {
                                if (row === 1) {
                                    row += 1;
                                    return (
                                        <Table.Row key={`${prod.id}-${index}`}>
                                            <Table.Cell rowSpan={prod.customers.length}>
                                                {prod.name}<Icon name='edit' onClick={() => edit(prod.id)} />
                                            </Table.Cell>
                                            <Table.Cell content={prod.stock} rowSpan={prod.customers.length} />
                                            <Table.Cell content={cust.name} />
                                            <Table.Cell content={cust.prices[0].price} />
                                        </Table.Row>
                                    );
                                }
                                return (
                                    <Table.Row key={`${prod.id}-${index}`}>
                                        <Table.Cell content={cust.name} />
                                        <Table.Cell content={cust.prices[0].price} />
                                    </Table.Row>
                                );
                            });
                        })
                    }
                </Table.Body>
            </Table>
        </GridRow>
    );
}