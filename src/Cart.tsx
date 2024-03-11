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
    <section className="min-h-[87vh] min-w-[30vw] shadow-inner rounded-sm p-4 relative">
      <h2 className="text-title">Cart</h2>
      {uniqueCart.length !== 0 &&
        uniqueCart.map((prod) => (
          <p key={prod.id}>
            <span>{productsQuantity[prod.id]}x </span>
            {prod.title}
          </p>
        ))}
      <div className="absolute bg-secondary bottom-0 w-[97%] px-2 py-3">
        <h4 className="text-body-medium text-lg text-white">
          Total:{" "}
          {new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
          }).format(total)}
        </h4>
      </div>
    </section>
  );
};

export default Cart;
