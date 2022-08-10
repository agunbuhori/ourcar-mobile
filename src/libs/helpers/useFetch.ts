import axios from "axios"
import React from "react"

const useFetch = <T>(url: string, params: any = {}) => {
    const [fetching, setFetching] = React.useState(true)
    const [data, setData] = React.useState<T>({} as T) 
    const [isEmpty, setIsEmpty] = React.useState<null | boolean>(null)
    const [error, setError] = React.useState<any>({})

    React.useEffect(() => {
        axios.get<T>(url, {params})
        .then((res) => {
            if (res.status === 200) {
                setData(res.data)
            }
            
            setFetching(false)
        })
        .catch((err) => {
            setError(err)
        })
    }, [])

    return {fetching, data, isEmpty, error}
}

export default useFetch