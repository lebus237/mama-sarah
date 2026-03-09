export type DeliveryZone = {
   id: string
   name: string
   deliveryFee: string
   estimatedTime: number
}

export enum DeliveryMode {
   PICKUP = 'pickup',
   DELIVERY = 'delivery',
}
