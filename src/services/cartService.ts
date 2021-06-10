import { CART } from "../constants";

export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem(CART) ?? '{}');
    return cart;
}

export const setCart = (cart: any) => {
    localStorage.setItem(CART, JSON.stringify(cart));
    return;
}