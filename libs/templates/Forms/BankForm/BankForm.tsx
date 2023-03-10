import React from 'react'
import { Checkbox, FormControl, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import { Banks } from '@redefrete/helpers';
import { DocumentInput, InputCustom } from '@redefrete/components';

const BankForm = ({ form, bank }: any) => {

    // const [ownerAccount, setOwnerAccount] = React.useState(false);
    // React.useEffect(() => {

    //     if (ownerAccount) {
    //         form.setValue('driver_bank.name', form.watch('name'), { shouldValidate: true })
    //         form.setValue('driver_bank.document', form.watch('document_1'), { shouldValidate: true })
    //         return;
    //     }

    //     form.setValue('driver_bank.name', '')
    //     form.setValue('driver_bank.document', '')

    // }, [form, ownerAccount])

    return (
        <div>
            <Heading my={3} size={'md'}>Dados Bancários</Heading>
            <Stack spacing={3}>
                {/* <Checkbox defaultChecked={ownerAccount} onChange={() => setOwnerAccount(prev => !prev)}>Eu sou responsável pela conta</Checkbox>
                {
                    !ownerAccount && <>
                        <DocumentInput field={'driver_bank.document'} useForm={form} />
                        <FormControl isRequired={true}>
                            <FormLabel>Nome do Titular</FormLabel>
                            <InputCustom defaultValue={bank?.name} accept={'alpha'} autoComplete={'off'} {...form.register('driver_bank.name', { require: true })} />
                        </FormControl>
                    </>
                } */}
                <DocumentInput defaultValue={bank?.document} field={'driver_bank.document'} useForm={form} />
                <FormControl isRequired={true}>
                    <FormLabel>Nome do Titular</FormLabel>
                    <InputCustom defaultValue={bank?.name || ''} accept={'noSpecialChar'} autoComplete={'off'} {...form.register('driver_bank.name', { require: true })} />
                </FormControl>
                <Stack direction={'row'}>
                    <FormControl isRequired={true}>
                        <FormLabel>Banco</FormLabel>
                        <Select defaultValue={bank?.bank_name} placeholder={'Selecione'} {...form.register('driver_bank.bank_name', { required: true })}>
                            {Banks.map((bank, index) => <option key={index}>{bank.name} - {bank.value}</option>)}
                        </Select>
                    </FormControl>
                    <FormControl isRequired={true}>
                        <FormLabel>Tipo</FormLabel>
                        <Select defaultValue={bank?.type} placeholder={'Selecione'} {...form.register('driver_bank.type', { required: true })}>
                            {['Conta Corrente', 'Conta Poupança'].map((type) => <option key={type}>{type}</option>)}
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction={'row'}>
                    <FormControl isRequired={true}>
                        <FormLabel>Agencia</FormLabel>
                        <InputCustom defaultValue={bank?.bank_agency} type={'tel'} accept={'number'} maxLength={20} autoComplete={'off'} {...form.register('driver_bank.bank_agency', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Número</FormLabel>
                        <InputCustom defaultValue={bank?.bank_number} type={'tel'} accept={'number'} maxLength={20} autoComplete={'off'} {...form.register('driver_bank.bank_number', { required: true })} />
                    </FormControl>
                    <FormControl variant={'floating'}>
                        <FormLabel>Digito</FormLabel>
                        <InputCustom defaultValue={bank?.bank_digit} type={'tel'} accept={'number'} autoComplete={'off'} maxLength={1}  {...form.register('driver_bank.bank_digit', { required: true })} />
                    </FormControl>
                </Stack>

            </Stack>
        </div>
    )
}

export default BankForm;