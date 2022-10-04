import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { Banks, CPFValidation } from '@redefrete/helpers';
import { InputCustom } from '@redefrete/components';

const BankForm = ({ form, bank }:any) => {

    return (
        <div>
            <Heading my={3} size={'md'}>Dados Bancários</Heading>
            <Stack spacing={3}>
                <FormControl variant={'floating'}>
                    <FormLabel>Nome do Titular</FormLabel>
                    <InputCustom defaultValue={bank?.name || ''} accept={'alpha'} autoComplete={'off'} {...form.register('driver_bank.name',)} />
                </FormControl>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} isReadOnly variant={'floating'}>
                        <FormLabel>Banco</FormLabel>
                        <Select defaultValue={bank?.bank_name || ''} placeholder={'Selecione'} {...form.register('driver_bank.bank_name', { required: true })}>
                            {Banks.map((bank, index) => <option key={index}>{bank.name} - {bank.value}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl isRequired={true} isReadOnly variant={'floating'}>
                        <FormLabel>Tipo</FormLabel>
                        <Select defaultValue={bank?.type || ''} placeholder={'Selecione'} {...form.register('driver_bank.type', { required: true })}>
                            {['Conta Corrente', 'Conta Poupança'].map((type) => <option key={type}>{type}</option>)}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Agencia</FormLabel>
                        <InputCustom defaultValue={bank?.bank_agency || ''} accept={'number'} maxLength={6} autoComplete={'off'} {...form.register('driver_bank.bank_agency', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Número</FormLabel>
                        <InputCustom defaultValue={bank?.bank_number || ''} accept={'number'} maxLength={6} autoComplete={'off'} {...form.register('driver_bank.bank_number', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Digito</FormLabel>
                        <InputCustom defaultValue={bank?.bank_digit || ''} accept={'number'} autoComplete={'off'} maxLength={1}  {...form.register('driver_bank.bank_digit', { required: true })} />
                    </FormControl>
                </Stack>

                <FormControl isInvalid={form.formState.errors?.driver_bank?.document} isRequired={true}>
                    <FormLabel>CPF Titular</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        type={'tel'}
                        defaultValue={bank?.document || ''}
                        mask={'999.999.999-99'}
                        {...form.register('driver_bank.document', {
                            required: true,
                            setValueAs: v => v.replace(/[^\d]/g, ''),
                            validate: v => CPFValidation(v)
                        })}>
                        {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'000.000.000-00'} />)}
                    </InputMask>
                    <FormErrorMessage>CPF Inválido</FormErrorMessage>
                </FormControl>
            </Stack>
        </div>
    )
}

export default BankForm;