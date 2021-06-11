import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart, removeFromCart } from "../../actions";
import { NavBar } from "../../components/NavBar"
import { cartItemsSelector, cartSizeSelector } from "../../reducers";
import { CartItem } from "../../types";

const NavigationPage = () => {
    const dispatch = useDispatch();
    const items = useSelector<any, CartItem[]>(cartItemsSelector);
	const cartSize = useSelector<any, number>(cartSizeSelector);

    useEffect(() => {
		dispatch(getCart());
	}, [dispatch]);

    const addToShoppingCart = (item: CartItem) => {
        dispatch(addToCart(item));
    }

    const removeFromShoppingCart = (id: number, isAll?: boolean) => {
        dispatch(removeFromCart({ id, isAll }));
    } 

    return (
        <NavBar items={items} cartSize={cartSize} addToCart={addToShoppingCart} removeFromCart={removeFromShoppingCart} />
    )
}

export default NavigationPage;