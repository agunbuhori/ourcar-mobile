import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "native-base";
import React from "react";
import HomeMenuScreen from "./HomeMenuScreen/HomeMenuScreen";
import Feather from "react-native-vector-icons/Feather"
import messaging from "@react-native-firebase/messaging"
import MaintenanceMenuScreen from "./MaintenanceMenuScreen/ReservationMenuScreen";
import MoreScreen from "./MoreScreen/MoreScreen";

const Tab = createBottomTabNavigator()

const MenuScreen = () => {

    React.useEffect(() => {
        messaging().getToken().then((token) => {
            console.log(token)
        })
    }, [])

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'black',
                borderColor: 'black'
            },
            tabBarActiveTintColor: "orange",
            tabBarIcon: (props) => {
                let icon

                switch (route.name) {
                    case "Home":
                        icon = "home" 
                        break;
                    case "Maintenance":
                        icon = "tool"
                        break
                    default:
                        icon = "menu";
                        break;
                }

                return <Icon as={<Feather name={icon}/>} color={props.focused ? 'amber.600' : 'gray.400'} size="xl"/>
            }
        })}>
            <Tab.Screen name="Home" component={HomeMenuScreen}/>
            <Tab.Screen name="Maintenance" component={MaintenanceMenuScreen}/>
            <Tab.Screen name="More" component={MoreScreen}/>
        </Tab.Navigator>
    )
}

export default MenuScreen