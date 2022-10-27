import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

type InputSelectProps = {
    options: Array<any>
    props?: any
    promise?:boolean
    isMulti?: boolean
    loadOptions: any
}

const SelectType = {
    promise: AsyncSelect,
    default: Select
}

const InputSelect = ({ options, promise, isMulti, ...props }: InputSelectProps) => {

    // const dataOptions = options.map(option => ({ value: option.id, label: option.name }))

    const Component = promise ? SelectType.promise : SelectType.default

    return <Component {...props} isMulti={isMulti}  />

}

export default InputSelect;
