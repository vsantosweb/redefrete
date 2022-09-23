import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, CloseButton, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import axios, { Axios } from 'axios';
import InputMask from 'react-input-mask';
import { Banks } from '../../../../resources/helpers/Banks';
import CPFValidation from '../../../../resources/helpers/CPFValidation';
import InputCustom from '../../../../resources/components/UI/Input/InputCustom';

const BankForm = ({ form }) => {

    return (
        <div>
            <Heading my={3} size={'md'}>Dados Bancários</Heading>
            <Stack spacing={3}>
                <FormControl variant={'floating'}>
                    <FormLabel>Nome do Titular</FormLabel>
                    <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('driver_bank.name',)} />
                </FormControl>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} isReadOnly variant={'floating'}>
                        <FormLabel>Banco</FormLabel>
                        <Select placeholder={'Selecione'} {...form.register('driver_bank.bank_name', { required: true })}>
                            {Banks.map((bank, index) => <option key={index}>{bank.name} - {bank.value}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl isRequired={true} isReadOnly variant={'floating'}>
                        <FormLabel>Tipo</FormLabel>
                        <Select placeholder={'Selecione'} {...form.register('driver_bank.type', { required: true })}>
                            {['Conta Corrente', 'Conta Poupança'].map((type) => <option key={type}>{type}</option>)}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Agencia</FormLabel>
                        <InputCustom accept={'number'} maxLength={6} autoComplete={'off'} {...form.register('driver_bank.bank_agency', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Número</FormLabel>
                        <InputCustom accept={'number'} maxLength={6} autoComplete={'off'} {...form.register('driver_bank.bank_number', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Digito</FormLabel>
                        <InputCustom accept={'number'} autoComplete={'off'} maxLength={1}  {...form.register('driver_bank.bank_digit', { required: true })} />
                    </FormControl>
                </Stack>

                <FormControl isInvalid={form.formState.errors?.driver_bank?.document} isRequired={true} variant={'floating'}>
                    <FormLabel>CPF Titular</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        type={'tel'}
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