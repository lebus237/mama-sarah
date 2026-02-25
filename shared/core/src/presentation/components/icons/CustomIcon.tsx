import CustomIconData from './CustomIconData'
import type { IconSvgProps } from './types'
import { withSize } from './withSize'

// eslint-disable-next-line unused-imports/no-unused-vars
const CustomIconKeys = CustomIconData()

export default function CustomIcon({
   type,
   size,
   ...rest
}: IconSvgProps & {
   type: Extract<keyof typeof CustomIconKeys, string>
}) {
   const Icon = () => <>{CustomIconData({ ...rest })[type]}</>

   return <>{withSize(size ?? 20)(Icon, { ...rest })}</>
}
