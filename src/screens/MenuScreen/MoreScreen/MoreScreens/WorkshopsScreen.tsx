import { FlatList, Image, Text, View } from "native-base";
import React from "react";
import useScheduleService from "../../../../libs/services/schedule.service";
import SplashScreen from "../../../NavigationScreen/SplashScreen";
import {BASE_URL} from '@env'

const WorkshopsScreen = () => {
    const scheduleService = useScheduleService()
    const [fetching, setFetching] = React.useState(true)
    const [workshops, setWorkshops] = React.useState<Workshop[]>([])
   
    const fetchWorkshops = async () => {
        const requestWorkshops = await scheduleService.getWorkshops()

        if (requestWorkshops) {
            setWorkshops(requestWorkshops)
            setFetching(false)
        }
    }

    React.useEffect(() => {
        fetchWorkshops()
    }, [])

    if (fetching) {
        return <SplashScreen/>
    }


    return (
        <View flex="1" bg="black">
            <FlatList
                // m="4"
                data={workshops}
                renderItem={({item}) => (
                    <View bg="gray.900" rounded="xl" mt="4" mx="4" flexDir="row" overflow="hidden">
                        <Image source={{uri: `${BASE_URL}/storage/${item.picture}`}} alt={item.name} width={120} height={120}/>
                        <View p="4" flex="1">
                            <Text color="white" fontSize="lg" fontWeight="bold">{item.name}</Text>
                            <Text color="gray.300" fontSize="2xs">{item.address.substring(0, 40)}</Text>
                            <Text color="gray.300" mt="2" fontWeight="semibold" fontSize="xs">{item.phone_number}</Text>
                            <Text color="gray.300" fontWeight="semibold" fontSize="xs">{item.email}</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => item.id.toString()}
            />
        </View>
    )
}

export default WorkshopsScreen