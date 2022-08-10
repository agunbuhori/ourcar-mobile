import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import { Box, Button, Image, ScrollView, Text, View } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuthService from "../../../../libs/services/auth.service";
import { AuthContext, RootStackParamList } from "../../../NavigationScreen/NavigationScreen";

const ProfileItem = ({label, value}: {label: string, value: string}) => (
    <View justifyContent="space-between" flexDir="row" py="2" borderBottomColor="gray.800" borderBottomWidth={1}>
        <Text color="white" textAlign="left" flex="1">{label}</Text>
        <Text color="white" fontWeight="semibold" flex="2" textAlign="right">{value}</Text>
    </View>
)

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
    const authContext = React.useContext(AuthContext)
    const {customer} = authContext
    const authService = useAuthService()
    const dispatch = useDispatch()
    const [destroying, setDestroying] = React.useState(false)

    const signOut = async () => {
        setDestroying(true)
        dispatch({type: 'LOGOUT'})
        await authService.signOut()
        setDestroying(false)
    }

    return (
        <View flex="1" bg="black">
            <ScrollView>
            <View m="4">
                <Box justifyContent="center" alignItems="center">
                    <Image source={require("../../../../resources/image/user.png")} width={20} alt="profile" height={20} mb="4"/>
                    <Text fontSize="lg" color="white" fontWeight="bold">{customer.name}</Text>
                    <Button onPress={() => navigation.navigate('EditProfile')} py="1" px="3" rounded="full" variant="outline" _text={{color: 'white'}} mt="2">Edit My Profile</Button>
                </Box>
                <View mt="4">
                    <ProfileItem label="Family Name" value={customer.family_name}/>
                    <ProfileItem label="Gender" value={customer.gender === 'm' ? 'Male' : customer.gender === 'f' ? 'Female' : '-'}/>
                    <ProfileItem label="Date of Birth" value={moment(customer.birthdate).format('DD MMM YYYY')}/>
                    <ProfileItem label="Email" value={authContext.email}/>
                    <ProfileItem label="Phone Number" value={customer.phone_number}/>
                    <ProfileItem label="Address" value={customer.address}/>

                    <Button isLoading={destroying} colorScheme="red" mt="6" onPress={signOut}>Sign Out</Button>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}

export default ProfileScreen