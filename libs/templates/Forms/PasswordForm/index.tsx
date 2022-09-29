import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';


const PasswordForm = ({ form }) => {

    return (
        <Stack spacing={3}>

            <FormControl variant={'floating'}>
                <FormLabel>Senha</FormLabel>
                <Input type={'password'} placeholder='••••••••••' {...form.register('licence.password', { required: true, minLength: 8 })} />
            </FormControl>

            <input hidden {...form.register('accepted_terms')} defaultValue={1} />

            <FormControl isInvalid={form.formState?.errors?.licence?.password_confirmation} variant={'floating'}>
                <FormLabel>Confirme a senha</FormLabel>
                <Input isInvalid={form.formState?.errors?.licence?.password_confirmation} type={'password'} placeholder='••••••••••'
                    {...form.register('licence.password_confirmation', {
                        required: true,
                        validate: (value) => value === form.watch('licence.password') || 'As senhas não conferem'
                    })}
                />
                <FormErrorMessage>{form.formState?.errors?.licence?.password_confirmation?.message as never}</FormErrorMessage>
            </FormControl>
        </Stack>

    )
}

export default PasswordForm;