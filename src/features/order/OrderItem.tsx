/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatCurrency } from '../../utils/helpers';

interface OrderItemProp {
  item: {
    quantity: number;
    name: string;
    totalPrice: number;
  };
  isLoadingIngredients: boolean;
  ingredients: string[];
}

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemProp) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
