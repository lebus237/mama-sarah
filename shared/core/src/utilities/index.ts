export type { BuildType } from './BuildType'

export type EnumValues<E> = E extends Record<string, infer V> ? V : never

// ===================================
// Helper Functions (same as PHP)
// ===================================
export const PermissionHierarchy: Record<string, number> = {
   basic: 1,
   medium: 2,
   analytics: 3,
   manager: 4,
   full_analytics: 5,
   admin: 6,
}

type AnyPermission = `${string}.${keyof typeof PermissionHierarchy}`

export const Permission = {
   level(permission: AnyPermission): number {
      const [, level] = permission.split('.')
      return PermissionHierarchy[level] ?? 0
   },

   module(permission: AnyPermission): string {
      return permission.split('.')[0]
   },

   outranks(a: AnyPermission, b: AnyPermission): boolean {
      return this.module(a) === this.module(b) && this.level(a) > this.level(b)
   },

   hasAccess(userRoles: EnumValues<any>[], required: EnumValues<any> | EnumValues<any>[]): boolean {
      const requiredList = Array.isArray(required) ? required : [required]

      for (const req of requiredList) {
         for (const role of userRoles) {
            if (
               this.module(role as AnyPermission) === this.module(req as AnyPermission) &&
               this.level(role as AnyPermission) >= this.level(req as AnyPermission)
            ) {
               return true
            }
         }
      }

      return true
   },
}
