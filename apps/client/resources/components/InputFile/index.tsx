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
            <label className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6" htmlFor={rest.name}>
                <div className="space-y-1 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="text-sm text-gray-600">
                        <label
                            htmlFor={rest.name}
                            className="relative cursor-pointer rounded-md bg-white font-medium text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <span>Enviar arquivo</span>
                            <input ref={ref} id={rest.name} type="file" {...rest} />
                        </label>
                        {/* <p className="pl-1">or drag and drop</p> */}
                    </div>
                    <p className="text-xs text-gray-500">{acceptFiles.join()} up to 2MB</p>
                </div>
            </label >
        </div>
    )
})


export default InputFile;