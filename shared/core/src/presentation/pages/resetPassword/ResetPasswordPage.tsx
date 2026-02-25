import { Container, Text, Title } from '@mantine/core'

// @ts-ignore
import styles from './ResetPasswordPage.module.scss'

export default function ResetPasswordPage() {
   return (
      <Container size="sm" className={styles.formContainer}>
         <div className={styles.header}>
            <Text className={styles.logo}>
               W <span className={styles.logoAccent}>SHOPS</span>
            </Text>
            <Title className={styles.title}>Create account</Title>
            <Text className={styles.subtitle}>Create your account to manage your activity</Text>
         </div>

         <div className={styles.form}></div>
      </Container>
   )
}
