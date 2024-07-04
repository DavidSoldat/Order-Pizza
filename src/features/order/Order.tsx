/* eslint-disable @typescript-eslint/no-unused-vars */
// Test ID: IIDSAT

import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

interface CartItem {
  addIngredients: string[];
  removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
// customer
// estimatedDelivery
// orderPrice
// priorityPrice
// status
interface Order {
  id?: string;
  customer?: string;
  estimatedDelivery?: string;
  orderPrice?: number;
  priority?: boolean;
  priorityPrice?: number;
  status?: string;
  cart?: CartItem[];
  phone?: string;
}

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order as Order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery as string);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(
                estimatedDelivery as string
              )} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery as string)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice as number)}</p>
        {priority && (
          <p>Price priority: {formatCurrency(priorityPrice as number)}</p>
        )}
        <p>
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
