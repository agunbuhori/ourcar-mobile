import React from "react"
import { Button, Image, Text, View } from "native-base"
import useAuthService from "../../libs/services/auth.service"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "../NavigationScreen/NavigationScreen"

type Props = StackScreenProps<RootStackParamList, 'NoUnit'>
const NoUnitScreen = ({navigation}: Props) => {
    const authService = useAuthService()
    const [signOutProcess, setSignOutProcess] = React.useState(false)

    const signOut = async () => {
        setSignOutProcess(true)
        authService.signOut()
        setSignOutProcess(false)
        navigation.replace('Login')
    }

    return (
        <View bg="black" flex={1} justifyContent="center" alignItems="center" p="4">
            <Image source={require("../../resources/image/garage.png")} width={100} height={100} alt="nocar"/>
            <Text color="#e1e1e1" mt="4" fontSize="lg" textAlign="center">You don't have any car. Please contact administrator if it's wrong.</Text>

            <Button colorScheme="amber" mt="8" isLoading={signOutProcess} onPress={signOut}>Sign Out</Button>
        </View>
    )
}

export default NoUnitScreen