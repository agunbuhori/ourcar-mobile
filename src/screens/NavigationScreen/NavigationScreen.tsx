import React from "react";
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import MenuScreen from "../MenuScreen/MenuScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import SplashScreen from "./SplashScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import useAuthService from "../../libs/services/auth.service";
import NoUnitScreen from "../NoUnitScreen/NoUnitScreen";
import ReservationScreen from "../ReservationScreen/ReservationScreen";
import ProfileScreen from "../MenuScreen/MoreScreen/MoreScreens/ProfileScreen";
import EditProfileScreen from "../MenuScreen/MoreScreen/MoreScreens/EditProfileScreen";
import MyCarsScreen from "../MenuScreen/MoreScreen/MoreScreens/MyCarsScreen";
import { StatusBar } from "native-base";
import WorkshopsScreen from "../MenuScreen/MoreScreen/MoreScreens/WorkshopsScreen";
import FeedbackScreen from "../MenuScreen/MoreScreen/MoreScreens/FeedbackScreen";
import OverviewScreen from "../OverviewScreen/OverviewScreen";
import EventsScreen from "../MenuScreen/MoreScreen/MoreScreens/EventsScreen";
import BrowserScreen from "../BrowserScreen/BrowserScreen";
import ShowEvent from "../MenuScreen/MoreScreen/MoreScreens/ShowEvent";

export type RootStackParamList = {
    Login: undefined
    Reservation: Schedule
    NoUnit: undefined
    Menu: undefined
    MyCars: undefined
    Profile: undefined
    EditProfile: undefined
    Workshops: undefined
    Feedback: undefined
    Overview: Unit
    Browser: {url: string, title: string}
    Events: undefined
    ShowEvent: Event
}

const Stack = createStackNavigator<RootStackParamList>()



const options: StackNavigationOptions = {
    headerShown: false,
    headerTintColor: 'white',
    headerStyle: {backgroundColor: 'black'},
    headerTitleStyle: {color: 'orange'},
    headerMode: "screen",
    cardStyle: {
        backgroundColor: "#000"
    },
    animationEnabled: true,
}

export const AuthContext = React.createContext<User & {updateUser: () => Promise<void>}>({} as User & {updateUser: () => Promise<void>})

const NavigationScreen = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const auth = useSelector((state: RootState) => state.AuthReducer)
    const [authenticated, setAuthenticated] = React.useState(false)
    const [user, setUser] = React.useState<User>({} as User)
    const authService = useAuthService()

    const fetchUser = async () => {
        const user = await authService.user()
        if (typeof user !== 'boolean') {
            setAuthenticated(true)
            setUser(user)
        } else {
            setAuthenticated(false)
        }
        setIsLoading(false)
    }

    const updateUser = async () => {
        await fetchUser()
    }

    React.useEffect(() => {
        if (auth.isAuthenticated) {
            setIsLoading(true)
            fetchUser()
        } else {
            setIsLoading(false)
        }
    }, [auth])

    if (isLoading) {
        return <SplashScreen />
    }

    const getProperScreen = () => {
        if (!authenticated) return 'Login'

        if (user.customer.units_count) {
            return 'Menu'
        } else {
            return 'NoUnit'
        }
    }

    return (
        <AuthContext.Provider value={{...user, updateUser}}>
            <NavigationContainer theme={DarkTheme}>
                <StatusBar backgroundColor="#000000"/>
                <Stack.Navigator initialRouteName={getProperScreen()} screenOptions={options}>
                    {
                        auth.isAuthenticated
                            ?
                            <>
                                <Stack.Screen name="Menu" component={MenuScreen} />
                                <Stack.Screen name="Profile" component={ProfileScreen} options={{
                                    headerShown: true
                                }} />
                                
                                <Stack.Screen name="Workshops" component={WorkshopsScreen} options={{
                                    headerShown: true
                                }} />
                                
                                
                                <Stack.Screen name="MyCars" component={MyCarsScreen} options={{
                                    headerShown: true, 
                                    title: "My Cars"
                                }} />

                                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
                                    headerShown: true, 
                                    title: "Edit Profile",
                                }} />
                                
                                <Stack.Screen name="Events" component={EventsScreen} options={{
                                    headerShown: true
                                }} />
                                
                                <Stack.Screen name="Browser" component={BrowserScreen} options={{
                                    headerShown: true
                                }} />
                                
                                <Stack.Screen name="ShowEvent" component={ShowEvent} options={{
                                    headerShown: true,
                                    title: 'Event Detail'
                                }} />
                                <Stack.Screen name="Feedback" component={FeedbackScreen} options={{
                                    headerShown: true
                                }} />
                                
                                <Stack.Screen name="Overview" component={OverviewScreen} options={{
                                    headerShown: true
                                }} />

                                <Stack.Screen name="NoUnit" component={NoUnitScreen} />
                                <Stack.Screen name="Reservation" component={ReservationScreen} options={{
                                    headerShown: true,
                                }} 
                                />
                            </>
                            :
                            <>
                                <Stack.Screen name="Login" component={LoginScreen} />
                            </>

                    }
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default NavigationScreen