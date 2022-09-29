import React from "react";
import type { NextPage } from "next";
import { Alert, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Styled from '../styles';
import Link from "next/link";
import { authService } from "../../../services";


export const Login = () => {

  const { handleSubmit, register, formState: { isValid, errors, isSubmitting } } = useForm({ mode: 'onChange' });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [buttonState, setButonState] = React.useState<any>({ disabled: !isValid, isLoading: false })
  const router = useRouter();

  React.useEffect(() => setButonState({ disabled: !isValid }), [isValid])

  const submitCredentials = (credentials) => {

    authService.signIn(credentials).then(() => router.push('/'))
      .catch((error) => setErrorMessage(error.response.data.message))


  }

  return (
    <form onSubmit={handleSubmit(submitCredentials)}>
      <Stack>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input variant={'flushed'} placeholder={'email@example.com'} autoComplete={'off'} {...register('email', { required: true })} />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input variant={'flushed'} placeholder='••••••••••' type={'password'} {...register('password', { required: true })} />
        </FormControl>

        <Styled.AccountButton type={'submit'}
          colorScheme={'primary'} isLoading={isSubmitting} disabled={!isValid} rightIcon={<i className={'las la-arrow-right'}></i>}>Entrar</Styled.AccountButton>
        {errorMessage && <Alert  status='error'>
          <AlertIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>}
      </Stack>

    </form>
  );
};

Login.config = {
  title: 'Motoristas',
  layout: 'AuthLayout'
}

export default Login;
