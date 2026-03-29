export enum PhoneOperator {
   MTN = 'MTN',
   Orange = 'Orange',
}

export const businessInfo = {
   name: 'Mama Sarah',
   slogan: 'Le palais du cochon',
   address: 'Emombo, Garage japonais',
   phoneNumbers: [
      { operator: PhoneOperator.MTN, number: '+237 683851143' },
      { operator: PhoneOperator.Orange, number: '+237 655538057' },
   ],
   email: 'mamasarah@gmail.com',
   socials: [
      { platform: 'Facebook', url: 'https://www.facebook.com/mamasarah' },
      { platform: 'Instagram', url: 'https://www.instagram.com/mamasarah' },
   ],
}
