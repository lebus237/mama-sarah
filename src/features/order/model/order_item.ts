import { Product } from "@/entities/product"

export type OrderItem = {
    id: string,
    orderId: string,
    product: Product,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}