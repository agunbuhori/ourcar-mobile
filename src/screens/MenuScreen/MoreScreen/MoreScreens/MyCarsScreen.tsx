import React from "react";
import moment from "moment";
import { Button, FlatList, HStack, Text, View } from "native-base";
import useUnitService from "../../../../libs/services/unit.service";
import { AuthContext, RootStackParamList } from "../../../NavigationScreen/NavigationScreen";
import SplashScreen from "../../../NavigationScreen/SplashScreen";
import { StackScreenProps } from "@react-navigation/stack";


const InfoItem = ({label, value}: {label: string, value: string}) => (
    <View justifyContent="space-between" flexDir="row" py="2" borderBottomColor="gray.800" borderBottomWidth={1}>
        <Text color="white" textAlign="left" flex="1">{label}</Text>
        <Text color="white" fontWeight="semibold" flex="1" textAlign="right">{value}</Text>
    </View>
)

type MyCarsScreenProps = StackScreenProps<RootStackParamList, 'MyCars'>
const MyCarsScreen = ({ navigation }: MyCarsScreenProps) => {
    const [units, setUnits] = React.useState<Unit[]>([])
    const unitService = useUnitService()
    const authContext = React.useContext(AuthContext)
    const [fetching, setFetching] = React.useState(true)
    const [switching, setSwitching] = React.useState(false)
    const fetchUnits = async () => {
        const requestUnits = await unitService.getUnits()

        if (requestUnits) {
            setUnits(requestUnits)
            setFetching(false)
        }
    }

    const changeDefaultUnit = async (id: number) => {
        setSwitching(true)
        await unitService.changeActiveUnit(id)
        await authContext.updateUser()
        setSwitching(false)
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
                data={units}
                renderItem={({item}) => (
                    <View p="4" bg="gray.900" rounded="xl" mt="4" mx="4">
                        <Text color="white" fontSize="xl" fontWeight="bold">{item.vehicle.manufacture.name + ' ' + item.vehicle.brand}</Text>
                        <Text color="white" fontSize="md">{item.police_number}</Text>

                        <View mt="4">
                            <InfoItem label="Type" value={item.vehicle.type}/>
                            <InfoItem label="Condition" value={item.condition}/>
                            <InfoItem label="Year" value={item.vehicle.year}/>
                            <InfoItem label="Date of Buy" value={moment(item.date_of_buy).format('DD MMMM YYYY')}/>
                            <InfoItem label="Chassis Number" value={item.chassis_number}/>
                            <InfoItem label="Color" value={item.color}/>
                            <InfoItem label="Kilometer" value={item.real_kilometer+"/"+item.predicted_kilometer}/>
                        </View>

                        <HStack space="2" flexDir="row" mt="4">
                            <Button onPress={() => navigation.navigate('Overview', item)} colorScheme="amber" px="3" py="1" rounded="full" _text={{fontWeight: 'semibold'}}>Overview</Button>
                            {
                                authContext.customer.active_unit !== item.id
                                &&
                                <Button isLoading={switching} onPress={() => changeDefaultUnit(item.id)} colorScheme="amber" px="3" py="1" rounded="full" _text={{fontWeight: 'semibold'}}>Set As Default</Button>
                            }
                        </HStack>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default MyCarsScreen