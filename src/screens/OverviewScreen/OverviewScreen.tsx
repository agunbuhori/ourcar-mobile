import React from "react";
import { Box, Image, ScrollView, Text, View, VStack } from "native-base";
import ImageBG from "../../components/ImageBG";
import { Animated, Dimensions } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../NavigationScreen/NavigationScreen";
import * as Progress from 'react-native-progress';
import useUnitService from "../../libs/services/unit.service";
import SplashScreen from "../NavigationScreen/SplashScreen";
import { Easing } from "react-native-reanimated";
import {BASE_URL} from '@env'

type OverviewScreenProps = StackScreenProps<RootStackParamList, 'Overview'>
const OverviewScreen = ({ route: {params} }: OverviewScreenProps) => {
    const [fetching, setFetching] = React.useState(true)
    const [animated, setAnimated] = React.useState(new Animated.Value(0))
    const [maintenanceItems, setMaintenanceItems] = React.useState<MaintenanceItem[]>([])
    const unitService = useUnitService()

    const fetchProgress = async () => {
        const progress = await unitService.getProgress(params.id)
        if (progress) {
            setMaintenanceItems(progress)
            setFetching(false)
            Animated.timing(animated, {
                duration: 1000,
                useNativeDriver: false,
                toValue: 1,
                easing: Easing.ease
            }).start()
        }
    }

    React.useEffect(() => {
        fetchProgress()
    }, [])

    const totalProgress = Dimensions.get('window').width-35

    return (
        <ScrollView flex="1" bg="black">
            <Box justifyContent="center" alignItems="center" pt="16">
            <ImageBG/>
                <Image source={{uri: `${BASE_URL}/storage/${params.vehicle.picture}`}} width={Dimensions.get('window').width - 150} height={150} alt="logo" />
                <Text color="white" fontSize="md" fontWeight="bold">{params.vehicle?.manufacture.name + ' '+ params.vehicle?.brand + ' ' + params.vehicle?.type}</Text>
                <Text color="amber.500" fontSize="md" fontWeight="bold">{params.police_number}</Text>
            </Box>

            <VStack space="4" m="4" mb="10">
                {
                    maintenanceItems.map((item, index) => (
                    <Box key={item.id}>
                        <Text fontWeight="bold" color="white" mb="2">{item.title}</Text>
                        <Box w="full" h={3} borderColor="amber.500" borderWidth={1} rounded="full">
                            <Animated.View style={{
                                height: '100%',
                                backgroundColor: 'orange',
                                width: animated.interpolate({inputRange: [0, 1], outputRange: [0, item.progress.finished/item.progress.total*totalProgress]}),
                                borderRadius: 10,
                            }}></Animated.View>
                        </Box>
                    </Box>

                    ))
                }
                {fetching && <SplashScreen/>}

                
            </VStack>
        </ScrollView>
    )
}

export default OverviewScreen