export function randomString(
   length: number,
   chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) {
   let result = ''
   for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
   }
   return result
}

export const printLink = (link: any, width?: number) => {
   return window.open(
      `${process.env.REACT_APP_API_ENDPOINT}${link}`,
      '_blank',
      `toolbar=yes,location=yes,directories=no,status=0,
            menubar=yes,scrollbars=yes,resizable=no,left=20,top=20,width=1000,height=${width ?? 600}`,
   )
}

export const formatPrice = (amount: number | string) => {
   return `${(amount ?? 0)?.toLocaleString()} XAF`
}

export * from './utils/strings'

export const filteredConfigs: any = (modules: any, appConfigs: any) =>
   Object.fromEntries(Object.entries(appConfigs).filter(([key]) => modules?.includes(key)))

export const registerSseEvent = (eventHub: string) => {
   const evtSource = new EventSource(eventHub)

   evtSource.onmessage = async e => {
      const data = JSON.parse(e.data)

      const soundUrl = `${process.env.REACT_APP_API_ENDPOINT}/${data.sound ?? data.audio}`

      const playSoundMultipleTimes = async (url: string, times: number) => {
         for (let i = 0; i < times; i++) {
            const audio = new Audio(url)

            await new Promise<void>((resolve, reject) => {
               audio.onended = () => resolve()
               audio.onerror = () => reject()
               audio.play().catch(reject)
            })
         }
      }

      await playSoundMultipleTimes(soundUrl, data?.times ?? 3)
   }

}