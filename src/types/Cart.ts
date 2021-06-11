import { CartItem } from "./CartItem";

export interface Cart {
    [id: number]: CartItem
}