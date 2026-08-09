// src/context/CartContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, Product, WeightOption } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; weightOption: WeightOption }
  | { type: 'REMOVE_ITEM'; productId: string; weightGrams: number }
  | { type: 'UPDATE_QTY'; productId: string; weightGrams: number; quantity: number }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' };

interface CartContextValue {
  state: CartState;
  addItem: (product: Product, weightOption: WeightOption) => void;
  removeItem: (productId: string, weightGrams: number) => void;
  updateQty: (productId: string, weightGrams: number, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number; // in paise
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.product.id}-${action.weightOption.grams}`;
      const existing = state.items.findIndex(
        (i) => `${i.product.id}-${i.weightOption.grams}` === key
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + 1 };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, weightOption: action.weightOption, quantity: 1 },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(i.product.id === action.productId && i.weightOption.grams === action.weightGrams)
        ),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId && i.weightOption.grams === action.weightGrams
            ? { ...i, quantity: Math.max(0, action.quantity) }
            : i
        ).filter((i) => i.quantity > 0),
      };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback((product: Product, weightOption: WeightOption) => {
    dispatch({ type: 'ADD_ITEM', product, weightOption });
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const removeItem = useCallback((productId: string, weightGrams: number) => {
    dispatch({ type: 'REMOVE_ITEM', productId, weightGrams });
  }, []);

  const updateQty = useCallback((productId: string, weightGrams: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QTY', productId, weightGrams, quantity });
  }, []);

  const openCart = useCallback(() => dispatch({ type: 'OPEN_CART' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE_CART' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + Math.round(i.product.price * i.weightOption.priceMultiplier) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQty, openCart, closeCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
