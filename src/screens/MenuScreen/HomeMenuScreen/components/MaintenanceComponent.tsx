import React from "react";
import { Box, Button, Icon, Text, View } from "native-base";
import Feather from 'react-native-vector-icons/Feather'
import moment from "moment";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../NavigationScreen/NavigationScreen";

type MaintenanceComponentProps = {
    schedule: Schedule
}

type Props = StackScreenProps<RootStackParamList, 'Menu'> & MaintenanceComponentProps
const MaintenanceComponent = ({schedule, navigation}: Props) => {

    return (
        <View p="6" rounded="2xl" bg="gray.900">
            <View flexDir="row" justifyContent="space-between">
                <Text color="white" fontSize="md" fontWeight="bold">Maintenance : </Text>
                <Text color="white" fontSize="md" fontWeight="bold">{moment(schedule.reservated_at).format('DD MMM YYYY, HH:mm')}</Text>
            </View>

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

            <Button isDisabled={schedule.reservation_times === 3} mt="4" colorScheme="amber" rounded="lg" onPress={() => navigation.navigate('Reservation', schedule)}>
                <Text fontWeight="bold" color="white">Reservation</Text>
            </Button>
        </View>
    )
}

export default MaintenanceComponent