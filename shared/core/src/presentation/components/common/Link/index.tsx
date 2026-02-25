import { Link, type LinkProps } from 'react-router-dom'

// @ts-ignore
import classes from './link.module.scss'

export const AppLink = (props: LinkProps) => {
   return <Link {...props} className={classes.link} />
}
