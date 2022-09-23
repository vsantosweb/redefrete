import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import CPFValidation from '../../../../resources/helpers/CPFValidation';
import { stateList } from '../../../../resources/helpers/StateList';
import InputCustom from '../../../../resources/components/UI/Input/InputCustom';
import InputFile from '../../InputFile';


const PasswordForm = ({ form }) => {

    return (
        <Stack spacing={3}>

            <FormControl variant={'floating'}>
                <FormLabel>Senha</FormLabel>
                <Input type={'password'} placeholder='••••••••••' {...form.register('licence.password', { required: true, minLength: 8 })} />
            </FormControl>

            <input hidden {...form.register('accepted_terms')} defaultValue={1} />

            <FormControl isInvalid={form.formState?.errors?.licence?.password_confirmation} variant={'floating'}>
                <FormLabel>Confirme sua senha</FormLabel>
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