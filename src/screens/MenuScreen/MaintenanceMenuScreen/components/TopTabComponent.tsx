import { Box, Button, HStack, Text, View } from "native-base";
import React from "react";

type Props = {
    active: "schedule" | "reservation" | "history",
    changeTab?: (tab: string) => void
}

const TopTabComponent = ({active, changeTab}: Props) => {



    return (
        <View>
            <Box p="1" bg="gray.800" rounded="full">
                <HStack space="2">
                    <Button flex="1" rounded="full" p="2" colorScheme={active === "reservation" ? "amber" : "gray"} onPress={() => changeTab && changeTab("reservation")}>
                        <Text fontSize="xs" fontWeight="semibold" color="white">Reservation</Text>
                    </Button>

                    <Button flex="1" rounded="full" p="2" colorScheme={active === "schedule" ? "amber" : "gray"} onPress={() => changeTab && changeTab("schedule")}>
                        <Text fontSize="xs" fontWeight="semibold" color="white">Schedule</Text>
                    </Button>
                    
                    <Button flex="1" rounded="full" p="2" colorScheme={active === "history" ? "amber" : "gray"} onPress={() => changeTab && changeTab("history")}>
                        <Text fontSize="xs" fontWeight="semibold" color="white">History</Text>
                    </Button>


                </HStack>
            </Box>
        </View>
    )
}

export default TopTabComponent