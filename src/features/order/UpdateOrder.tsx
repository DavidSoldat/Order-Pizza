/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { ActionFunction, useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { OrderType } from '../../utils/types';
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrder({ order }: { order: OrderType }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// export async function action({ params }: { params: ActionParams }) {
//   const data = { priority: true };
//   await updateOrder(params.orderId, data);
//   return null;
// }

export const action: ActionFunction = async ({ params }) => {
  const { orderId } = params as { orderId: string };
  const data = { priority: true };
  await updateOrder(Number(orderId), data);
  return null;
};
