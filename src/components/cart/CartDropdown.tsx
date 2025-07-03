"use client"

import React from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import type { CartItem as CartItemType } from "@/store/cartStore";
import CartItem from "./CartItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CartDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ open, onOpenChange }) => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCartStore();
  const router = useRouter();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-2.5 pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Cart ({totalItems})
            </SheetTitle>
            {/* <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose> */}
          </div>
        </SheetHeader>

        <div className="flex flex-col items-center justify-center w-full h-fit">
          {items.length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto py-2 w-8/9">
                {items.map((item: CartItemType) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                  />
                ))}
              </div>

              <div className="space-y-4 mt-6 w-8/9">
                <Separator />
                <div className="flex items-center justify-between font-medium text-base">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="flex flex-col gap-2">
                  <Button className="w-full" onClick={() => {
                    onOpenChange(false);
                    router.push("/checkout");
                  }}>
                    Checkout
                  </Button>
                  <Button variant="outline" onClick={clearCart} className="w-full">
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-center mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <SheetClose asChild>
                <Button asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDropdown;
