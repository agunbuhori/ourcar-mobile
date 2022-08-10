import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import { Box, Button, Icon, ScrollView, Text, View, VStack } from "native-base";
import React, { useContext } from "react";
import { Alert } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import useScheduleService from "../../../../libs/services/schedule.service";
import { AuthContext, RootStackParamList } from "../../../NavigationScreen/NavigationScreen";
import SplashScreen from "../../../NavigationScreen/SplashScreen";

const InfoItem = ({label, value}: {label: string, value?: string}) => (
    <View justifyContent="space-between" flexDir="row" py="2" borderBottomColor="gray.800" borderBottomWidth={1}>
        <Text color="white" textAlign="left" flex="1">{label}</Text>
        <Text color="white" fontWeight="semibold" flex="2" textAlign="right">{value}</Text>
    </View>

)

type ReservationPageProps = StackScreenProps<RootStackParamList, 'Menu'>
const ReservationPage = ({ navigation }: ReservationPageProps) => {
    const scheduleService = useScheduleService()
    const [schedule, setSchedule] = React.useState<Schedule>({} as Schedule)
    const auth = useContext(AuthContext)
    const [fetching, setFetching] = React.useState(true)

    const fetchSchedule = async () => {
        const requestSchedule = await scheduleService.getNearbyMaintenance(auth.customer.active_unit)
        if (requestSchedule) {
            setSchedule(requestSchedule)
            setFetching(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true

            fetchSchedule()

            return () => {
                isActive = false
            }
        }, [])
    )

    if (fetching) {
        return <SplashScreen />
    }

    return (
        <ScrollView>
            <View mx="4">
            <Text color="white" fontSize="2xl" textAlign="center" fontWeight="bold">Maintenance #{schedule.session}</Text>
            <Text color="white" fontSize="xl" textAlign="center">{moment(schedule.reservated_at).format('DD MMM YYYY, HH:mm')}</Text>

            <View mt="4">
                <InfoItem label="Workshop" value={schedule.workshop?.name}/>
                <InfoItem label="Phone" value={schedule.workshop?.phone_number}/>
                <InfoItem label="Email" value={schedule.workshop?.email}/>
                <InfoItem label="Address" value={schedule.workshop?.address}/>
            </View>


            <VStack p="4" bg="gray.900" rounded="xl" space={2} mt="4">
                <Text fontSize="lg" fontWeight="bold" color="white">Maintenance Items</Text>
                {
                    schedule.maintenance_items.map((item) => (
                        <View mt="2" flexDir="row" justifyContent="space-between" alignItems="center" key={item.id}>
                            <Box flexDir="row" alignItems="center">
                                <Icon as={<Feather name="tool" />} color="gray.200" mr="3" />
                                <Text color="white">{item.title}</Text>
                            </Box>

                            {
                                item.pivot.price === 0
                                &&
                                <Box>
                                    <Text color="green.500">FREE</Text>
                                </Box>
                            }
                        </View>
                    ))
                }
            </VStack>

            <Button isDisabled={schedule.reservation_times === 3} colorScheme="amber" _text={{fontWeight: "bold"}} rounded="md" mt="4" onPress={() => navigation.navigate('Reservation', schedule)}>
                Change Reservation
            </Button>
            </View>

        </ScrollView>
    )

}

export default ReservationPage