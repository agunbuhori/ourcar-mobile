import React from "react"
import { Box, Button, Image, Input, Text, Toast, View, VStack } from "native-base"
import { StackScreenProps } from "@react-navigation/stack"
import { SafeAreaView } from "react-native-safe-area-context"
import useAuthService from "../../libs/services/auth.service"
import { RootStackParamList } from "../NavigationScreen/NavigationScreen"

type LoginProps = StackScreenProps<RootStackParamList, 'Login'>
const LoginScreen = ({ navigation }: LoginProps) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [authenticating, setAuthenticating] = React.useState(false)
    const authService = useAuthService()

    const authenticate = async () => {
        if (! email || ! password) return false;
        
        setAuthenticating(true)
        const auth = await authService.signIn(email, password)
        setAuthenticating(false)
        
        if (auth) {
            navigation.replace('Menu')
        } else {
            Toast.show({title: "Authentication failed", description: "Please check the credentials"});
        }
    }

    return (
        <View bg="black" flex="1" justifyContent="center" alignItems="center">
            <SafeAreaView>
                <Image source={require("../../resources/image/logo.png")} alt="logo" width={200} height={130} alignSelf="center" mb="12"/>
                <VStack m="4" space={4} w="full" px="4">
                    <Box>
                        <Text fontSize="4xl" color="white" textAlign="center" lineHeight="2xs" fontWeight="bold">Welcome!</Text>
                        <Text fontSize="xl" color="white" textAlign="center" lineHeight="xs">Enter your credentials</Text>
                    </Box>
                    <Input _focus={{
                        borderColor: "amber.500"
                    }} w="full"
                        color="white"
                        placeholder="Email"
                        fontSize="lg"
                        autoCapitalize="none"
                        onChangeText={text => setEmail(text)}
                    />
                    <Input _focus={{
                        borderColor: "amber.500"
                    }}
                        w="full"
                        color="white"
                        placeholder="Password"
                        fontSize="lg"
                        autoCapitalize="none"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <Button isLoading={authenticating} colorScheme="amber" _text={{ fontWeight: 'bold', fontSize: "lg" }} onPress={authenticate}>
                        Sign In
                    </Button>
                </VStack>
            </SafeAreaView>
        </View>
    )
}

export default LoginScreen