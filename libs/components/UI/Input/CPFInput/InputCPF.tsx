import { FormErrorMessage, Input } from "@chakra-ui/react";
import InputMask from 'react-input-mask';
import CPFValidation from "./CPFValidation";

export default function InputCPF({ ...props }) {
    return (
        <>
            <InputMask
                alwaysShowMask={true}
                maskChar={null}
                mask={'999.999.999-99'}
                {...props}
            >
                {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'999.999.999-99'} />)}
            </InputMask>
        </>
    )
}