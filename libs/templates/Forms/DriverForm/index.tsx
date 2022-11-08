import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { DocumentInput, InputCustom } from '@redefrete/components';
import { CPFValidation, stateList, suspenseResource } from '@redefrete/helpers';
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
                <DocumentInput field={'document_1'} useForm={form} />
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

            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Nº RG</FormLabel>
                <InputCustom
                    accept={'noSpecialChar'}
                    maxLength={9}
                    autoComplete={'off'}
                    defaultValue={driver?.birthday || ''}
                    {...form.register('rg', { required: true, minLength: 4 })}
                />
            </FormControl>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Data de emissão</FormLabel>
                    <Input
                        defaultValue={driver?.licence?.expire_at || ''}
                        type={'date'} autoComplete={'off'}
                        {...form.register('rg_issue', { required: true })} />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>UF</FormLabel>
                    <Select defaultValue={driver?.licence?.uf || ''} {...form.register('rg_uf', { required: true })}>
                        {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormControl>
            </Stack>
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