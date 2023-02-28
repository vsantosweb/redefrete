import React from 'react'
import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export const RecoveryConfirmation = ({ layout , history}: any) => {

    const router = useRouter();

    return (
        <Stack spacing={3}>
            <Heading size={'lg'}>Solicitação enviada</Heading>
            <Text>
                Acabamos de enviar instruções e um link para você redefinir a sua senha. Pode levar alguns minutinhos para chegar.
            </Text>
            <Button variant={'outline'} onClick={() => router.push('/minha-conta/login')} colorScheme={'primary'}>Voltar para o login</Button>
        </Stack>
    )
}

RecoveryConfirmation.layout = 'AuthLayout';

export default RecoveryConfirmation;