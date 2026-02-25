class LocalStorage {
   static isBrowser(): boolean {
      return typeof window !== 'undefined'
   }

   static setRefreshToken(refreshToken: string) {
      if (this.isBrowser()) {
         localStorage.setItem('app-refresh-token', refreshToken)
      }
   }

   static clearRefreshToken() {
      if (this.isBrowser()) {
         localStorage.removeItem('app-refresh-token')
      }
   }

   static getRefreshToken(): string | null {
      if (this.isBrowser()) {
         return localStorage.getItem('app-refresh-token')
      }
      return null
   }

   static setAuthToken(authToken: string) {
      if (this.isBrowser()) {
         localStorage.setItem('app-token', authToken)
      }
   }

   static clearAuthToken() {
      if (this.isBrowser()) {
         localStorage.removeItem('app-token')
      }
   }

   static getAuthToken(): string | null {
      if (this.isBrowser()) {
         return localStorage.getItem('app-token')
      }
      return null
   }

   static setAppContext(context: object) {
      if (this.isBrowser()) {
         localStorage.setItem('app-context', JSON.stringify(context))
      }
   }

   static clearAppContext() {
      if (this.isBrowser()) {
         localStorage.removeItem('app-context')
      }
   }

   static setInstance(context: object) {
      if (this.isBrowser()) {
         localStorage.setItem('instance', JSON.stringify(context))
      }
   }

   static getInstance(): any | null {
      if (this.isBrowser()) {
         localStorage.getItem('instance')
      }
   }

   static getAppContext(): any | null {
      if (this.isBrowser()) {
         try {
            const context = localStorage.getItem('app-context')
            return context ? JSON.parse(context) : null
         } catch {
            return null
         }
      }
      return null
   }

   static clearAll() {
      this.clearRefreshToken()
      this.clearAuthToken()
      this.clearAppContext()
   }
}

export default LocalStorage
