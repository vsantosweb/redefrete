import React from 'react'
import { useForm } from 'react-hook-form'
import { Alert, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import * as Styled from '../styles';
import InputMask from 'react-input-mask';

import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository, IVehicleTypeRepository } from '@redefrete/interfaces';
import { useRouter } from 'next/router';
import { InputCustom } from '@redefrete/components';

const driverAuthService = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);

const vehicleTypes = [
    { id: 1, name: 'Carro', value: 'carros' },
    { id: 2, name: 'Moto', value: 'motos' },
    { id: 3, name: 'Caminhão', value: 'caminhoes' },
]

function Register({ history }) {

    const router = useRouter();

    const { handleSubmit, register, watch, formState: { isValid, isSubmitting, isSubmitSuccessful } } = useForm({ mode: 'onChange' });
    const [errorMessage, setErrorMessage] = React.useState();
    const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);
    
    const handleSubmitRegister = async (driver) => {
       await driverAuthService.sampleRegister(driver).then((response) => setRegisterSuccess(true))
        .catch(error => setErrorMessage(error.response.data.message))
    }

    if (!registerSuccess) {
        return <form onSubmit={handleSubmit(handleSubmitRegister)}>
            <Stack spacing={3}>

                <FormControl isRequired={true}>
                    <FormLabel>Nome</FormLabel>
                    <Input autoComplete={'off'} placeholder={'Nome completo'} {...register('name', { required: true, minLength: 4 })} />
                </FormControl>
                <FormControl isRequired={true}>
                    <FormLabel>Endereço de email</FormLabel>
                    <Input autoComplete={'off'} type={'email'} placeholder='Seu melhor email'{...register('email', { required: true, minLength: 4 })} />
                </FormControl>

                <FormControl isRequired={true}>
                    <FormLabel>Telefone/WhatsApp</FormLabel>
                    <InputMask
                        mask={'(99) 99999-9999'}
                        autoComplete={'off'}
                        type={'tel'}
                        {...register('phone', { required: true, minLength: 11, setValueAs: v => v.replace(/[^\d]/g, '') })}
                    >
                        {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                    </InputMask>
                </FormControl>

                <Stack direction={'row'}>
                    <FormControl isRequired={true}>
                        <FormLabel>Placa</FormLabel>
                        <Input maxLength={7} autoComplete={'off'} placeholder={'Placa do veículo'} {...register('licence_plate', { required: true, minLength: 4 })} />
                    </FormControl>
                    <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>CEP</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        mask={'99999-999'}
                        {...register('zipcode', {
                            required: true,
                            minLength: 8,
                            setValueAs: v => v.replace(/[^\d]/g, ''),
                        })}>
                        {(inputProps => <Input type={'tel'} {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                    </InputMask>
                </FormControl>
                </Stack>

                <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Tipo de veículo</FormLabel>
                        <Select  placeholder={'Selecione...'} {...register('vehicle_type', { required: true, })}  >
                            {vehicleTypes.map((type, index) => <option value={type.value} key={index}>{type.name} </option>)}
                        </Select>
                    </FormControl>

                <Styled.AccountButton disabled={!isValid} isLoading={isSubmitting} type={'submit'} colorScheme={'secondary'}>Registrar-se <i className={'las la-arrow-right'}></i></Styled.AccountButton>
                {errorMessage && <Alert variant={'solid'} status='error'>
                    <AlertIcon />
                    <AlertDescription fontSize={14}>{errorMessage}</AlertDescription>
                </Alert>}
                <Styled.AccountButton onClick={() => router.push('/minha-conta/login')} colorScheme={'primary'}>Já possuo uma conta<i className={'las la-arrow-right'}></i></Styled.AccountButton>

            </Stack>
        </form>
    } else {
        return <Stack spacing={4}>
            <Alert
                status='success'
                colorScheme={'primary'}
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='260px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>Cadastro efetuado com sucesso!</AlertTitle>
                <AlertDescription maxWidth='sm'>
                    <p>Obrigado por fazer parte do time Redefrete.</p>
                    <p>Enviamos um email para você confirmar seu pré-cadastro.</p>
                </AlertDescription>
            </Alert>
            {/* <Styled.AccountButton onClick={() => history.push('/minha-conta/login')} colorScheme={'primary'}>Acessar minha conta<i className={'las la-arrow-right'}></i></Styled.AccountButton> */}
        </Stack>

    }
}


Register.config = {
    title: 'Cadastre-se',
    layout: 'AuthLayout'
}

export default Register;