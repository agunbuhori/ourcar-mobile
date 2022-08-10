import React from "react"
import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import { Box, Button, HStack, Pressable, ScrollView, Text, View } from "native-base"
import { Calendar, LocaleConfig } from 'react-native-calendars';
import useScheduleService from "../../libs/services/schedule.service";
import { RootStackParamList } from "../NavigationScreen/NavigationScreen";
import SplashScreen from "../NavigationScreen/SplashScreen";

type ReservationScreenProps = StackScreenProps<RootStackParamList, 'Reservation'>

LocaleConfig.locales['en'] = {
    monthNames: [
        "January",
        "February",
        "March",
        "April",
        "Mei",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: "Today"
};
LocaleConfig.defaultLocale = 'en';

const ReservationScreen = ({ route, navigation }: ReservationScreenProps) => {
    const [daysOff, setDaysOff] = React.useState({})
    const [reservatedDate, setReservatedDate] = React.useState(route.params.reservated_at)
    const [time, setTime] = React.useState(moment(route.params.reservated_at).format("HH:mm"))
    const [selectedDate, setSelectedDate] = React.useState("")
    const [workshops, setWorkshops] = React.useState<Workshop[]>([])
    const scheduleService = useScheduleService()
    const [loadWorkshops, setLoadWorkshops] = React.useState(true)
    const [workshopId, setWorkshopId] = React.useState<number|null>()
    const [reservating, setReservating] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const getDaysOff = async (date: string) => {
        const yyyy = moment(date).format('YYYY')
        const mm = moment(date).format('MM')
        const requestDaysOff = await scheduleService.getDaysOff(yyyy, mm)
        const marked: any = { ...daysOff }

        requestDaysOff?.forEach((item: string) => {
            marked[item] = { disabled: true }
        })

        setDaysOff(marked)
    }

    const selectDay = (date: string) => {
        const temp: any = { ...daysOff }
        const daysOffKeys = Object.keys(temp)

        daysOffKeys.forEach((item) => {
            if (temp[item].selected) {
                delete temp[item]
            }
        })

        if (daysOffKeys.indexOf(date) !== -1) {
            return false
        }

        temp[moment(date).format('YYYY-MM-DD')] = { selected: true }

        setDaysOff(temp)
        setReservatedDate(date)
    }

    const getWorkshops = async (dateTime: string) => {
        setLoadWorkshops(true)
        const workshopRequest = await scheduleService.getWorkshops(dateTime)

        if (workshopRequest) {
            setWorkshops(workshopRequest)
            setLoadWorkshops(false)
        }
    }

    const reservate = async () => {
        if (workshopId) {
            setReservating(true)
            await scheduleService.reservate(
                route.params.id, 
                selectedDate,
                workshopId
            )
            setReservating(false)
            navigation.goBack()
        }
    }

    React.useEffect(() => {
        if (selectedDate) {
            getWorkshops(selectedDate)
        }
    }, [selectedDate])

    React.useEffect(() => {
        setWorkshopId(null)
        setSelectedDate(moment(reservatedDate).format('YYYY-MM-DD') + ' ' +time + ':00')
    }, [time])

    React.useEffect(() => {
        selectDay(moment(route.params.reservated_at).format('YYYY-MM-DD'))
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    if (loading) {

        return <SplashScreen/>
    }

    return (
        <View bg="black" flex="1">
            <ScrollView>
                <Calendar
                    theme={{
                        backgroundColor: '#000',
                        calendarBackground: '#000',
                        textDayFontWeight: 'bold',
                        todayTextColor: "orange",
                        textDisabledColor: "#555",
                        monthTextColor: "orange",
                        textDayHeaderFontWeight: "bold",
                        dayTextColor: "#2980b9",
                        textInactiveColor: "#ccc",
                        textMonthFontSize: 20,
                        textMonthFontWeight: "bold",
                        selectedDayBackgroundColor: "orange",
                        selectedDayTextColor: "white",
                        textDayFontFamily: "Poppins-Regular",
                        textMonthFontFamily: "Poppins-Regular",
                        todayButtonFontFamily: "Poppins-Regular",
                        textDayHeaderFontFamily: "Poppins-Regular"
                    }}
                    initialDate={moment(reservatedDate).format('YYYY-MM-DD')}
                    minDate={moment(route.params.reservation_available_at).format('YYYY-MM-DD')}
                    maxDate={moment(route.params.reservation_unavailable_at).format('YYYY-MM-DD')}
                    monthFormat={'MMMM yyyy'}
                    onMonthChange={month => {
                        getDaysOff(month.dateString)
                    }}
                    onDayPress={day => {
                        selectDay(day.dateString)
                    }}
                    markedDates={daysOff}
                    showWeekNumbers={false}
                    enableSwipeMonths={true}
                />

                <Box mx="6" mt="6">
                    <Text fontWeight="bold" fontSize="xl" color="white" mb="4">Select time</Text>
                    {
                        ['09', '10', '11', '12', '13', '14', '15', '16', '17'].map((hour) => (
                            <HStack space={4} w="full" key={hour} mb="4">
                                <Button
                                    flex={1}
                                    _text={{ color: time === hour + ":00" ? "orange" : "white", fontWeight: "semibold" }}

                                    backgroundColor={time === hour + ':00' ? 'amber.500' : 'gray.900'}
                                    onPress={() => setTime(hour + ':00')}
                                >
                                    {hour.concat(':00')}
                                </Button>
                                <Button
                                    flex={1}
                                    _text={{ color: time === hour + ":30" ? "orange" : "white", fontWeight: "semibold" }}
                                    backgroundColor={time === hour + ':30' ? 'amber.500' : 'gray.900'}
                                    onPress={() => setTime(hour + ':30')}
                                >
                                    {hour.concat(':30')}
                                </Button>
                            </HStack>
                        ))
                    }
                </Box>

                <Box mx="6" mt="6">
                    <Text fontWeight="bold" fontSize="xl" color="white" mb="4">Select workshop</Text>
                    {
                        loadWorkshops 
                        ? <SplashScreen/>
                        :
                        workshops.map((workshop) => (
                            <Pressable borderWidth={2} mb="4" borderColor={workshopId === workshop.id ? 'amber.400' : 'gray.900'} p="4" rounded="md" bg="gray.900" key={workshop.id} onPress={() => setWorkshopId(workshop.id)}>
                                <Text fontWeight="bold" fontSize="md" color="white">{workshop.name}</Text>
                                <Text fontSize="md" color="white">{workshop.address}</Text>
                            </Pressable>
                        ))
                    }
                </Box>

                <Button isLoading={reservating} isDisabled={! workshopId || ! time} m="6" mb="12" colorScheme="amber" _text={{fontWeight: "bold"}} onPress={reservate}>
                    Reservation
                </Button>
            </ScrollView>
        </View>
    )
}

export default ReservationScreen