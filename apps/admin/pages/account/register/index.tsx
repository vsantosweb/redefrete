import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, AlertDescription, AlertIcon, AlertTitle, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import * as Styled from '../styles';
import api from '../../api';

function Register({ history }) {

    const { handleSubmit, register, watch, formState: { isValid, errors, isSubmitting, isSubmitSuccessful } } = useForm({ mode: 'onChange' });
    const [errorMessage, setErrorMessage] = React.useState();
    const [buttonState, setButonState] = React.useState<object>({ disabled: !isValid, isLoading: false })
    const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);
    // React.useEffect(() => layout('AuthLayout'));

    React.useEffect(() => setButonState({ disabled: !isValid }), [isValid])


    const handleSubmitRegister = async data => {

        await api.post('/driver/auth/register', data)
            .then(() => setRegisterSuccess(true))
            .catch(error => setErrorMessage(error.response.data.message))
    }

    if (!registerSuccess) {
        return <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <Stack>
                <FormControl variant={'floating'}>
                    <FormLabel>Nome</FormLabel>
                    <Input autoComplete={'off'} variant={'flushed'} placeholder='Seu nome completo' {...register('name', { required: true, minLength: 4 })} />
                </FormControl>
                <FormControl variant={'floating'}>
                    <FormLabel >Endereço de email</FormLabel>
                    <Input autoComplete={'off'} type={'email'} variant={'flushed'} placeholder='Seu melhor email'{...register('email', { required: true, minLength: 4 })} />
                </FormControl>

                <FormControl variant={'floating'}>
                    <FormLabel>Telefone/WhatsApp</FormLabel>
                    <Input autoComplete={'off'} type={'tel'} variant={'flushed'} placeholder='11999999999'{...register('phone', { required: true, minLength: 4 })} />
                </FormControl>

                <FormControl variant={'floating'}>
                    <FormLabel>Senha</FormLabel>
                    <Input variant={'flushed'} type={'password'} placeholder='••••••••••' {...register('password', { required: true, minLength: 8 })} />
                </FormControl>

                <input hidden {...register('accepted_terms')} defaultValue={1} />

                <FormControl isInvalid={errors.password_confirmation as never} variant={'floating'}>

                    <FormLabel>Confirme sua senha</FormLabel>

                    <Input isInvalid={errors.password_confirmation as never} variant={'flushed'} type={'password'} placeholder='••••••••••'
                        {...register('password_confirmation', {
                            required: true,
                            validate: (value) => value === watch('password') || 'As senhas não conferem'
                        })}
                    />

                    <FormErrorMessage>{errors.password_confirmation?.message as never}</FormErrorMessage>

                </FormControl>

                <Styled.AccountButton disabled={!isValid} isLoading={isSubmitting} type={'submit'} colorScheme={'secondary'}>Registrar-se <i className={'las la-arrow-right'}></i></Styled.AccountButton>
                {errorMessage && <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription fontSize={14}>{errorMessage}</AlertDescription>
                </Alert>}
                <Styled.AccountButton onClick={() => history.push('/account/login')} colorScheme={'primary'}>Já possuo uma conta<i className={'las la-arrow-right'}></i></Styled.AccountButton>

            </Stack>
        </form>
    } else {
        return <Stack spacing={4}>
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='260px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>Cadastro efetuado com sucesso!</AlertTitle>
                <AlertDescription maxWidth='sm'>Obrigado por fazer parte do time Redefrete!</AlertDescription>
            </Alert>
            <Styled.AccountButton onClick={() => history.push('/account/login')} colorScheme={'primary'}>Acessar minha conta<i className={'las la-arrow-right'}></i></Styled.AccountButton>
        </Stack>

    }
}

Register.layout = 'AuthLayout';

Register.config = {
    title: 'Cadastre-se',
    layout: 'AuthLayout'
}


export default Register;