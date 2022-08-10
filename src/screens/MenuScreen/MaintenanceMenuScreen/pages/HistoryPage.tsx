import React from 'react';
import moment from 'moment';
import { Box, Icon, ScrollView, Text, View, VStack } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import useScheduleService from '../../../../libs/services/schedule.service';
import { AuthContext } from '../../../NavigationScreen/NavigationScreen';
import Feather from 'react-native-vector-icons/Feather'
import SplashScreen from '../../../NavigationScreen/SplashScreen';

const HistoryPage = () => {
    const layout = useWindowDimensions();
    const [isReady, setIsReady] = React.useState(false)
    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = React.useState<{ key: string, title: string }[]>([]);
    const [scenes, setScenes] = React.useState<any>({})
    const scheduleService = useScheduleService()
    const auth = React.useContext(AuthContext)

    const fetchSchedules = async () => {
        const requestSchedules = await scheduleService.getHistory(auth.customer.active_unit)

        if (requestSchedules) {
            const years = requestSchedules.map((item) => {
                return moment(item.reservation_available_at).format('YYYY')
            }).filter((item, index, arr) => arr.indexOf(item) === index)

            const tempRoutes = years.map(year => ({ key: year, title: year }))
            const tempScenes = {} as any

            years.forEach(year => {
                const schedulesThisYear = requestSchedules.filter((item) => moment(item.reservation_available_at).format('YYYY') === year)
                const FirstRoute = () => (
                    <ScrollView mt="4" key={year}>
                        <VStack space={4} mx="4">
                            {schedulesThisYear.map((item) => (
                                <View p="4" rounded="2xl" bg="gray.900" key={item.id}>
                                    <View flexDir="row" justifyContent="space-between" mb="2">
                                        <Text color="white" fontSize="md" fontWeight="bold">Maintenance #{item.session} </Text>
                                        <Text color="amber.500" fontSize="md" fontWeight="bold">{moment(item.finished_at).format('DD MMM YYYY, HH:mm')}</Text>
                                    </View>

                                    {
                                        item.maintenance_items.map((item) => (
                                            <View mt="2" flexDir="row" justifyContent="space-between" alignItems="center" key={item.id}>
                                                <Box flexDir="row" alignItems="center">
                                                    <Icon as={<Feather name="check-circle" />} color="gray.200" mr="3" />
                                                    <Text color="white">{item.title}</Text>
                                                </Box>
                                            </View>
                                        ))
                                    }
                                </View>
                            ))}
                        </VStack>
                    </ScrollView>
                )

                tempScenes[year] = FirstRoute
            })

            setRoutes(tempRoutes)
            setScenes(tempScenes)
            setIsReady(true)
        }
    }

    React.useEffect(() => {
        fetchSchedules()
    }, [])

    const renderScene = SceneMap(scenes);

    if (!isReady) {
        return <SplashScreen />
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    scrollEnabled
                    indicatorStyle={{
                        backgroundColor: "orange"
                    }}
                    style={{ backgroundColor: "black" }} />
            )}
        />
    );
}

export default HistoryPage