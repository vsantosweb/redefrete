import { Input } from '@chakra-ui/react';
import React from 'react'


type InputCustomProps = {
    accept: 'alpha' | 'number'
    ref: any
    props?: any
}

const acceptFormats = {

    number: {
        validate: (e) => {
            e.target.value = e.target.value.replace(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~ ]+/g, '')
        },
        inputType: 'number'
    },
    alpha: {
        validate: (e) => {
            e.target.value = e.target.value.replace((/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/), '')
        },
        inputType: 'text'
    },

}

const InputCustom = React.forwardRef(({ accept, ...props }: InputCustomProps | any, ref) => {

    return <Input type={acceptFormats[accept].inputType} ref={ref} onChangeCapture={acceptFormats[accept].validate} {...props} />
})

export default InputCustom;



// e.target.value.replace(/[^\w ]/g, '')
