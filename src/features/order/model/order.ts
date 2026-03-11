import { Customer } from '@/entities/customer'
import { DeliveryType, DeliveryZone } from '@/entities/delivery'
import { Product } from '@/entities/product'

export type Order = {
   id: string
   status?: OrderStatus
   customer: Customer
   items: OrderItem[]
   paymentMethod: any
   paymentStatus: PaymentStatus
   deliveryType: DeliveryType
   deliveryAddress: string
   deliveryZone: DeliveryZone
   deliveryFee: number
   createdAt: Date
}

export enum OrderStatus {
   PENDING = 'pending',
   CONFIRMED = 'confirmed',
   PREPARING = 'preparing',
   OUT_FOR_DELIVERY = 'out_for_delivery',
   DELIVERED = 'delivered',
   CANCELLED = 'cancelled',
}

export enum PaymentStatus {
   PENDING = 'pending',
   PAID = 'paid',
   FAILED = 'failed',
   REFUNDED = 'refunded',
}

export type OrderItem = {
   id: string
   orderId: string
   product: Product
   quantity: number
   unitPrice: number
   totalPrice: number
}
