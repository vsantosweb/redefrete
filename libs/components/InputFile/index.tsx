import { Input } from '@chakra-ui/react';
import React from 'react'

type InputFileProps = {
    label: string,
    acceptFiles: string[],
    maxSize: string,
}



const InputFile = React.forwardRef(({ label, acceptFiles, maxSize, ...rest }: InputFileProps | any, ref) => {
    
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Input ref={ref} id={rest.name} type="file" {...rest}
                accept='application/pdf, image/*' />
        </div>
    )
})


export default React.memo(InputFile);