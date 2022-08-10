import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { Button, HStack, Icon, Pressable, Text, View, VStack } from "native-base"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext, RootStackParamList } from "../../NavigationScreen/NavigationScreen"
import { BASE_URL } from '@env'
import { getVersion } from "react-native-device-info"
import { Platform } from "react-native"

const MenuIcon = ({title, icon, onPress, bg}: {title: string, icon: string, bg?: string, onPress?: () => void}) => {
    return (
    <Pressable p="4" android_ripple={{color: '#000'}} bg={! bg? 'gray.800' : bg} rounded="xl" flex="1" onPress={() => onPress && onPress()}>
        <Icon as={<Feather name={icon} />} size="xl" color="white" mb="4" />
        <Text fontSize="lg" color="white" fontWeight="bold">
            {title}
        </Text>
    </Pressable>
)
    }

type MoreScreenProps = StackScreenProps<RootStackParamList, 'Menu'>
const MoreScreen = ({navigation}: MoreScreenProps) => {
    const authContext = React.useContext(AuthContext)


    const navigate = (screen: any) => {
        navigation.navigate(screen)
    }

    return (
        <View flex="1" bg="black">
            <SafeAreaView>
                <View mx="4" mt="6">
                    <Text fontSize="4xl" fontWeight="bold" color="white">More</Text>
                </View>

                <HStack mx="4" mt="4" space="4">
                    <MenuIcon title="Discover Our Events" bg="amber.500" icon="gift" onPress={() => navigate('Events')} />
                </HStack>

                <HStack mx="4" mt="4" space="4">
                    <MenuIcon title="My Profile" icon="user" onPress={() => navigate('Profile')} />
                    <MenuIcon title="My Cars" icon="truck" onPress={() => navigate('MyCars')} />
                </HStack>
                
                <HStack mx="4" mt="4" space="4">
                    <MenuIcon title="Certificates" icon="file-text" onPress={() => navigation.navigate('Browser', {url: `${BASE_URL}/certificate/${authContext.customer.id}`, title: "My Certificates"})} />
                    <MenuIcon title="Workshops" icon="settings" onPress={() => navigate('Workshops')} />
                </HStack>
                
                <HStack mx="4" mt="4" space="4">
                    <MenuIcon title="About Us" icon="info" onPress={() => navigation.navigate('Browser', {url: `${BASE_URL}/about`, title: "About Us"})} />
                    <MenuIcon title="Feedback" icon="send" onPress={() => navigate('Feedback')} />
                </HStack>

                <Text color="gray.400" textAlign="center" mt="16">Version: {getVersion()} {Platform.OS}</Text>

            </SafeAreaView>
        </View>
    )
}

export default MoreScreen