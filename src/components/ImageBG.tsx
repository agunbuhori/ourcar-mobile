import React from "react";
import { Dimensions, ImageBackground } from "react-native";

const ImageBG = () => {

    return (
        <ImageBackground style={{width: Dimensions.get('window').width, height: 500, position: 'absolute'}} source={require("../resources/image/bg.png")}/>
    )
}

export default ImageBG