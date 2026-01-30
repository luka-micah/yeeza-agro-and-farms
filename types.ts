
import React from 'react';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  FARMER = 'FARMER',
  COLD_ROOM_OWNER = 'COLD_ROOM_OWNER',
  RETAILER = 'RETAILER'
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED'
}

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  firstName?: string;
  lastName?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

export interface Livestock {
  id: string;
  type: string;
  breed: string;
  weight: number;
  healthStatus: string;
  price: number;
  quantity: number;
  status: 'available' | 'sold' | 'in_storage';
}

export interface ColdRoom {
  id: string;
  facilityName: string;
  address: string;
  city: string;
  totalCapacity: number;
  availableCapacity: number;
  basePrice: number;
  rating: number;
  features: string[];
}

export interface Booking {
  id: string;
  farmerName: string;
  facilityName: string;
  itemName: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  totalPrice: number;
  durationDays: number;
}
