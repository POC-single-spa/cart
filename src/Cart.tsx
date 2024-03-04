import { useEffect, useState } from "react";

// @ts-ignore
import { cartState, calculateTotal } from "@hbler/api";
import { IProduct } from "./interfaces/IProduct";

interface QuantityControl {
  [id: string]: number;
}

const Cart = (): React.JSX.Element => {
  const [cart, updateCart] = useState<IProduct[]>(
    cartState.getState().products
  );

  const [total, updateTotal] = useState<number>(cartState.getState().total);

  const listener = cartState.subscribe(() => {
    updateCart([...cartState.getState().products]);
    updateTotal(cartState.getState().total);
  });

  const calculateQuantity = (list: IProduct[]): QuantityControl => {
    return list.reduce((count: QuantityControl, product: IProduct) => {
      count[product.id] = (count[product.id] || 0) + 1;
      return count;
    }, {});
  };

  const productsQuantity = calculateQuantity(cart);
  const uniqueCart = Array.from(
    new Set(cart.map((p) => JSON.stringify(p)))
  ).map((s) => JSON.parse(s));

  useEffect(() => {
    return () => listener();
  }, [listener]);

  return (
    <>
      <h2>Cart</h2>
      {uniqueCart.length !== 0 &&
        uniqueCart.map((prod) => (
          <p key={prod.id}>
            <span>{productsQuantity[prod.id]}x </span>
            {prod.title}
          </p>
        ))}
      <h4>
        Total:{" "}
        {new Intl.NumberFormat("us-US", {
          style: "currency",
          currency: "USD",
        }).format(total)}
      </h4>
    </>
  );
};

export default Cart;
