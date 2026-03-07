export type DeliveryZone = {
    id: string,
    name: string,
    deliveryFee: string,
    estimatedTime: number
}

export enum DeliveryType {
    PICKUP = 'pickup',
    DELIVERY = 'delivery'
}
