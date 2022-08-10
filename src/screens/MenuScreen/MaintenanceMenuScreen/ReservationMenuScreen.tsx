import { StackScreenProps } from "@react-navigation/stack";
import { View } from "native-base";
import React from "react";
import { useWindowDimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from 'react-native-vector-icons/Feather'
import { RootStackParamList } from "../../NavigationScreen/NavigationScreen";
import TopTabComponent from "./components/TopTabComponent";
import HistoryPage from "./pages/HistoryPage";
import ReservationPage from "./pages/ReservationPage";
import SchedulePage from "./pages/SchedulePage";

type MaintenanceMenuScreenProps = StackScreenProps<RootStackParamList, 'Menu'>
const MaintenanceMenuScreen = (props: MaintenanceMenuScreenProps) => {
    const [tab, setTab] = React.useState<"schedule" | "reservation" | "history">("reservation")

    return (
        <View flex="1" bg="black">
            <SafeAreaView style={{flex: 1}}>

            <View p="4" mx="4">
                <TopTabComponent active={tab} changeTab={newTab => setTab(newTab as any)} />
            </View>
            <View flex="1">
                {tab === "schedule" && <SchedulePage />}
                {tab === "reservation" && <ReservationPage {...props}/>}
                {tab === "history" && <HistoryPage />}
                
            </View>
            </SafeAreaView>
        </View>
    )
}

export default MaintenanceMenuScreen