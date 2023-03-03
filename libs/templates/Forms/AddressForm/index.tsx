import React from 'react'
import { FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { InputFile } from '@redefrete/components';

const AddressForm = ({ form, address = null }: any) => {


    React.useEffect(() => {

        const zipcode = address?.zipcode;

        if(zipcode){
            fillAddressFields(zipcode)
            form.setValue('address.zipcode', zipcode)
        }
        
    })

    const resetAddress = () => {
        form.setValue('address.address_1', '')
        form.setValue('address.address_2', '')
        form.setValue('address.city', '')
        form.setValue('address.state', '')
    }

    const fillAddressFields = (zipcode: string) => {

        axios.get(`https://viacep.com.br/ws/${zipcode}/json`).then(response => {
            if (response.data.erro) return resetAddress()
            form.setValue('address.address_1', response.data.logradouro)
            form.setValue('address.address_2', response.data.bairro)
            form.setValue('address.city', response.data.localidade)
            form.setValue('address.state', response.data.uf)
        })

    }
    return (
        <div>
            <Stack spacing={3}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>CEP</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        type={'tel'}
                        defaultValue={address?.zipcode}
                        mask={'99999-999'}
                        {...form.register('address.zipcode', {
                            required: true,
                            maxLength: 8,
                            setValueAs: v => v.replace(/[^\d]/g, ''),
                            validate:  (value) => {
                               return value.length === 8  ?  fillAddressFields(value) : resetAddress()
                            }
                        })}>
                        {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                    </InputMask>

                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Endereço</FormLabel>
                    <Input defaultValue={address?.address_1} autoComplete={'off'}  {...form.register('address.address_1', { required: true })} />
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Bairro</FormLabel>
                    <Input defaultValue={address?.address_2} autoComplete={'off'}  {...form.register('address.address_2', { required: true })} />
                </FormControl>

                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Cidade</FormLabel>
                        <Input defaultValue={address?.city} autoComplete={'off'} {...form.register('address.city', { required: true })} />
                    </FormControl>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Estado</FormLabel>
                        <Input defaultValue={address?.state} autoComplete={'off'}  {...form.register('address.state', { required: true })} />
                    </FormControl>
                </Stack>
                <Stack direction={'row'}>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Nº</FormLabel>
                        <Input defaultValue={address?.number} autoComplete={'off'} type={'tel'}  {...form.register('address.number', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Complemento</FormLabel>
                        <Input defaultValue={address?.complement} autoComplete={'off'} {...form.register('address.complement')} />
                    </FormControl>
                </Stack>

                <InputFile
                    required
                    // defaultValue={address?.document_file}
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