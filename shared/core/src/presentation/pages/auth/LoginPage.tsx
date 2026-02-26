import { Container, Grid, Text, Title, Image, Box } from '@mantine/core'
import z from 'zod'

// @ts-ignore
import styles from './LoginPage.module.scss'

import { Field, FormWrapper } from '../../components/forms'
import { useAppState } from '../../../hooks'

const schema = z.object({
   username: z.string().min(3).optional(),
   password: z.string().min(6).optional(),
})

function LoginPage({
   authSuccess,
   formLogin,
   homePath,
}: {
   authSuccess: any
   formLogin: any
   homePath: any
}) {
   const { instance } = useAppState()
   const appLogo = instance?.asset?.logo ?? '/logo-2.svg'

   return (
      <Container size="sm" className={styles.formContainer}>
         <Box className={styles.header}>
            <Box className={styles.logo}>
               <Image src={appLogo} />
            </Box>
            <Title size="xl">Connectez-vous a votre compte</Title>
            <Text size="sm" w="80%" component="span" style={{ textAlign: 'center' }}>
               Connect to get started. If don't have an account, you can apply for one
            </Text>
         </Box>

         <div className={styles.form}>
            <FormWrapper
               schema={schema}
               onSubmit={async payload => formLogin(payload)}
               onSuccess={response => {
                  authSuccess(response)
                  window.location.href = homePath
               }}
            >
               <Grid justify="center" gutter="md">
                  <Grid.Col span={{ span: 12 }}>
                     <Field.Input label="text.username" name="username" required />
                  </Grid.Col>
                  <Grid.Col>
                     <Field.Input
                        label="text.password"
                        name="password"
                        inputType="password"
                        required
                     />
                  </Grid.Col>
                  <Grid.Col>
                     <Field.Button label="action.submit" />
                  </Grid.Col>
               </Grid>
            </FormWrapper>
         </div>
      </Container>
   )
}

export default LoginPage
