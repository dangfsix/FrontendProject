export interface Category {
    id: number;
    name: string;
    img: string
}

export interface Product {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    img: string;
    saleDate: string;
    totalBuy: number;
    ratingScore: number;
    brand: string;
    imgs: string[];
    ratingNumber: number;
    oldPrice: number;
    timeToDelivery: string;
    status: string;
    quantity: number;
    description: string
}

export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    phone: string;
    gender: number;
    address: string;
    password: string
}

export interface ProductInCart {
    productId: number;
    wantedQuantity: number;
}

export interface Cart {
    userId: number;
    productList: ProductInCart[];
}

export interface ProductInOrder {
    productId: number;
    wantedQuantity: number;
    historicalPrice: number;
}

export interface Order {
    id: string;
    buyDate: string;
    userId: number;
    deliveryMethod: string;
    deliveryPrice: number;
    discountedPrice: number;
    productList: ProductInOrder[];
}
