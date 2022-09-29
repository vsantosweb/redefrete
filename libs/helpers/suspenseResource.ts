
export default function suspenseResource(endpoint, param = false) {
    let status = "loading"
    let result
    let suspender

    if (param) {
        suspender = endpoint(param).then((data) => {
            status = "success"
            result = data
        },
            (error) => {
                status = "error"
                result = error
            }
        )
    } else {
        suspender = endpoint().then((data) => {
            status = "success"
            result = data
        },
            (error) => {
                status = "error"
                result = error
            }
        )
    }
    
    return {
        read() {
            if (status === "loading") {
                throw suspender
            } else if (status === "error") {
                throw result
            } else if (status === "success") {
                return result
            }
        },
    }
}