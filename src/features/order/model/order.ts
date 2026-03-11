import { DeliveryType, DeliveryZone } from "@/entities/delivery-zone";
import { OrderStatus, PaymentStatus } from "./types";
import { Customer } from "@/entities/customer";
import { OrderItem } from "./order_item";

export type Order = {
    id: string,
    status?: OrderStatus,
    customer: Customer,
    items: OrderItem[],
    paymentMethod: any,
    paymentStatus: PaymentStatus,
    deliveryType: DeliveryType,
    deliveryAddress: string,
    deliveryZone: DeliveryZone,
    deliveryFee: number,
    createdAt: Date,
}
