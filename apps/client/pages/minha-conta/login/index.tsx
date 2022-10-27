import React from "react";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Styled from '../styles';
import Link from "next/link";

import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository } from '@redefrete/interfaces';

const driverAuth = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);

export const Login = () => {

  const { handleSubmit, register, reset, formState: { isValid, isSubmitting } } = useForm({ mode: 'onChange' });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const router = useRouter();

  const submitCredentials = async (credentials: { email: string, password: string }) => {

    await driverAuth.login(credentials)
      .then((response) => driverAuth.redirect('/'))
      .catch(error => {
        setErrorMessage(error.response.data.message)
        reset()
      })
  }

  return (
    <form onSubmit={handleSubmit(submitCredentials)}>

      <Stack>
        <FormControl isDisabled={isSubmitting}>
          <FormLabel>Email</FormLabel>
          <Input placeholder={'email@example.com'} autoComplete={'off'} {...register('email', { required: true })} />
        </FormControl>

        <FormControl isDisabled={isSubmitting}>
          <FormLabel>Senha</FormLabel>
          <Input placeholder='••••••••••' type={'password'} {...register('password', { required: true })} />
        </FormControl>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={'/minha-conta/recovery'}>Esqueci minha senha</Link>
        </div>

        <Styled.AccountButton type={'submit'}
          colorScheme={'primary'} disabled={!isValid || isSubmitting} isLoading={isSubmitting}
          rightIcon={<i className={'las la-arrow-right'}></i>}>Entrar</Styled.AccountButton>
        <small style={{ color: 'red' }}>{errorMessage}</small>
        <p>Não tem uma conta na Redefrete?</p>
        <Styled.AccountButton
          style={{ width: '100%' }}
          colorScheme={'secondary'}
          onClick={() => router.push('/minha-conta/cadastro')}
          rightIcon={<i className={'las la-arrow-right'}></i>}>Registre-se</Styled.AccountButton>
      </Stack>
    </form>
  );
};

Login.config = {
  title: 'Login',
  layout: 'AuthLayout'
}

export default Login;
