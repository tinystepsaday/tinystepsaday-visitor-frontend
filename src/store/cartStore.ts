
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex((i) => i.id === item.id);
        
        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + 1,
            totalPrice: get().totalPrice + item.price
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            totalItems: get().totalItems + 1,
            totalPrice: get().totalPrice + item.price
          });
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        const itemToRemove = items.find((i) => i.id === id);
        
        if (itemToRemove) {
          set({
            items: items.filter((i) => i.id !== id),
            totalItems: get().totalItems - itemToRemove.quantity,
            totalPrice: get().totalPrice - (itemToRemove.price * itemToRemove.quantity)
          });
        }
      },
      
      updateQuantity: (id, quantity) => {
        const { items } = get();
        const itemIndex = items.findIndex((i) => i.id === id);
        
        if (itemIndex > -1) {
          const item = items[itemIndex];
          const quantityDiff = quantity - item.quantity;
          const updatedItems = [...items];
          updatedItems[itemIndex].quantity = quantity;
          
          set({
            items: updatedItems,
            totalItems: get().totalItems + quantityDiff,
            totalPrice: get().totalPrice + (item.price * quantityDiff)
          });
        }
      },
      
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
