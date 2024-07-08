/* eslint-disable @typescript-eslint/no-unused-vars */
// Test ID: IIDSAT

import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';

interface CartItem {
  id: string;
  addIngredients: string[];
  removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  id?: string;
  customer?: string;
  estimatedDelivery?: string;
  orderPrice?: number;
  priority?: boolean;
  priorityPrice?: number;
  status?: string;
  cart: CartItem[];
  phone?: string;
}

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order as Order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery as string);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(
                estimatedDelivery as string,
              )} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery as string)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice as number)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice as number)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery:{' '}
          {formatCurrency((orderPrice as number) + (priorityPrice as number))}
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({ params }) => {
  const orderId = params.orderId;
  if (!orderId) {
    throw new Error('Order ID is required');
  }
  const order = await getOrder(orderId);
  return order;
};

export default Order;
