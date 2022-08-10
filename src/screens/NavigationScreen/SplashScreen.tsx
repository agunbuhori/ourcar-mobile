import { View } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";

const SplashScreen = () => (
    <View flex="1" justifyContent="center" alignItems="center" bg="black">
        <ActivityIndicator color="white"/>
    </View>
)

export default SplashScreen