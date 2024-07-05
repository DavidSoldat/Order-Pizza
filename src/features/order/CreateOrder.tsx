/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Order from "./Order";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (phone: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  interface FormErrors {
    phone?: string;
  }
  const formErrors = useActionData() as FormErrors;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" className="input" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" className="input" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" className="input" name="address" required />
          </div>
        </div>

        <div>
          <input
            className="h-6 w-6 accent-sky-400 focus:ring-offset-2 focus:outline-none focus:ring focus:ring-sky-400"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmiting}>
            {isSubmiting ? "Placing order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

interface Request {
  formData: () => Promise<FormData>;
}

interface Errors {
  [key: string]: string;
}
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: Order = {
    ...data,
    cart: typeof data.cart === "string" ? JSON.parse(data.cart) : data.cart,
    priority: data.priority === "on",
  };

  const errors: Errors = {};
  if (!isValidPhone(order.phone as string))
    errors.phone =
      "Please give us your correct phone number, we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  // If everyting is ok, create new order and redirect
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
