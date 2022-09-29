import { Button, FormControl, FormLabel, HStack, Input, Select, Stack } from '@chakra-ui/react';
import React from 'react';

// import { Container } from './styles';

const VehicleForm: React.FC = () => {
    return (
        <form style={{ padding: '1.2em' }}>
            <Stack spacing={3}>

                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '.7em 0' }}>Dados do Veículo</h3>
                <HStack>
                    <FormControl isInvalid={false}>
                        <FormLabel>Placa do veículo</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                    <FormControl isInvalid={false}>
                        <FormLabel>Renavam</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                </HStack>

                <FormControl isInvalid={false}>
                    <FormLabel>Marca</FormLabel>
                    <Input variant={'flushed'} />
                </FormControl>

                <HStack>
                    <FormControl isInvalid={false}>
                        <FormLabel>Modelo</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                    <FormControl isInvalid={false}>
                        <FormLabel>Versão</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                </HStack>

                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '.7em 0' }}>Dados do Proprietário</h3>

                <FormControl isInvalid={false}>
                    <FormLabel>Conta</FormLabel>
                    <Select>
                        <option>Nubank - Pagamentos </option>
                    </Select>
                </FormControl>

                <HStack>
                    <FormControl isInvalid={false}>
                        <FormLabel>CPF/CNPJ</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                    <FormControl isInvalid={false}>
                        <FormLabel>NOME/RAZÃO SOCIAL</FormLabel>
                        <Input variant={'flushed'} />
                    </FormControl>
                </HStack>

                <FormControl isInvalid={false}>
                    <FormLabel>Telefone</FormLabel>
                    <Input variant={'flushed'} />
                </FormControl>

                <div style={{ textAlign: 'right' }}><Button colorScheme={'primary'}>Concluir</Button></div>
            </Stack>
        </form>
    );
}

export default VehicleForm;