import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { AccountButton } from '../styles';
import { useForm } from 'react-hook-form';
import api from '../../api';
import { useRouter } from 'next/router';


export const Recovery = () => {

    const [buttonState, setButtonState] = React.useState(null);

    const { register, handleSubmit, formState: { isValid, errors } } = useForm({ mode: 'onChange' });

    const router = useRouter();

    const handleSubmitRecoveryRequest = (formData) => {

        setButtonState({ isLoading: true, disabled: true });

        api.post('/drivers/auth/password/recovery-request', formData)
            .then(() => router.push({ pathname: 'recovery/confirmation', query: 'souzavito@hotmail.com' }, '/minha-conta/recovery'))

    }

    return (
        <form onSubmit={handleSubmit(handleSubmitRecoveryRequest)}>
            <Stack spacing={3}>
                <Heading size={'lg'}>Esqueceu a senha?</Heading>
                <Text>
                    Vamos te enviar um link para redefinir sua senha.
                    Por favor, insira o e-mail.
                </Text>
                <FormControl isInvalid={!isValid}>
                    <FormLabel>Seu endereço de e-mail</FormLabel>
                    <Input
                        autoComplete={'off'}
                        isInvalid={!isValid}
                        {...register('email', { required: 'Por favor, insira seu e-mail' })}
                        placeholder={'exemplo@exemplo.com'}
                        variant={'flushed'}
                        type={'email'}
                    />
                    <FormErrorMessage>{errors?.email?.message as never}</FormErrorMessage>
                </FormControl>
                <AccountButton
                    {...buttonState}
                    type={'submit'}
                    rightIcon={<i className={'las la-paper-plane'}></i>}
                    colorScheme={'primary'}>Enviar link de redefinição de senha</AccountButton>
            </Stack>
        </form>
    )
}

Recovery.layout = 'AuthLayout';

export default Recovery;