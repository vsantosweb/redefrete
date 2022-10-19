import React from "react";
import { FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Styled from '../styles';
import { authService } from "../../../services";


export const Login = () => {

  const { handleSubmit, register, formState: { isValid, isSubmitting } } = useForm({ mode: 'onChange' });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const router = useRouter();


  const submitCredentials = async (credentials) => {

    await authService.signIn(credentials).then(() => router.push('/'))
      .catch((error) => setErrorMessage(error.response.data.message))


  }

  return (
    <form onSubmit={handleSubmit(submitCredentials)}>
      <Stack>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder={'email@example.com'} autoComplete={'off'} {...register('email', { required: true })} />
        </FormControl>

        <FormControl>
          <FormLabel>Senha</FormLabel>
          <Input placeholder='••••••••••' type={'password'} {...register('password', { required: true })} />
        </FormControl>

        <Styled.AccountButton type={'submit'}
          colorScheme={'primary'} isLoading={isSubmitting} disabled={!isValid || isSubmitting} rightIcon={<i className={'las la-arrow-right'}></i>}>Entrar</Styled.AccountButton>
        {errorMessage &&           <Text color={'red'}>{errorMessage}</Text>
}
      </Stack>

    </form>
  );
};

Login.config = {
  title: 'Motoristas',
  layout: 'AuthLayout'
}

export default Login;
