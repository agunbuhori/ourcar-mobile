import React from "react";
import { Box, Button, Image, ScrollView, StatusBar, Text, View } from "native-base";
import MeterComponent from "./components/MeterComponent";
import { Dimensions } from "react-native";
import MaintenanceComponent from "./components/MaintenanceComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageBG from "../../../components/ImageBG";
import { AuthContext, RootStackParamList } from "../../NavigationScreen/NavigationScreen";
import useUnitService from "../../../libs/services/unit.service";
import SplashScreen from "../../NavigationScreen/SplashScreen";
import useScheduleService from "../../../libs/services/schedule.service";
import { StackScreenProps } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import {BASE_URL} from '@env'
import InputKilometerComponent from "./components/InputKilometerComponent";

type HomeMenuScreenProps = StackScreenProps<RootStackParamList, 'Menu'>

const HomeMenuScreen = (props: HomeMenuScreenProps) => {
    const user = React.useContext(AuthContext)
    const unitService = useUnitService()
    const scheduleService = useScheduleService()
    const [unit, setUnit] = React.useState<Unit>({} as Unit)
    const [schedule, setSchedule] = React.useState<Schedule>({} as Schedule)
    const [fetching, setFetching] = React.useState(true)

    const getUnit = async () => {
        const requestUnit = await unitService.getUnit(user.customer.active_unit)

        if (requestUnit) {
            setUnit(requestUnit)
        }
    }

    const getNearbyMaintenance = async () => {
        const requestNearbyMaintenance = await scheduleService.getNearbyMaintenance(user.customer.active_unit)

        if (requestNearbyMaintenance) {
            setSchedule(requestNearbyMaintenance)
            setFetching(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            
            if (user.customer?.active_unit)
            getNearbyMaintenance()

            return () => {
                isActive = false
            }
        }, [])
    )

    React.useEffect(() => {
        if (user.customer?.active_unit) {
            getUnit()
        }
    }, [user.customer])

    if (fetching) {
        return <SplashScreen/>
    }

    return (
        <ScrollView bg="black">
            <StatusBar barStyle="light-content" />
            <ImageBG />
            
            <SafeAreaView>
                <View mx="4" mt="6">
                    <Box flexDir="row" alignItems="center">
                        <Image width="8" height="8" source={require('../../../resources/image/user.png')} alt="user" mr="3"/>
                        <Text color="white" fontSize="sm" fontWeight="bold">{user.customer.name}</Text>
                    </Box>
                </View>

                <View mx="4" mt="6">
                    <Box justifyContent="center" alignItems="center">
                        <Image source={{uri: `${BASE_URL}/storage/${unit.vehicle?.picture}`}} width={Dimensions.get('window').width - 100} height={180} alt="logo" />
                        <Text color="white" fontSize="md" fontWeight="bold">{unit.vehicle?.manufacture.name + ' '+ unit.vehicle?.brand + ' ' + unit.vehicle?.type}</Text>
                        <Text color="amber.500" fontSize="md" fontWeight="bold">{unit.police_number}</Text>
                        <Button py="1" px="3" rounded="full" variant="outline" colorScheme="amber" mt="2" onPress={() => props.navigation.navigate('Overview', unit)}>Overview</Button>
                    </Box>
                </View>

                <View mx="4" mt="6">
                    <MeterComponent realKilometer={unit.real_kilometer ?? 1} predictedKilometer={unit.predicted_kilometer ?? 1}  />
                </View>

                <View mx="4" my="6">
                    <MaintenanceComponent schedule={schedule} {...props} />
                </View>
            </SafeAreaView>

            <InputKilometerComponent value={unit.real_kilometer}/>
        </ScrollView>
    )
}

export default HomeMenuScreen