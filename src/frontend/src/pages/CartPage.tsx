import { useNavigate } from '@tanstack/react-router';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../hooks/useCart';
import { Badge } from '@/components/ui/badge';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, getTotalPrice, getTotalMRP, getSavings, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300" />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">
              Add tests and packages to your cart to get started
            </p>
            <Button
              className="mt-6 bg-jeevan-primary hover:bg-jeevan-accent"
              onClick={() => navigate({ to: '/tests' })}
            >
              Browse Tests & Packages
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jeevan-primary">Your Cart</h1>
          <p className="mt-2 text-gray-600">{items.length} items in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cart Items</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start space-x-4 rounded-lg border p-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {item.type === 'test' ? 'Test' : 'Package'}
                            </Badge>
                            {item.description && (
                              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-3 flex items-baseline space-x-2">
                          <span className="text-lg font-bold text-jeevan-primary">
                            ₹{item.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">₹{item.mrp}</span>
                          <span className="text-sm text-green-600">
                            Save ₹{item.mrp - item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">MRP Total</span>
                    <span className="font-medium">₹{getTotalMRP()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Total Savings</span>
                    <span className="font-medium text-green-600">-₹{getSavings()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-jeevan-primary">
                      ₹{getTotalPrice()}
                    </span>
                  </div>

                  <div className="space-y-2 rounded-lg bg-blue-50 p-4 text-sm">
                    <p className="font-medium text-jeevan-primary">✓ Home Sample Collection</p>
                    <p className="text-gray-600">Free sample collection at your doorstep</p>
                  </div>

                  <Button
                    className="w-full bg-jeevan-primary hover:bg-jeevan-accent"
                    size="lg"
                    onClick={() => navigate({ to: '/booking' })}
                  >
                    Proceed to Book
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate({ to: '/tests' })}
                  >
                    Add More Tests
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
