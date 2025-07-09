"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import { getOrderById, updateOrderStatus } from "@/data/orders";
import type { Order, OrderStatus } from "@/data/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DetailPageLoader } from "@/components/ui/loaders";
import { AlertCircle } from "lucide-react";
import { Package } from "lucide-react";

export default function EditOrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus['status']>('pending');
  const [statusNotes, setStatusNotes] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = getOrderById(orderId);
        if (orderData) {
          setOrder(orderData);
          setNewStatus(orderData.status.status);
          setStatusNotes(orderData.status.notes || '');
          setTrackingNumber(orderData.trackingNumber || '');
          setEstimatedDelivery(orderData.estimatedDelivery || '');
        }
      } catch (error) {
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setSaving(true);
    try {
      const updatedStatus: OrderStatus = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        updatedBy: "admin",
        notes: statusNotes.trim() || undefined,
      };

      const updatedOrder = updateOrderStatus(order.id, updatedStatus);
      if (updatedOrder) {
        // In a real app, you would also update tracking and delivery info
        setOrder(updatedOrder);
        router.push(`/management/orders/${order.id}`);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <DetailPageLoader 
      title="Edit Order" 
      subtitle="Update order status and information"
      backHref={`/management/orders/${orderId}`}
      backText="Back to Order"
    />;
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.push("/management/orders")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground">The order you&apos;re looking for doesn&apos;t exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order.hasDeliverableItems) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.push(`/management/orders/${order.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Digital Order</h3>
              <p className="text-muted-foreground">This order contains only digital products and doesn&apos;t require shipping status updates.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => router.push(`/management/orders/${order.id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Order</h1>
            <p className="text-muted-foreground">
              Update order status and shipping information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Order Number</Label>
                <div className="text-sm text-muted-foreground">{order.orderNumber}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Customer</Label>
                <div className="text-sm text-muted-foreground">{order.customerName}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Current Status</Label>
                <div className="text-sm text-muted-foreground">{order.status.status}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Payment Status</Label>
                <div className="text-sm text-muted-foreground">{order.paymentStatus}</div>
              </div>
            </CardContent>
          </Card>

          {/* Status Update */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">New Status</Label>
                <Select value={newStatus} onValueChange={(value: OrderStatus['status']) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Status Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this status change..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input
                    id="trackingNumber"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                  <Input
                    id="estimatedDelivery"
                    type="date"
                    value={estimatedDelivery}
                    onChange={(e) => setEstimatedDelivery(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Shipping Address</Label>
                <div className="text-sm text-muted-foreground">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                      <Badge variant={item.isDeliverable ? "default" : "secondary"} className="text-xs">
                        {item.isDeliverable ? "Physical" : "Digital"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.push(`/management/orders/${order.id}`)}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
} 