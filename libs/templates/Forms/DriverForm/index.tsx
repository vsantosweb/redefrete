import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { InputCustom } from '@redefrete/components';
import { CPFValidation, suspenseResource } from '@redefrete/helpers';
import InputMask from 'react-input-mask';

import { Path, UseFormRegister } from 'react-hook-form';
import moment from 'moment';

interface IFormValues {
    "First Name": string;
    Age: number;
}

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    required: boolean;
};

const DriverForm = ({ form, driver }: any) => {

    return (
        <Stack spacing={3}>
            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Nome Completo</FormLabel>
                <InputCustom accept={'alpha'} defaultValue={driver?.name || ''} {...form.register('name', { required: true, pattern: { value: /[A-Za-z]/ } })} />
            </FormControl>

            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Email</FormLabel>
                <Input type={'email'} defaultValue={driver?.email || ''} {...form.register('email', { required: true, minLength: 8 })} />
            </FormControl>

            <FormControl isInvalid={form.formState.errors?.document_1} isRequired={true} variant={'floating'}>
                <FormLabel>CPF</FormLabel>

                <InputMask
                    alwaysShowMask={true}
                    maskChar={null}
                    mask={'999.999.999-99'}
                    type={'tel'}
                    {...form.register('document_1', {
                        required: true,
                        setValueAs: v => v.replace(/[^\d]/g, ''),
                        validate: v => CPFValidation(v)
                    })}>
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'000.000.000-00'} />)}

                </InputMask>
                <FormErrorMessage>CPF Inválido</FormErrorMessage>
            </FormControl>

            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Data de nascimento</FormLabel>
                <Input
                    type={'date'}
                    autoComplete={'off'}
                    defaultValue={driver?.birthday || ''}
                    max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
                    {...form.register('birthday', { required: true, minLength: 4 })}
                />
            </FormControl>


            <FormControl variant={'floating'}>
                <FormLabel>Telefone/Whatsapp</FormLabel>
                <InputMask
                    mask={'(99) 99999-9999'}
                    autoComplete={'off'}
                    type={'tel'}
                    defaultValue={driver?.phone || null}
                    {...form.register('phone', { required: true, minLength: 11, setValueAs: v => v.replace(/[^\d]/g, '') })}
                >
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                </InputMask>
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Gênero</FormLabel>
                <Select placeholder={'Selecione...'} {...form.register('gender', { required: true })} defaultValue={driver?.gender || null}>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                </Select>
            </FormControl>

        </Stack>
    )
}

export default DriverForm;