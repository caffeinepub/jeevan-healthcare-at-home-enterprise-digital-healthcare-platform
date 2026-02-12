import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import type { UserProfile } from '../backend';
import { HealthcareRole } from '../backend';

interface ProfileSetupModalProps {
  open: boolean;
}

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();
  const saveProfile = useSaveCallerUserProfile();
  const { identity } = useInternetIdentity();

  const onSubmit = async (data: ProfileFormData) => {
    if (!identity) {
      toast.error('Not authenticated');
      return;
    }

    setIsSubmitting(true);
    try {
      const principal = identity.getPrincipal().toString();
      const profile: UserProfile = {
        principal,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: HealthcareRole.patient,
        isActive: true,
        bookedServices: [],
        bookedTimes: [],
        sharedProfile: false,
        insuranceDetails: '',
        documents: [],
        locationHistory: [],
      };
      await saveProfile.mutateAsync(profile);
      toast.success('Profile created successfully!');
    } catch (error) {
      console.error('Profile setup error:', error);
      toast.error('Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-heading">Complete Your Profile</DialogTitle>
          <DialogDescription>
            Please provide your details to continue using Jeevan HealthCare services.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your full name"
              className="rounded-lg"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="your.email@example.com"
              className="rounded-lg"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number',
                },
              })}
              placeholder="10-digit mobile number"
              className="rounded-lg"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Profile...' : 'Continue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

