import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import api from '../../../api'
import { AccountButton } from '../../styles'

export async function getServerSideProps(req, res) {

    const { error, data } = await api.post('/drivers/auth/password/validate-recovery-request', { email: req.query.email, token: req.query.token })
        .then(response => response.data)

    return error ? {
        redirect: {
            permanent: false,
            destination: '/minha-conta/login'
        }
    } : {
        props: {
            ...data
        }
    }
}


export const Recovery = ({ layout, history, ...props }: any) => {

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' });

    const handleResetPassword = (formData) => {

        api.post('/drivers/auth/password/recovery', { ...formData, ...props })
            .then(response => {

                return router.push({
                    pathname: '/minha-conta/recovery/success',
                    query: { recovered: true }
                }, '/minha-conta/recovery/success');
            })
    }
    return (
        <form onSubmit={handleSubmit(handleResetPassword)}>
            <Stack spacing={3}>
                <Heading size={'lg'}>Crie uma nova asenha</Heading>
                <Text>
                    Use senhas fortes, incluindo letras maiúsculas, letras minúsculas e números.
                </Text>
                <FormControl variant={'floating'}>
                    <FormLabel>Senha</FormLabel>
                    <Input variant={'flushed'} type={'password'} placeholder='••••••••••' {...register('password', { required: true, minLength: 8 })} />
                </FormControl>
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
                <AccountButton type={'submit'} rightIcon={<i className={'las la-key'}></i>} colorScheme={'primary'}>Redefinir minha senha</AccountButton>
            </Stack>
        </form>
    )
}

Recovery.layout = 'AuthLayout'

export default Recovery;