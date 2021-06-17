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
