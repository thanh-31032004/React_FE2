export interface Product {
    _id: string,
    title: string,
    image: string,
    description: string,
    category: Category,
    price: number,
    isShow: boolean
}
export interface Category {
    _id: string,
    title: string,
    description: string,

}
export type CartItem = {
    product: Product;
    quantity: number;
  };
export type Cart = {
    _id: string;
    user: string;
    products: CartItem[];
  };