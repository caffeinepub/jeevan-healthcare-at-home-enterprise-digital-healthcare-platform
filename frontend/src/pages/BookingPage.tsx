import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface BookingFormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  landmark: string;
  date: string;
  timeSlot: string;
  paymentMethod: string;
}

const timeSlots = [
  '06:00 AM - 08:00 AM',
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingFormData>();

  const selectedTimeSlot = watch('timeSlot');
  const selectedPaymentMethod = watch('paymentMethod');

  if (items.length === 0) {
    navigate({ to: '/tests' });
    return null;
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate booking creation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Clear cart and navigate to success
      clearCart();
      toast.success('Booking confirmed! You will receive a confirmation shortly.');
      navigate({ to: '/orders' });
    } catch (error) {
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Patient Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="patientName">Full Name *</Label>
            <Input
              id="patientName"
              {...register('patientName', { required: 'Name is required' })}
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="text-sm text-destructive">{errors.patientName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              {...register('age', { required: 'Age is required' })}
              placeholder="Enter age"
            />
            {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <RadioGroup {...register('gender', { required: 'Gender is required' })}>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </div>
            </RadioGroup>
            {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              placeholder="10-digit mobile number"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      <Button
        type="button"
        className="w-full bg-jeevan-primary hover:bg-jeevan-accent"
        onClick={() => setStep(2)}
      >
        Continue to Address
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Collection Address</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Complete Address *</Label>
            <Textarea
              id="address"
              {...register('address', { required: 'Address is required' })}
              placeholder="House/Flat No., Building Name, Street"
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode *</Label>
              <Input
                id="pincode"
                {...register('pincode', { required: 'Pincode is required' })}
                placeholder="Enter pincode"
              />
              {errors.pincode && (
                <p className="text-sm text-destructive">{errors.pincode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landmark">Landmark</Label>
              <Input
                id="landmark"
                {...register('landmark')}
                placeholder="Nearby landmark (optional)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button
          type="button"
          className="flex-1 bg-jeevan-primary hover:bg-jeevan-accent"
          onClick={() => setStep(3)}
        >
          Continue to Schedule
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Schedule Collection</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date *</Label>
            <Input
              id="date"
              type="date"
              {...register('date', { required: 'Date is required' })}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Preferred Time Slot *</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {timeSlots.map((slot) => (
                <label
                  key={slot}
                  className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    selectedTimeSlot === slot
                      ? 'border-jeevan-primary bg-blue-50'
                      : 'border-gray-200 hover:border-jeevan-primary'
                  }`}
                >
                  <input
                    type="radio"
                    value={slot}
                    {...register('timeSlot', { required: 'Time slot is required' })}
                    className="text-jeevan-primary"
                  />
                  <span className="text-sm font-medium">{slot}</span>
                </label>
              ))}
            </div>
            {errors.timeSlot && (
              <p className="text-sm text-destructive">{errors.timeSlot.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button
          type="button"
          className="flex-1 bg-jeevan-primary hover:bg-jeevan-accent"
          onClick={() => setStep(4)}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Payment Method</h2>
        <div className="space-y-3">
          {[
            { value: 'online', label: 'Pay Online', desc: 'UPI, Cards, Net Banking' },
            { value: 'cash', label: 'Cash on Collection', desc: 'Pay when sample is collected' },
          ].map((method) => (
            <label
              key={method.value}
              className={`flex cursor-pointer items-start space-x-3 rounded-lg border p-4 transition-colors ${
                selectedPaymentMethod === method.value
                  ? 'border-jeevan-primary bg-blue-50'
                  : 'border-gray-200 hover:border-jeevan-primary'
              }`}
            >
              <input
                type="radio"
                value={method.value}
                {...register('paymentMethod', { required: 'Payment method is required' })}
                className="mt-1 text-jeevan-primary"
              />
              <div>
                <p className="font-medium">{method.label}</p>
                <p className="text-sm text-gray-600">{method.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={() => setStep(3)} className="flex-1">
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-jeevan-primary hover:bg-jeevan-accent"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jeevan-primary">Complete Your Booking</h1>
          <div className="mt-4 flex items-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    s <= step
                      ? 'bg-jeevan-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-1 w-12 ${
                      s < step ? 'bg-jeevan-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                </form>
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
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-jeevan-primary">
                      ₹{getTotalPrice()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
