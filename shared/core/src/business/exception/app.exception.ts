export class AppException extends Error {
   public response: any

   constructor(response: any, message?: string) {
      super(message)
      this.response = response
   }

   toJSON() {
      return {
         message: this.message,
         ...this.response,
      }
   }
}
