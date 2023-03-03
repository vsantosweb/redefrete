import React from 'react'
import { CheckboxGroup, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { stateList } from '@redefrete/helpers';
import { InputCustom, InputFile } from '@redefrete/components';

import { IDriverLicenceRepository } from '@redefrete/interfaces';
import { container, SERVICE_KEYS } from '@redefrete/container';

const driverLicence = container.get<IDriverLicenceRepository>(SERVICE_KEYS.DRIVER_LICENCE_REPOSITORY);

const LicenceForm = ({ form, licence = null }) => {

    const [driverLicenceCategories, setDriverLicenceCategories] = React.useState(null)

    React.useEffect(() => { driverLicence.getCategories().then(response => setDriverLicenceCategories(response)) }, [])

    return (
        <Stack spacing={3}>

            <Stack direction={'row'} width={'100%'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Nº CNH </FormLabel>
                    <InputCustom
                        defaultValue={licence?.document_number || ''}
                        accept={'number'}
                        type={'tel'}
                        maxLength={11}
                        {...form.register('licence.document_number', { required: true })}
                    />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Cod. </FormLabel>
                    <InputCustom
                        defaultValue={licence?.security_code || ''}
                        accept={'number'}
                        type={'tel'}
                        maxLength={12}
                        autoComplete={'off'}
                        placeholder={'000000000000'}
                        {...form.register('licence.security_code', { required: true })}
                    />
                </FormControl>

            </Stack>

            <FormControl variant={'floating'}>
                <FormLabel>Categoria</FormLabel>
                {driverLicenceCategories && <Select
                    placeholder={'Selecione...'}
                    defaultValue={licence?.driver_licence_category_id || ''}
                    {...form.register('licence.driver_licence_category_id', { required: true })}>
                    {driverLicenceCategories?.map((category, index) => <option value={category.id} key={index}>{category.name}</option>)}
                </Select>}
            </FormControl>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Vencimento</FormLabel>
                    <Input defaultValue={licence?.expire_at || ''} type={'date'} autoComplete={'off'} placeholder={'000.000.000-00'} {...form.register('licence.expire_at', { required: true })} />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>UF</FormLabel>
                    <Select defaultValue={licence?.uf || ''} {...form.register('licence.uf', { required: true })}>
                        {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormControl>

            </Stack>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Nome da mãe</FormLabel>
                    <InputCustom defaultValue={licence?.mother_name || ''} accept={'alpha'}  {...form.register('licence.mother_name', { required: true, pattern: { value: /[A-Za-z]/ } })} />
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Data da 1ª habilitação</FormLabel>
                    <Input defaultValue={licence?.expire_at || ''} type={'date'} autoComplete={'off'} placeholder={'000.000.000-00'} {...form.register('licence.first_licence_date', { required: true })} />
                </FormControl>
            </Stack>
            <InputFile
                required
                label={'Foto da CNH frente e verso'}
                acceptFiles={['PNG', 'JPG', 'GIF']}
                maxSize={'2MB'}
                {...form.register('licence.document_file', { require: true })}
            />

        </Stack>

    )
}

export default LicenceForm;