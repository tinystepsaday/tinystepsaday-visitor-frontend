"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Edit, Package, Truck, CheckCircle, Clock, AlertCircle, User, MapPin, Phone, Mail, CreditCard, FileText, Save, X } from "lucide-react";
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
import { DetailPageLoader } from "@/components/ui/loaders";
import Image from "next/image";

export default function OrderDetailsPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus['status']>('pending');
  const [statusNotes, setStatusNotes] = useState('');
  const [saving, setSaving] = useState(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      case "refunded":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = async () => {
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
        setOrder(updatedOrder);
        setEditingStatus(false);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setSaving(false);
    }
  };

  const cancelStatusEdit = () => {
    if (order) {
      setNewStatus(order.status.status);
      setStatusNotes(order.status.notes || '');
    }
    setEditingStatus(false);
  };

  if (loading) {
    return <DetailPageLoader
      title="Order Details"
      subtitle="View and manage order information"
      backHref="/management/orders"
      backText="Back to Orders"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center flex-col w-full gap-4">
          <div className="flex items-center gap-2 w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.push("/management/orders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
            {order.hasDeliverableItems && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingStatus(true)}
                disabled={editingStatus}
              >
                <Edit className="mr-2 h-4 w-4" />
                Update Status
              </Button>
            )}
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
            <p className="text-muted-foreground">
              Order placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(order.status.status)}
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingStatus ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
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
                    <label className="text-sm font-medium">Notes (Optional)</label>
                    <Textarea
                      placeholder="Add notes about this status change..."
                      value={statusNotes}
                      onChange={(e) => setStatusNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleStatusUpdate} disabled={saving}>
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button variant="outline" onClick={cancelStatusEdit}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(order.status.status)}>
                      {order.status.status.charAt(0).toUpperCase() + order.status.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Updated {new Date(order.status.updatedAt).toLocaleString()}
                    </span>
                  </div>
                  {order.status.notes && (
                    <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {order.status.notes}
                    </div>
                  )}
                  {order.trackingNumber && (
                    <div className="text-sm">
                      <strong>Tracking Number:</strong> {order.trackingNumber}
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div className="text-sm">
                      <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.productType.charAt(0).toUpperCase() + item.productType.slice(1)} Product
                        {!item.isDeliverable && " (Digital)"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                      {!item.isDeliverable && (
                        <Badge variant="secondary" className="text-xs">
                          Digital
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {order.customerEmail}
                </div>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {order.shippingAddress.phone}
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </Badge>
              </div>
              <div className="text-sm">
                <div className="text-muted-foreground">Method</div>
                <div>{order.paymentMethod}</div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                <div>{order.shippingAddress.address}</div>
                <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                <div>{order.shippingAddress.country}</div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Order Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {order.notes}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
