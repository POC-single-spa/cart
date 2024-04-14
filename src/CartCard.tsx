// @ts-ignore
import { addProduct, calculateTotal, removeProduct } from "@hbler/api";
import { IProduct } from "./interfaces/IProduct";

interface ICartCardProps {
  prod: IProduct;
  qtt: number;
}

const CartCard = ({ prod, qtt }: ICartCardProps): React.JSX.Element => {
  const { price, images, title, description } = prod;

  return (
    <article className="flex gap-2 justify-between rounded-md shadow-lg overflow-hidden">
      <picture className="max-w-40 max-h-20 overflow-hidden flex justify-center items-center">
        <img
          className="h-full w-full object-cover"
          src={images[0]}
          alt={description}
        />
      </picture>
      <div className="w-[65%] flex gap-2 justify-between items-center overflow-hidden">
        <div className="w-[50%]">
          <h4 className="text-title text-l whitespace-nowrap overflow-hidden w-[100%] text-ellipsis">
            {title}
          </h4>
        </div>
        <div>
          <h5>
            {new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </h5>
        </div>
        <div className="flex flex-col justify-stretch items-center">
          <button
            type="button"
            className="text-white bg-primaryContrast w-full px-2 py-[2.5px] rounded-bl hover:cursor-pointer hover:text-secondaryContrast"
            onClick={() => {
              addProduct(prod);
              calculateTotal();
            }}
          >
            more
          </button>
          <p className="text-sm bg-white text-center text-body-bold">x {qtt}</p>
          <button
            type="button"
            className="text-white bg-secondaryContrast w-full px-2 py-[2.5px] rounded-tl hover:cursor-pointer hover:text-primaryContrast"
            onClick={() => {
              removeProduct(prod.id);
              calculateTotal();
            }}
          >
            less
          </button>
        </div>
      </div>
    </article>
  );
};

export default CartCard;
