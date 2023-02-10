import React from 'react';
import InputMask from 'react-input-mask';

import { FormControl, FormErrorMessage, FormLabel, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { CNPJValidation, CPFValidation } from '@redefrete/helpers';


const documentInputMask = {
    document_1: {
        mask: '999.999.999-99',
        validator: CPFValidation,
        label: 'CPF'
    },
    document_2: {
        mask: '99.999.999/9999-99',
        validator: CNPJValidation,
        label: 'CNPJ'
    },
}

const DocumentInput = ({ useForm, field, selectedDocument = null, loadOnly=null, ...rest }) => {

    const [documentType, setDocumentType] = React.useState('document_1');

    const choseDocumentType = (value) => {
        useForm.resetField(field);
        setDocumentType(value);
        selectedDocument && selectedDocument(value)
    }
    //funcao para acessar keys
    // const accessFieldValue = (obj, field) => { 
    //     const accessArray = field.split('.');
    //     return accessArray.reduce((acc, curr) => console.log(acc.owner_document, curr , 'kkkkkkkkkkk'), obj);
    //   };

    return (
        <FormControl isInvalid={useForm.formState.errors?.[field]} isRequired={true} variant={'floating'}>

            <RadioGroup mb={3} onChange={choseDocumentType} value={documentType}>
                <Stack direction='row'>
                    <Radio value='document_1'>CPF</Radio>
                    <Radio value='document_2'>CNPJ</Radio>
                </Stack>
            </RadioGroup>

            <InputMask
                alwaysShowMask={true}
                mask={documentInputMask[documentType]?.mask || null}
                type={'tel'}
                {...rest}
                {...useForm.register(field, {
                    required: true,
                    setValueAs: v => v.replace(/[^\d]/g, ''),
                    validate: v => {
                        return documentInputMask[documentType].validator(v);
                    }
                })}
            >
                {(inputProps => <Input  {...inputProps} autoComplete={'off'} />)}
            </InputMask>
            <FormErrorMessage>Insira um documento {documentInputMask[documentType].label} válido.</FormErrorMessage>

        </FormControl>
    )
}


export default DocumentInput;
