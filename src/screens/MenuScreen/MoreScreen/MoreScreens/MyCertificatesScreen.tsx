import moment from "moment";
import { Box, Button, FlatList, HStack, Text, View } from "native-base";
import React from "react";
import useUnitService from "../../../../libs/services/unit.service";
import { AuthContext } from "../../../NavigationScreen/NavigationScreen";
import SplashScreen from "../../../NavigationScreen/SplashScreen";


const InfoItem = ({label, value}: {label: string, value: string}) => (
    <View justifyContent="space-between" flexDir="row" py="2" borderBottomColor="gray.800" borderBottomWidth={1}>
        <Text color="white" textAlign="left" flex="1">{label}</Text>
        <Text color="white" fontWeight="semibold" flex="1" textAlign="right">{value}</Text>
    </View>
)

const MyCarsScreen = () => {
    const [units, setUnits] = React.useState<Unit[]>([])
    const unitService = useUnitService()
    const authContext = React.useContext(AuthContext)
    const [fetching, setFetching] = React.useState(true)
    const fetchUnits = async () => {
        const requestUnits = await unitService.getUnits()

        if (requestUnits) {
            setUnits(requestUnits)
            setFetching(false)
        }
    }

    React.useEffect(() => {
        fetchUnits()
    }, [])

    if (fetching) {
        return <SplashScreen/>
    }


    return (
        <View flex="1" bg="black">
            <FlatList
                m="6"
                data={units}
                renderItem={({item}) => (
                    <View p="4" bg="gray.900" rounded="xl" mb="4">
                       
                    </View>
                )}
                keyExtractor={(item, index) => item.id.toString()}
            />
        </View>
    )
}

export default MyCarsScreen