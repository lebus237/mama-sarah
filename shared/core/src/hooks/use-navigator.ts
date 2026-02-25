import { useLocation, useNavigate, useParams } from 'react-router-dom'
import routePath from '../../../../packages/app/src/routing/routePath'
import { buildPath } from '../lib/helpers'

export function useNavigator() {
   const location = useLocation()
   const reactRouter = useNavigate()
   const params = useParams()

   const navigate = (
      route: any,
      params: any = {},
      hash: boolean = false,
      blank: boolean = false,
      queries?: any,
   ) => {
      let path = buildPath(route, params, hash, queries)

      !blank ? reactRouter(path) : window.open(path, '_blank')
   }

   const hashNavigate = (hash?: string) => {
      const query = `?${Object.entries(urlQuery())
         .filter(e => e[1] !== undefined)
         .map(e => e.join('='))
         .join('&')}`

      reactRouter(`${location.pathname}${query}#${hash}`)
   }

   const queryNavigate = (queries?: any, keep?: boolean) => {
      const query = `?${Object.entries(keep ? { ...urlQuery(), ...queries } : queries)
         .filter(e => e[1] !== undefined)
         .map(e => e.join('='))
         .join('&')}`
      let hash = window.location.hash

      reactRouter(hash ? `${location.pathname}${query}${hash}` : `${location.pathname}${query}`)
   }

   const goBack = () => {
      const { backUrl } = urlQuery()

      if (backUrl) {
         reactRouter(`${backUrl}`)
         return
      }

      reactRouter(-1)
   }

   const isActive = (route: any) => {
      return location.pathname === route
   }

   const urlQuery = (): any | undefined => {
      const searchParams = new URLSearchParams(location.search)
      const params = {} as any
      for (let [key, value] of searchParams.entries() as any) {
         params[key] = value
      }
      return params
   }

   const isPublicRoute = (): boolean => {
      return [routePath.AUTH_LOGOUT, routePath.AUTH_LOGIN, routePath.AUTH_REGISTER].includes(
         location.pathname,
      )
   }

   let hash = window.location.hash?.replace('#', '')

   return {
      hash,
      params: params,
      path: window.location.pathname,
      navigate,
      hashNavigate,
      queryNavigate,
      goBack,
      isActive,
      urlQuery,
      isPublicRoute,
   }
}
