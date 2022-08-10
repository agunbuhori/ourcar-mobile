import { View, Text, Input, Button } from "native-base";
import React from "react";
import { Platform, TextInput } from "react-native";
import Modal from "react-native-modal";
import useUnitService from "../../../../libs/services/unit.service";
import { AuthContext } from "../../../NavigationScreen/NavigationScreen";

function InputKilometerComponent({value, unitId}: {value: number, unitId: number}) {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [km, setKm] = React.useState()
  const [saving, setSaving] = React.useState(false)
  const unitService = useUnitService()
  const authContext = React.useContext(AuthContext)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function save() {
    if (!km || km < value)return false
    setSaving(true)
    await unitService.saveKM(unitId, km)
    setSaving(false)
    setModalVisible(false)
    authContext.updateUser()
  }

  React.useEffect(() => {
    setTimeout(() => {
        setModalVisible(true)
    }, 1000);
  }, [])

  return (
      <Modal isVisible={isModalVisible} useNativeDriver={Platform.OS === 'android'} onBackdropPress={() => setModalVisible(prev => !prev)}>
        <View style={{ flex: 1 }} justifyContent="center">
          <View bg="gray.900" p="4" rounded="xl">
                <Text fontSize="xl" color="white" fontWeight="bold">Please Input Last KM</Text>

                <TextInput placeholder={value ? value.toString() : ''} onChangeText={text=>setKm(parseInt(text))} style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop:20,
                    fontSize: 50,
                    fontFamily: 'Poppins-Semibold',
                    borderRadius: 10,
                    marginTop: 10,
                    textAlign: 'center',
                    // fontFamily: "Poppins-Bold",
                    // lineHeight: 70,
                    overflow: 'hidden',
                    // height: 50,
                    borderWidth: 2,
                    borderColor: 'orange'
                }}/>
                <Button isDisabled={!km || km < value} onPress={save} isLoading={saving} colorScheme="orange" mt="4" _text={{fontWeight: 'bold'}}>Save</Button>
                <Button onPress={() => setModalVisible(false)} variant="outline" borderColor="gray.900" isLoading={saving} colorScheme="gray" mt="4" _text={{fontWeight: 'bold'}}>Close</Button>
          </View>
        </View>
      </Modal>
  );
}

export default InputKilometerComponent;