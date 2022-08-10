import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import { Box, Button, FormControl, Input, ScrollView, Text, TextArea, View, VStack } from "native-base";
import React from "react";
import useAuthService from "../../../../libs/services/auth.service";
import { AuthContext, RootStackParamList } from "../../../NavigationScreen/NavigationScreen";
import DatePicker from 'react-native-date-picker'
import SplashScreen from "../../../NavigationScreen/SplashScreen";

type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>
const EditProfileScreen = ({ navigation, route }: EditProfileScreenProps) => {
    const authContext = React.useContext(AuthContext)
    const [datePicker, setDatePicker] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [updatingProfile, setUpdatingProfile] = React.useState(false)
    const [updatingAccount, setUpdatingAccount] = React.useState(false)
    const { customer } = authContext
    const authService = useAuthService()
    const [profile, setProfile] = React.useState({
        name: customer.name,
        birthdate: moment(customer.birthdate).format('YYYY-MM-DD'),
        address: customer.address,
        family_name: customer.family_name,
        gender: customer.gender
    })
    const [account, setAccount] = React.useState({
        password: "",
        passwordConfirm: ""
    })

    const saveProfile = async () => {
        setUpdatingProfile(true)
        await authService.updateProfile(profile)
        setUpdatingProfile(false)
        authContext.updateUser()
        navigation.goBack()
    }
    
    const saveAccount = async () => {
        setUpdatingAccount(true)
        await authService.updateAccount(account)
        setUpdatingAccount(false)
        navigation.goBack()
    }
    
    const handleProfileChange = (key: string, value: string) => {
        setProfile(prev => ({
            ...prev,
            [key]: value
        }))
    }
    
    const handleAccountChange = (key: string, value: string) => {
        setAccount(prev => ({
            ...prev,
            [key]: value
        }))
    }

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    if (loading) {
        return <SplashScreen/>
    }

    return (
        <ScrollView flex="1" bg="black">
            <VStack space="4" m="4">
                <Text fontWeight="bold" fontSize="lg" color="white">Personal Information</Text>
                <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input value={profile.name} color="white" onChangeText={text => handleProfileChange('name', text)} />
                </FormControl>

                <FormControl>
                    <FormControl.Label>Family Name</FormControl.Label>
                    <Input value={profile.family_name} color="white" onChangeText={text => handleProfileChange('family_name', text)} />
                </FormControl>

                <FormControl>
                    <FormControl.Label>Birthdate</FormControl.Label>
                    <Button variant="outline" borderColor="white" _text={{ color: 'white', textAlign: 'left' }} onPress={() => setDatePicker(true)}>{moment(profile.birthdate).format('DD MMMM YYYY')}</Button>
                    <DatePicker
                        modal
                        open={datePicker}
                        date={new Date(profile.birthdate)}
                        mode="date"
                        onConfirm={(date) => {
                            setDatePicker(false)
                            handleProfileChange('birthdate', moment(date).format('YYYY-MM-DD'))
                        }}
                        onCancel={() => {
                            setDatePicker(false)
                        }}
                    />
                </FormControl>

                {/* <FormControl>
                    <FormControl.Label>Gender</FormControl.Label>
                    <Select color="white" defaultValue={profile.gender} onValueChange={text => handleProfileChange('gender', text)} >
                        <Select.Item label="Male" value="m" />
                        <Select.Item label="Female" value="f" />
                    </Select>
                </FormControl> */}

                <FormControl>
                    <FormControl.Label>Address</FormControl.Label>
                    <TextArea autoCompleteType="no" value={profile.address} color="white" onChangeText={text => handleProfileChange('address', text)} />
                </FormControl>

                <Button isDisabled={! profile.name || ! profile.family_name} isLoading={updatingProfile} colorScheme="orange" _text={{ fontWeight: "bold" }} onPress={saveProfile}>Save Profile</Button>
            </VStack>

            <VStack space="4" m="4">
                <Text fontWeight="bold" fontSize="lg" color="white">Account Information</Text>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input isDisabled value={authContext.email} color="white" />
                </FormControl>
                
                <FormControl>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input isDisabled value={authContext.name} color="white" />
                </FormControl>


                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input color="white" secureTextEntry onChangeText={text => handleAccountChange('password', text)} />
                </FormControl>

                <FormControl>
                    <FormControl.Label>Retype Password</FormControl.Label>
                    <Input color="white" secureTextEntry onChangeText={text => handleAccountChange('passwordConfirm', text)} />
                </FormControl>

                <Button isDisabled={account.password != "" && account.password !== account.passwordConfirm} isLoading={updatingAccount} colorScheme="orange" _text={{ fontWeight: "bold" }} onPress={saveAccount}>Save Account</Button>
            </VStack>
        </ScrollView>
    )
}

export default EditProfileScreen