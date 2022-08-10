import { StackScreenProps } from "@react-navigation/stack";
import { View } from "native-base";
import React from "react";
import WebView from "react-native-webview";
import { RootStackParamList } from "../NavigationScreen/NavigationScreen";

type BrowserScreenProps = StackScreenProps<RootStackParamList, 'Browser'>
const BrowserScreen = ({route,navigation}:BrowserScreenProps) => {

    React.useEffect(() => {
        navigation.setOptions({title: route.params.title})
    }, [])

    return (
        <View flex="1" bg="black">
            <WebView source={{uri: route.params.url}}/>
        </View>
    )
}

export default BrowserScreen