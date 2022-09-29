import { NextPage } from 'next'
import React from 'react'
import { Button, Heading, Stack, Text } from '@chakra-ui/react'

export const RecoveryConfirmation = ({ layout, history }: any) => {

    return (
        <Stack spacing={3}>
            <Heading size={'lg'}>Solicitação enviada</Heading>
            <Text>
                Acabamos de enviar instruções e um link para você redefinir a senha para
                <strong> souzavito@hotmail.com</strong>. Pode levar alguns minutinhos para chegar.
            </Text>
            <Button variant={'outline'} onClick={() => history.push('/account/login')} colorScheme={'primary'}>Voltar para o login</Button>
        </Stack>
    )
}

RecoveryConfirmation.layout = 'AuthLayout';


RecoveryConfirmation.config = {
    title: 'Recuperar Senha',
    layout: 'AuthLayout'
}


export default RecoveryConfirmation;