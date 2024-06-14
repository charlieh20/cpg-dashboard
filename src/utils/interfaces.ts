export interface Product {
    id: number
    name: string,
    stock: number,
    customers: Customer[],
}

export interface Customer {
    id: number,
    name: string,
    prices: Price[],
}

export interface Price {
    id: number,
    price: string,
    date: Date,
}