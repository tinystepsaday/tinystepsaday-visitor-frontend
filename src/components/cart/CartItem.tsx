"use client"

import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/store/cartStore";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem
}) => {
  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>{item.name}</h3>
          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveItem(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
