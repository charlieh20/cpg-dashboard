import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Header, Input, Modal, Table } from 'semantic-ui-react';
import { Customer, Product } from '../utils/interfaces';

interface AddModalProps {
    id: number,
    submit: (prod: Product) => void,
    close: () => void,
}

export const AddModal: React.FC<AddModalProps> = ({ id, submit, close }) => {
    const [name, setName] = useState('');
    const [stock, setStock] = useState<number>(0);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [newCustName, setNewCustName] = useState('');
    const [newCustPrice, setNewCustPrice] = useState('');

    useEffect(() => {
        if (id > 0) {
            setName('');
            setStock(0);
            setCustomers([]);
            setNewCustName('');
            setNewCustPrice('');
        }
    }, [id]);

    const handleClose = () => {
        setName('');
        setStock(0);
        setCustomers([]);
        setNewCustName('');
        setNewCustPrice('');
        close();
    }

    const handleSubmit = () => {
        const newProduct: Product = {
            id: id,
            name: name,
            stock: stock,
            customers: customers,
        }
        submit(newProduct);
    }

    const handleStockChange = (newValue: string) => {
        const newNumber = parseInt(newValue.replace(/\D/g, ''));
        setStock(newNumber);
    }

    const handlePriceChange = (newValue: string) => {
        let newNumber = newValue.replace(/\D/g, '');
        if (newNumber.length == 0) {
            newNumber = '000'
        } else if (newNumber.length == 1) {
            newNumber = '00' + newNumber
        } else if (newNumber.length == 2) {
            newNumber = '0' + newNumber
        }
        setNewCustPrice('$' + newNumber.slice(0, -2) + '.' + newNumber.slice(-2));
    }

    const addCustomer = () => {
        const newCustomerId = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
        const newCustomer: Customer = {
            id: newCustomerId,
            name: newCustName,
            prices: [{
                id: 1,
                price: newCustPrice,
                date: new Date(),
            }],
        }
        setCustomers([...customers, newCustomer]);
    }

    return (
        <Modal open={id > 0}>
            <Modal.Header>
                Add Product
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
                    <Header>Customers</Header>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell content={'Customer'} />
                                <Table.HeaderCell content={'Unit Price'} />
                                <Table.HeaderCell content={'Add'} />
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customers.map((cust: Customer, index: number) => (
                                <Table.Row key={index}>
                                    <Table.Cell content={cust.name} />
                                    <Table.Cell colSpan={2} content={cust.prices[0].price} />
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.Cell>
                                    <Input
                                        placeholder='Customer name...'
                                        value={newCustName}
                                        onChange={(e) => setNewCustName(e.target.value)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        placeholder='Unit price...'
                                        value={newCustPrice}
                                        onChange={(e) => handlePriceChange(e.target.value)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        color='olive'
                                        onClick={addCustomer}
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