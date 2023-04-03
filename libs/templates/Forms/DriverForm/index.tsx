import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { DocumentInput, InputCustom } from '@redefrete/components';
import { CPFValidation, stateList } from '@redefrete/helpers';
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

const maritalStatus = [
    'SOLTEIRO',
    'CASADO',
    'SEPARADO',
    'DIVORCIADO',
    'VIÚVO',
    'OUTROS',
]
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
                    mask={'999.999.999-99'}
                    type={'tel'}
                    defaultValue={driver?.document_1 || ''}
                    {...form.register('document_1', {
                        required: true,
                        minLength: 8,
                        setValueAs: v => v.replace(/[^\d]/g, ''),
                        validate: v => {
                            return CPFValidation(v);
                        }
                    })}>{(inputProps => <Input  {...inputProps} autoComplete={'off'} />)}</InputMask>
                <FormErrorMessage>Insira um documento válido.</FormErrorMessage>
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
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99 99999-999'} />)}
                </InputMask>
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Telefone de emergência (Opcional)</FormLabel>
                <InputMask
                    mask={'(99) 99999-9999'}
                    autoComplete={'off'}
                    type={'tel'}
                    defaultValue={driver?.phone_2 || null}
                    {...form.register('phone_2', { required: true, minLength: 11, setValueAs: v => v.replace(/[^\d]/g, '') })}
                >
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99 99999-999'} />)}
                </InputMask>
            </FormControl>

            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Nº RG</FormLabel>
                <InputCustom
                    accept={'noSpecialChar'}
                    maxLength={15}
                    autoComplete={'off'}
                    defaultValue={driver?.rg || ''}
                    {...form.register('rg', { required: true, minLength: 4 })}
                />
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>CNPJ MEI (Opcional)</FormLabel>
                <InputMask
                    mask={'99.999.999/9999-99'}
                    autoComplete={'off'}
                    type={'tel'}
                    defaultValue={driver?.document_2 || null}
                    {...form.register('document_2', { setValueAs: v => v.replace(/[^\d]/g, '') })}
                >
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99.999.999/9999-99'} />)}

                </InputMask>
            </FormControl>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Data de emissão</FormLabel>
                    <Input
                        defaultValue={driver?.rg_issue || ''}
                        type={'date'} autoComplete={'off'}
                        {...form.register('rg_issue', { required: true })} />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>UF</FormLabel>
                    <Select placeholder={'Selecione...'} defaultValue={driver?.rg_uf || ''} {...form.register('rg_uf', { required: true })}>
                        {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Gênero</FormLabel>
                    <Select placeholder={'Selecione...'} {...form.register('gender', { required: true })} defaultValue={driver?.gender || null}>
                        <option value={'M'}>Masculino</option>
                        <option value={'F'}>Feminino</option>
                        <option value={'O'}>Outro</option>
                    </Select>
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Estado civil</FormLabel>
                    <Select placeholder={'Selecione...'} {...form.register('marital_status', { required: true })} defaultValue={driver?.marital_status || null}>
                        {maritalStatus.map(status => <option key={status} value={status}>{status}</option>)}

                    </Select>
                </FormControl>
            </Stack>

        </Stack>
    )
}

export default DriverForm;