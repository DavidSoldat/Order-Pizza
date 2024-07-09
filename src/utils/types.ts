export interface Request {
  formData: () => Promise<FormData>;
}

export interface Errors {
  [key: string]: string;
}
export interface CartItemType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartState {
  cart: CartItemType[];
}

export interface ItemCart {
  item: CartItemType;
}

export interface Pizza {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

export interface PizzaProp {
  pizza: {
    id: number;
    name: string;
    unitPrice: number;
    ingredients: string[];
    soldOut: boolean;
    imageUrl: string;
  };
}
export interface FormErrors {
  phone?: string;
}

export interface CartItem {
  id: string;
  addIngredients: string[];
  removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderType {
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

export interface OrderItemProp {
  item: {
    quantity: number;
    name: string;
    totalPrice: number;
  };
  isLoadingIngredients: boolean;
  ingredients: string[];
}

export interface UserState {
  user: {
    username: string;
  };
}
export interface UserPositionState {
  user: UserPositionType;
}

export interface Styles {
  [key: string]: string;
}

export interface RouteError {
  status: number;
  data: string;
  statusText: string;
  message?: string;
}

export interface UserPositionType {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: PositionType;
  address: string;
  error?: string;
}

export interface PositionType {
  latitude: number;
  longitude: number;
}

export interface AddressType {
  address: string;
}

export interface FetchAddressResponse {
  position: PositionType;
  address: string;
}

export interface ActionParams {
  orderId: number;
}
