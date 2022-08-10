import { Box, Button, FlatList, FormControl, Icon, Image, Pressable, Text, TextArea, View, VStack } from "native-base";
import React from "react";
import { Alert, RefreshControl } from "react-native";
import { BASE_URL } from '@env'
import Feather from 'react-native-vector-icons/Feather'

import useEngagementService from "../../../../libs/services/engagement.service";
import SplashScreen from "../../../NavigationScreen/SplashScreen";
import moment from "moment";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../NavigationScreen/NavigationScreen";
import { useFocusEffect } from "@react-navigation/native";

type EventsScreenProps = StackScreenProps<RootStackParamList, 'Events'>
const EventsScreen = ({navigation}: EventsScreenProps) => {
    const engagementService = useEngagementService()
    const [message, setMessage] = React.useState("")
    const [events, setEvents] = React.useState<Event[]>([])
    const [fetching, setFetching] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)

    const fetchEvents = async () => {
        setRefreshing(true)
        const requestEvents = await engagementService.fetchEvents()
        if (requestEvents) {
            setEvents(requestEvents)
            setRefreshing(false)
            setFetching(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true
            
            fetchEvents()

            return () => {
                isActive = false
            }
        }, [])
    )


    if (fetching) {
        return <SplashScreen />
    }

    return (
        <View bg="black" flex="1">
            <FlatList
                m="4"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchEvents} tintColor="white" />
                }
                data={events}
                renderItem={({ item }) => (
                    <Pressable bg="gray.900" rounded="xl" overflow="hidden" mb="4" onPress={() => navigation.navigate('ShowEvent', item)}>
                        <Image source={{ uri: `${BASE_URL}/storage/${item.picture}` }} alt={item.title} w="full" h="40" />
                        <View p="4">
                            <Text fontSize="xl" color="white" fontWeight="bold">{item.title}</Text>

                            <Box flexDir="row" alignItems="center">
                                <Icon as={<Feather name="calendar" />} fontSize="md" color="white" mr="3" />
                                <Text fontSize="md" color="white" fontWeight="semibold">{moment(item.available_at).format('DD, MMM YYYY')}-{moment(item.unavailable_at).format('DD, MMM YYYY')}</Text>
                            </Box>

                            <Box flexDir="row" alignItems="center">
                                <Icon as={<Feather name="user" />} fontSize="md" color="white" mr="3" />
                                <Text fontSize="md" color="white" fontWeight="semibold">{item.interested ?? 0} Interested</Text>
                            </Box>


                        </View>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default EventsScreen