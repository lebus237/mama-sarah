export const buildRoute = (
   route: string,
   params: Record<string, string | number>,
   searchQuery?: Record<string, string | number>,
): string => {
   // Replace dynamic segments (:paramName) with their values
   let pathname = route
   for (const [key, value] of Object.entries(params)) {
      pathname = pathname.replace(`{${key}}`, String(value))
   }

   // Build query string if searchQuery is provided
   if (searchQuery && Object.keys(searchQuery).length > 0) {
      const queryString = Object.entries(searchQuery)
         .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
         .join('&')
      pathname = `${pathname}?${queryString}`
   }

   return pathname
}
