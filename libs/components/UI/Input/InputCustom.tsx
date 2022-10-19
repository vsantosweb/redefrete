import { Input } from '@chakra-ui/react';
import React from 'react'


type InputCustomProps = {
    accept: 'alpha' | 'number' | 'noSpecialChar'
    ref: any
    props?: any
}

const acceptFormats = {

    number: {
        validate: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
        },
    },
    alpha: {
        validate: (e) => {
            e.target.value = e.target.value.replace((/[`!@#¨$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/), '')
        },
    },
    noSpecialChar: {
        validate: (e) => {
            e.target.value = e.target.value.replace(/[^\w\s]/gi, "")
        },
    },

}

const InputCustom = React.forwardRef(({ accept, ...props }: InputCustomProps | any, ref) => {

    return <Input ref={ref} maxLength={45} onChangeCapture={acceptFormats[accept].validate} {...props} />
})

export default InputCustom;



// e.target.value.replace(/[^\w ]/g, '')
