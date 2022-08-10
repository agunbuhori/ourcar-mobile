import React, { Children, ReactNode } from "react";
import { View } from "native-base";
import useFetch from "./useFetch";

type Props = {
    url: string,
    children: ReactNode
}

const Fetcher: React.FC<Props> = ({children, url}) => {
    const {data, loading} = useFetch(url)
    React.useEffect(() => {

    }, [])

    return (
        <View>{Children}</View>
    )
}

export default Fetcher