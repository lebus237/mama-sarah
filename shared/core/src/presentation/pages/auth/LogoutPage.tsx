import { useEffect } from 'react'

function LogoutPage({ authLogout }: { authLogout: any }) {
   useEffect(() => {
      authLogout()
   }, [])

   return <div></div>
}

export default LogoutPage
