import { Container, Text, Title } from '@mantine/core'

// @ts-ignore
import styles from './RegisterPage.module.scss'

export default function RegistrationPage() {
   return (
      <Container size="sm" className={styles.formContainer}>
         <div className={styles.header}>
            {/*<Text className={styles.logo}>*/}
            {/*   <Image src="/logo.svg" />*/}
            {/*</Text>*/}
            <Title className={styles.title}>Create account</Title>
            <Text className={styles.subtitle}>Create your account to manage</Text>
         </div>

         <div className={styles.form}></div>
      </Container>
   )
}
