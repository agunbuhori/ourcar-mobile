import { StackScreenProps } from "@react-navigation/stack";
import { Box, Button, Icon, Image, ScrollView, Text, Toast, View } from "native-base";
import React from "react";
import WebView from "react-native-webview";
import { AuthContext, RootStackParamList } from "../../../NavigationScreen/NavigationScreen";
import { BASE_URL } from '@env'
import moment from "moment";
import Feather from 'react-native-vector-icons/Feather'
import useEngagementService from "../../../../libs/services/engagement.service";
import { Alert } from "react-native";

type ShowEventScreen = StackScreenProps<RootStackParamList, 'ShowEvent'>
const ShowEvent = ({ route: { params }, navigation }: ShowEventScreen) => {
    const engagementService = useEngagementService()
    const authContext = React.useContext(AuthContext)
    const [claimed, setClaimed] = React.useState(authContext.customer.id === params.customer_id)
    
    const claimEvent = async () => {
        await engagementService.claimEvent(params.id)
        if (! claimed) {
            Toast.show({title: "Great!", description: params.type === 'COUPON' ? 'Coupon Claimed' : 'You are interested'})
        } else {
            Toast.show({title: "Thanks!", description: 'We will meet next time'})
        }
        setClaimed(prev => ! prev)
    }


    return (
        <ScrollView flex="1" bg="black">
            <Image source={{ uri: `${BASE_URL}/storage/${params.picture}` }} w="full" style={{ aspectRatio: 3 / 2 }} alt="banner" />
            <View m="4">
                <Text fontSize="2xl" fontWeight="bold" color="white">
                    {params.title}
                </Text>
                <Box flexDir="row" alignItems="center">
                    <Icon as={<Feather name="calendar" />} fontSize="md" color="white" mr="3" />
                    <Text fontSize="md" color="white" fontWeight="semibold">{moment(params.available_at).format('DD, MMM YYYY')}-{moment(params.unavailable_at).format('DD, MMM YYYY')}</Text>
                </Box>

                <Text mt="4" color="white">{params.description}</Text>

                {
                    params.type === "EVENT"
                    ?
                    <Button onPress={claimEvent} colorScheme={claimed ? "red" : "amber"} _text={{fontWeight: "bold"}} mt="4">{claimed ? "Cancel" : "I'm Interesting"}</Button>
                    :
                    <Button onPress={claimEvent} colorScheme={claimed ? "red" : "amber"} _text={{fontWeight: "bold"}} mt="4">{claimed ? "Cancel" : "Claim Coupon"}</Button>
                }

            </View>
        </ScrollView>
    )
}

export default ShowEvent