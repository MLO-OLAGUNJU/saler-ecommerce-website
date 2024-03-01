"use client";

import formatPrice from "@/utils/formatPrice";
import { CartProductType } from "../product/[productid]/ProductDetails";
import Link from "next/link";
import truncateText from "@/utils/truncateText";
import Image from "next/image";
import SetQauntity from "../components/products/SetQauntity";
import { useCart } from "../hook/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 p-4 items-center bg-white">
      <div className=" col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              fill
              className=" object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className="underline text-[#747474] hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className=" justify-self-center">{formatPrice(item.price)}</div>
      <div className=" justify-self-center">
        <SetQauntity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => handleCartQtyIncrease(item)}
          handleQtyDecrease={() => handleCartQtyDecrease(item)}
        />
      </div>
      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.qauntity)}
      </div>
    </div>
  );
};

export default ItemContent;
