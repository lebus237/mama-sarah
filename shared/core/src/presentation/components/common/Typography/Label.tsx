import { useTranslate } from '@shared/i18n'
// @ts-ignore
import styles from './Typography.module.scss'
import _ from 'lodash'

export const Label = ({ text }: { text: string | number; bold?: boolean }) => {
   const { trans: t } = useTranslate()
   return <span className={styles.label}>{_.upperFirst(t(text.toString()))}</span>
}
