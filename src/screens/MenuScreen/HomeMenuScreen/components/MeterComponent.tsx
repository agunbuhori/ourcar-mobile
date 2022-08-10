import React from "react";
import { HStack, View } from "native-base";
import CircularProgress from 'react-native-circular-progress-indicator';


const Kilometer = ({value, subtitle}: {value: number, subtitle: string}) => (
    <CircularProgress
        value={value}
        progressValueStyle={{fontSize: 16}}
        maxValue={100000}
        valueSuffix="Km"
        valueSuffixStyle={{fontSize: 12}}
        radius={60}
        progressValueColor={'#ecf0f1'}
        activeStrokeColor={'#f39c12'}
        inActiveStrokeColor={'gray'}
        inActiveStrokeOpacity={0.5}
        inActiveStrokeWidth={20}
        duration={3000}
        activeStrokeWidth={10}
        subtitle={subtitle}
        subtitleStyle={{fontWeight: 'bold'}}
    />
)

type MeterComponentProps = {
    realKilometer: number
    predictedKilometer: number
}
const MeterComponent = ({ realKilometer, predictedKilometer }: MeterComponentProps) => {

    return (
        <View justifyContent="center" alignItems="center">
            <HStack space={4}>
                <Kilometer value={realKilometer} subtitle="Real"/>
                <Kilometer value={predictedKilometer} subtitle="Predicted"/>
            </HStack>

        </View>
    )
}

export default MeterComponent