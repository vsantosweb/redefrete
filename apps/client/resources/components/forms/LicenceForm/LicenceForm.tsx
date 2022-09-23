import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import CPFValidation from '../../../../resources/helpers/CPFValidation';
import { stateList } from '../../../../resources/helpers/StateList';
import InputCustom from '../../../../resources/components/UI/Input/InputCustom';
import InputFile from '../../InputFile';


const LicenceForm = ({ form }) => {

    return (
        <Stack spacing={3}>

            <FormControl isReadOnly={true} variant={'floating'}>
                <FormLabel>Nome Completo</FormLabel>
                <Input isDisabled autoComplete={'off'} {...form.register('licence.name')} />
            </FormControl>
            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Data de nascimento</FormLabel>
                <Input type={'date'} autoComplete={'off'} placeholder={'000.000.000-00'} {...form.register('licence.birth_date', { required: true, minLength: 4 })} />
            </FormControl>

            <FormControl isRequired={true}>
                <FormLabel>Genero</FormLabel>
                <RadioGroup>
                    <Stack direction='row'>
                        <Radio {...form.register('licence.gender', { required: true })} value={'Masculino'}>Masculino</Radio>
                        <Radio {...form.register('licence.gender', { required: true })} value={'Feminino'}>Feminino</Radio>
                        <Radio {...form.register('licence.gender', { required: true })} value={'Outro'}>Outro</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl isInvalid={form.formState.errors?.licence?.document_1} isRequired={true} variant={'floating'}>
                <FormLabel>CPF</FormLabel>
                <InputMask
                    alwaysShowMask={true}
                    maskChar={null}
                    mask={'999.999.999-99'}
                    type={'tel'}
                    {...form.register('licence.document_1', {
                        required: true,
                        setValueAs: v => v.replace(/[^\d]/g, ''),
                        validate: v => CPFValidation(v)
                    })}>
                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'000.000.000-00'} />)}
                </InputMask>
                <FormErrorMessage>CPF Inválido</FormErrorMessage>
            </FormControl>

            <Stack direction={'row'} width={'100%'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Nº CNH </FormLabel>
                    <InputCustom accept={'number'} type={'tel'} maxLength={11}  {...form.register('licence.document_number', { required: true })} />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Cod. </FormLabel>
                    <InputCustom accept={'number'} type={'tel'} maxLength={3} autoComplete={'off'} placeholder={'000'} {...form.register('licence.security_code', { required: true })} />
                </FormControl>

            </Stack>
            <FormControl variant={'floating'}>
                <FormLabel>Categoria</FormLabel>
                <Stack gap={4} direction={'row'}>
                    <CheckboxGroup>
                        {['A', 'B', 'C', 'D'].map((type, index) => <Checkbox key={index} {...form.register('licence.type', { required: true })} value={type}>{type}</Checkbox>)}
                    </CheckboxGroup>
                </Stack>
            </FormControl>

            <Stack direction={'row'}>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Vencimento</FormLabel>
                    <Input type={'date'} autoComplete={'off'} placeholder={'000.000.000-00'} {...form.register('licence.expire_at', { required: true })} />
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>UF</FormLabel>
                    <Select {...form.register('licence.uf', { required: true })}>
                        {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormControl>
            </Stack>

            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Nome da mãe</FormLabel>
                <InputCustom accept={'alpha'}  {...form.register('licence.mother_name', { required: true, pattern: { value: /[A-Za-z]/ } })} />
            </FormControl>

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