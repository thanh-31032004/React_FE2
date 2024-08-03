import axios from "axios";
import { useCart } from "src/context/cart";
import { useUser } from "src/context/user";


import { Product } from "src/types/Product";

type AddToCart = {
    product: Product;
    quantity: number;
};

export const useProductCart = () => {
    const { user, setUser } = useUser();
    const { cart, setCart } = useCart();

    const getCartUser = async () => {
        const userStorage = localStorage.getItem("user") || "{}";
        const user = JSON.parse(userStorage);
        setUser(user);
        if (!user._id) return;
        const { data } = await axios.get(`/carts/user/${user._id}`);
        setCart(data);
    };

    const addToCart = async ({ product, quantity }: AddToCart) => {
        if (quantity <= 0 || !user) return;
        try {
            if (cart) {
                await axios.put(`/carts/${cart._id}`, {
                    product,
                    quantity,
                    user: user._id,
                });
            } else {
                await axios.post("/carts", {
                    product,
                    quantity,
                    user: user._id,
                });
            }
            const { data } = await axios.get(`/carts/user/${user._id}`);
            setCart(data);
        } catch (error) {
            console.log(error);
        }
    };
    const removeToCart = async (productId: string) => {
        if (!user) return;
        if (window.confirm("Remove Item Cart")) {
            try {
                await axios.delete(`/carts/user/${user._id}/product/${productId}`);
                getCartUser();
            } catch (error) {
                console.log(error);
            }
        }
    };
    return { addToCart, removeToCart, getCartUser };
};