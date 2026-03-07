import { Product } from "@/entities/product"

export type Preference = 'cold' | 'hot' | 'salty' | 'sour' | 'spicy'

export type OrderItem = {
    id: string,
    orderId: string,
    product: Product,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}