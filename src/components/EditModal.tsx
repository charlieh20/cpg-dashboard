import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Header, Input, Modal, Table } from 'semantic-ui-react';
import { Customer, Price, Product } from '../utils/interfaces';
import { createDate, dateString } from '../utils/utils';

interface EditModalProps {
    open: boolean;
    product: Product | undefined;
    submit: (prod: Product) => void;
    close: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ open, product, submit, close }) => {
    const [name, setName] = useState('');
    const [stock, setStock] = useState<number>(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [newPriceDate, setNewPriceDate] = useState('');
    const [newPriceCust, setNewPriceCust] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setStock(product.stock);
            setCustomers(product.customers);
        } else {
            setName('');
            setStock(0);
            setCustomers([]);
        }
    }, [product]);

    const handleClose = () => {
        setName('');
        setStock(0);
        setCustomers([]);
        setNewPriceDate('');
        setNewPriceCust('');
        setNewPrice('');
        close();
    };

    const handleSubmit = () => {
        if (product) {
            const newProduct: Product = {
                id: product.id,
                name: name,
                stock: stock,
                customers: customers,
            };
            submit(newProduct);
            handleClose();
        }
    };

    const handleStockChange = (newValue: string) => {
        const newNumber = parseInt(newValue.replace(/\D/g, ''));
        setStock(newNumber);
    };

    const handlePriceChange = (newValue: string) => {
        let newNumber = newValue.replace(/\D/g, '');
        if (newNumber.length == 0) {
            newNumber = '000'
        } else if (newNumber.length == 1) {
            newNumber = '00' + newNumber
        } else if (newNumber.length == 2) {
            newNumber = '0' + newNumber
        }
        setNewPrice('$' + newNumber.slice(0, -2) + '.' + newNumber.slice(-2));
    };

    const handleAddPrice = () => {
        let date = createDate(newPriceDate);
        let past = false;
        const currentDate = new Date();
        if (date < currentDate) {
            date = currentDate;
            past = true;
        }
        for (let i = 0; i < customers.length; i += 1) {
            if (customers[i].name === newPriceCust) {
                const newPriceObj: Price = {
                    id: customers[i].prices ? customers[i].prices[customers[i].prices.length - 1].id + 1 : 1,
                    price: newPrice,
                    date: date,
                };

                let newPrices: Price[] = [];
                if (past) {
                    newPrices = [newPriceObj, ...customers[i].prices.slice(1)];
                } else {
                    newPrices = [...customers[i].prices, newPriceObj].sort(function (a, b) {
                        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
                    });
                }
                const customerCopy: Customer = {
                    id: customers[i].id,
                    name: customers[i].name,
                    prices: newPrices,
                };
                setCustomers([...customers.slice(0, i), customerCopy, ...customers.slice(i + 1, customers.length)]);
                return;
            }
        }

        const newCustomer: Customer = {
            id: customers.length ? customers[customers.length - 1].id + 1 : 1,
            name: newPriceCust,
            prices: [{
                id: 1,
                price: newPrice,
                date: date,
            }],
        };
        setCustomers([...customers, newCustomer]);
    };

    return (
        <Modal open={open}>
            <Modal.Header>
                Edit Product
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='Product Name'
                            placeholder='Product name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            label='Stock'
                            placeholder='Number in stock...'
                            value={stock}
                            onChange={(e) => handleStockChange(e.target.value)}
                        />
                    </Form.Group>
                    <Divider />
                    <Header>Price Updates</Header>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell content={'Date'} />
                                <Table.HeaderCell content={'Customer'} />
                                <Table.HeaderCell content={'Unit Price'} />
                                <Table.HeaderCell content={'Add'} />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customers.map((cust: Customer) => {
                                return cust.prices.map((price: Price, index: number) => {
                                    const currentDate = new Date();
                                    if (price.date > currentDate) {
                                        return (
                                            <Table.Row key={`${cust.id}-${index}`}>
                                                <Table.Cell content={dateString(price.date)} />
                                                <Table.Cell content={cust.name} />
                                                <Table.Cell colSpan={2} content={price.price} />
                                            </Table.Row>
                                        );
                                    }
                                    return null;
                                });
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        type="date"
                                        value={newPriceDate}
                                        onChange={(e) => setNewPriceDate(e.target.value)}
                                        required
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        placeholder='Customer name...'
                                        value={newPriceCust}
                                        onChange={(e) => setNewPriceCust(e.target.value)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        placeholder='Unit price...'
                                        value={newPrice}
                                        onChange={(e) => handlePriceChange(e.target.value)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        color='olive'
                                        onClick={handleAddPrice}
                                    >
                                        Add
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    negative
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button 
                    positive
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Modal.Actions>
        </Modal>
    );
}