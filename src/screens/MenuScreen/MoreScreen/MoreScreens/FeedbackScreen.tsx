import { Button, FormControl, TextArea, View, VStack } from "native-base";
import React from "react";
import { Alert } from "react-native";
import useEngagementService from "../../../../libs/services/engagement.service";

const FeedbackScreen = () => {
    const engagementService = useEngagementService()
    const [message, setMessage] = React.useState("")
    const [sending, setSending] = React.useState(false)

    const sendFeedback = async () => {
        setSending(true)
        await engagementService.sendFeedback(message)
        setSending(false)
        Alert.alert("Thanks!", "Feedback has been sent")
    }

    return (
        <View bg="black" flex="1">
            <VStack space="4" m="4">
                <FormControl>
                    <FormControl.Label>Message</FormControl.Label>
                    <TextArea color="white" autoCompleteType="off" value={message} placeholder="Your honest feedback is appreciated" onChangeText={text => setMessage(text)}/>
                </FormControl>
                <Button onPress={sendFeedback} isLoading={sending} colorScheme="amber" _text={{fontWeight: "bold"}}>Send Feedback</Button>
            </VStack>
        </View>
    )
}

export default FeedbackScreen