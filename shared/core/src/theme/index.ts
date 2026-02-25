import { type MantineColor, type MantineThemeOverride } from '@mantine/core'

import { colors } from './colors'
import {
   ActionIcon,
   AppShell,
   AppShellHeader,
   AppShellNavbar,
   Badge,
   Button,
   Card,
   Drawer,
   Modal,
   MultiSelect,
   NavLink,
   NumberInput,
   Paper,
   PasswordInput,
   Select,
   Table,
   Tabs,
   Textarea,
   TextInput,
   DatePickerInput,
   DateInput,
} from './components'
import { radius, shadows, spacing } from './spacing'
import { typography } from './typography'

class Manthemes {
   /**
    * Create a new theme
    * @param props - the props to create
    */
   public create(props: MantineThemeOverride) {
      if (Object.keys(props).length === 0) {
         throw new Error('Props must be specified')
      }

      return Object.assign(this, props)
   }

   /**
    * Override an existing theme props or create a new one
    * @param props - the props to override
    * @param theme - The theme (optional)
    */
   public override(props: MantineThemeOverride, theme?: any) {
      return Object.assign(theme || this, props)
   }

   /**
    * Get a specified color and return the shades of it
    * @param color - the color to specified
    * @param theme - The theme (optional)
    */
   public getColor(color: MantineColor, theme?: any) {
      return theme.colors[color] || (this as MantineThemeOverride).colors?.[color]
   }

   /**
    * Get the colors of a theme
    * @param theme - The theme to retrieve colors (This is optional)
    */
   public getColors(theme?: any) {
      return (theme || (this as MantineThemeOverride)).colors
   }
}

export const theme = new Manthemes().create({
   ...colors,
   ...typography,
   spacing,
   radius,
   shadows,
   components: {
      Button,
      Card,
      Modal,
      TextInput,
      Textarea,
      NumberInput,
      PasswordInput,
      MultiSelect,
      Select,
      AppShellNavbar,
      NavLink,
      Table,
      Drawer,
      Badge,
      ActionIcon,
      Tabs,
      Paper,
      AppShell,
      AppShellHeader,
      DateInput,
      DatePickerInput,
   },
} as any)

export default theme
