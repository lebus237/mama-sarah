import { DeliveryType, DeliveryZone } from "@/entities/delivery-zone";
import { OrderStatus, PaymentStatus } from "./types";
import { Customer } from "@/entities/customer";

export type Order = {
    id: string,
    status: OrderStatus,
    customer: Customer,
    paymentMethod: any,
    paymentStatus: PaymentStatus,
    deliveryType: DeliveryType,
    deliveryZone: DeliveryZone,
    deliveryFee: number,
    createdAt: Date,
    updatedAt: Date,
}
