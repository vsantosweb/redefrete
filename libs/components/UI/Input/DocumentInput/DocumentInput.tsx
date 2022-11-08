import React from 'react';

import { FormErrorMessage, Input } from "@chakra-ui/react";
import InputMask from 'react-input-mask';
import CPFValidation from "./CPFValidation";


type documentType = 'CPF' | 'CNPJ';

export default function DocumentInput({ ...props }) {

    const [documentType, setDocumentType] = React.useState<documentType>('CPF')

    return (
        <InputMask
            alwaysShowMask={true}
            maskChar={null}
            mask={documentType === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99'}
            onChange={e => e.target.value.length > 11 && setDocumentType('CNPJ')}
            {...props}
        >
            {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'999.999.999-99'} />)}
        </InputMask>
    )
}