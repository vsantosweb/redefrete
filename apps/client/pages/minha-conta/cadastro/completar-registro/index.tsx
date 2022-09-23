import React from 'react'
import { useForm, UseFormProps } from 'react-hook-form'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Heading, Stack } from '@chakra-ui/react';
import * as Styled from '../../styles';
// import { Step, Steps, useSteps } from 'chakra-ui-steps';

import api from '../../../api';

import { AddressForm, LicenceForm, BankForm, VehicleForm } from '../../../../resources/components/forms';
import base64FileConverter from '../../../../resources/helpers/base64FileConverter';
import PasswordForm from '../../../../resources/components/forms/PasswordForm';

import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverAuthRepository } from '@redefrete/interfaces';
import { useRouter } from 'next/router';


const content = (
    <h2>step content</h2>
);

const steps = [
    { label: 'Dados Cadastrais', content },
    { label: 'Endereço', content },
    { label: 'Dados Bancários', content },
    { label: 'Veículo', content },
];

export async function getServerSideProps(req, res) {
    
    return await api.get('/driver/auth/register/verify?trackid=' + req.query.trackid)
        .then(response => {
            return {
                props: {
                    driver: response.data.data
                }
            }
        })
        .catch(error => {
            return {
                redirect: {
                    permanent: true,
                    destination: '/minha-conta/login'
                }
            }
        })
}


function RegisterComplete({ history, driver }) {
    // driver = { "id": 9, "name": "Joao Doe", "email": "souzavito@hsfotmail.com", "register_complete": 0 }

    const registerForm = useForm<UseFormProps | any>({ mode: 'onChange', defaultValues: { licence: { name: driver.name }, driver_id: driver.id } });

    const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);

    // const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    //     initialStep: 0,
    // });

    const router = useRouter();
    
    const driverAuthService = container.get<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH);

    const handleFinishRegister = async (driver) => {

        driver.licence.document_file = await base64FileConverter(driver.licence.document_file[0]);
        driver.address.document_file = await base64FileConverter(driver.address.document_file[0]);
        driver.vehicle.document_file = await base64FileConverter(driver.vehicle.document_file[0]);

        await driverAuthService.completeRegister(driver).then(() => { setRegisterSuccess(true) })
    }

    if (!registerSuccess) {
        return (
            <form onSubmit={registerForm.handleSubmit(handleFinishRegister)}>
                <div>
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Informações Pessoais</h3>
                                <p className="mt-1 text-sm text-gray-600">Informe os dados da sua CNH e em seguida crie uma senha de acesso.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <LicenceForm form={registerForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Endereço</h3>
                                <p className="mt-1 text-sm text-gray-600">Informe o endereço da sua residência.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <AddressForm form={registerForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Dados bancários</h3>
                                <p className="mt-1 text-sm text-gray-600">Insira sua conta bancária para recebimento de pagamentos.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <BankForm form={registerForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"></div>
                    </div>
                </div>

                <div className="mt-10 mb-4 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Dados do veículo</h3>
                                <p className="mt-1 text-sm text-gray-600">Informe os dados do veículo no qual ira operar.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <VehicleForm form={registerForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Senha</h3>
                                <p className="mt-1 text-sm text-gray-600">Crie uma senha para acessar sua conta Redefrete.</p>
                            </div>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <div className="shadow  mb-4 sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                    <PasswordForm form={registerForm} />
                                </div>
                            </div>
                            <Styled.AccountButton
                                isLoading={registerForm.formState.isSubmitting}
                                type={'submit'}
                                disabled={registerForm.formState.isSubmitting}
                                colorScheme={'primary'}>Finalizar cadastro<i className={'las la-arrow-right'}></i></Styled.AccountButton>
                        </div>

                    </div>
                </div>
            </form>
        )
    } else {
        return <Stack spacing={4}>
            <Alert
                status='success'
                size={'lg'}
                colorScheme={'primary'}
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='260px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>Cadastro efetuado com sucesso!</AlertTitle>
                <AlertDescription maxWidth='sm'>Obrigado por fazer parte do time Redefrete. Seu cadastro foi enviado para análise e em breve você você fará parte da nossa equipe.</AlertDescription>
            </Alert>
            <Styled.AccountButton onClick={() => router.push('/minha-conta/login')} colorScheme={'primary'}>Acessar minha conta<i className={'las la-arrow-right'}></i></Styled.AccountButton>

        </Stack>

    }
}


RegisterComplete.config = {
    title: 'Cadastre-se',
    // layout: 'AuthLayout'
}

export default RegisterComplete;