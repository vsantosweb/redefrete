import React from 'react'
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { InputFile } from '@redefrete/components';

const AddressForm = ({ form, editData = null }: any) => {

    if (editData) {
        form.setValue('address.address_1', editData.address_1)
        form.setValue('address.address_2', editData.address_2)
        form.setValue('address.city', editData.city)
        form.setValue('address.state', editData.state)
    }

    const resetAddress = () => {
        form.setValue('address.address_1', '')
        form.setValue('address.address_2', '')
        form.setValue('address.city', '')
        form.setValue('address.state', '')
    }
    return (
        <div>
            <Stack spacing={3}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>CEP</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        mask={'99999-999'}
                        {...form.register('address.zipcode', {
                            required: true,
                            maxLength: 8,
                            setValueAs: v => v.replace(/[^\d]/g, ''),
                            validate: async (value) => {
                                value.length === 8 ? axios.get(`https://viacep.com.br/ws/${value}/json`).then(response => {
                                    if (response.data.erro) return resetAddress()
                                    form.setValue('address.address_1', response.data.logradouro)
                                    form.setValue('address.address_2', response.data.bairro)
                                    form.setValue('address.city', response.data.localidade)
                                    form.setValue('address.state', response.data.uf)
                                }) : resetAddress()
                            }
                        })}>
                        {(inputProps => <Input type={'tel'} {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                    </InputMask>
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Endereço</FormLabel>
                    <Input autoComplete={'off'}  {...form.register('address.address_1', { required: true })} />
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Bairro</FormLabel>
                    <Input autoComplete={'off'}  {...form.register('address.address_2', { required: true })} />
                </FormControl>

                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Cidade</FormLabel>
                        <Input autoComplete={'off'} {...form.register('address.city', { required: true })} />
                    </FormControl>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Estado</FormLabel>
                        <Input autoComplete={'off'}  {...form.register('address.state', { required: true })} />
                    </FormControl>
                </Stack>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Nº</FormLabel>
                        <Input autoComplete={'off'} type={'tel'}  {...form.register('address.number', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Complemento</FormLabel>
                        <Input autoComplete={'off'} {...form.register('address.complement')} />
                    </FormControl>
                </Stack>

                <InputFile
                    required
                    label={'Comprovante de residência'}
                    acceptFiles={['PNG', 'JPG', 'GIF']}
                    maxSize={'2MB'}
                    {...form.register('address.document_file', { require: true })}
                />
            </Stack>

        </div>
    )
}

export default AddressForm;