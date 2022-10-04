import React from 'react';
import InputMask from 'react-input-mask';

import { Input } from '@chakra-ui/react';
import { CNPJValidation, CPFValidation } from '@redefrete/helpers';

type DocumentInputProps = {
    label: string,
    acceptFiles: string[],
    maxSize: string,
}

const documentInputMask = {
    document_1: {
        mask: '999.999.999-99',
        validator: CPFValidation
    },
    document_2: {
        mask: '99.999.999/9999-99',
        validator: CNPJValidation
    },
}

const DocumentInput = React.forwardRef(({ validation, useForm, ...rest }: any, ref) => {
    const [documentType, setDocumentType] = React.useState('CPF');
    
    console.log(documentType)
    const choseDocumentType = (e) => {
        console.log(e.target.value, 'bluuuur')
        let value = e.target.value.replace(/[^0-9]/g, '');
        setDocumentType(value.length <= 11 ? 'document_1' : 'document_2')
    }

    return (
        <InputMask
            alwaysShowMask={true}
            maskChar={null}
            mask={documentInputMask[documentType]?.mask}
            // mask={'999.999.999-99'}
            type={'tel'}
            // onBlurCapture={choseDocumentType}
            {...rest}
            ref={ref}
            {...useForm.register(`licence.document_2`, {
                required: true,
                setValueAs: v => {
                    let value = v.replace(/[^\d]/g, '');

                    setDocumentType(value.length <= 11 ? 'document_1' : 'document_2')

                    v.replace(/[^\d]/g, '')
                },
                validate: v => {

                    console.log(v, 'PORRA')

                    // documentInputMask[documentType]?.validator(v)
                }
            })}
        >
            {(inputProps => <Input  {...inputProps} autoComplete={'off'} />)}
        </InputMask>
    )
})


export default React.memo(DocumentInput);
