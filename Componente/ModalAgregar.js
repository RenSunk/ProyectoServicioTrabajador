import { View, Modal, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native"

const ModalAgregar = ({
  visible=false,
  setvisible=function(){},
  handleChangeText = function(){},
  enviar = function(){}
}) =>{
  return (
    <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ width: 200 }}>
              <View style={{ padding: 10 }}>
                <Text style={styles.textos}>Servicio a solicitar</Text>
                <TextInput
                  style={{
                    borderBottomColor: "#767676",
                    borderBottomWidth: 2,
                    color: "white",
                  }}
                  keyboardType={"default"}
                  onChangeText={(value) => handleChangeText("trabajo", value)}
                />
              </View>

              <View style={{ padding: 10 }}>
                <Text style={styles.textos}>Describa el servicio</Text>
                <TextInput
                  style={{
                    borderBottomColor: "#767676",
                    borderBottomWidth: 2,
                    color: "white",
                  }}
                  onChangeText={(value) =>
                    handleChangeText("descripcion", value)
                  }
                  keyboardType={"default"}
                />
              </View>

              <TouchableOpacity
                onPress={() => enviar()}
                style={{
                  borderWidth: 2,
                  borderColor: "#767676",
                  borderRadius: 5,
                  padding: 10,
                  margin: 10,
                }}
              >
                <Text style={styles.textos}>Enviar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setvisible(false)}
                style={{
                  borderWidth: 2,
                  borderColor: "#767676",
                  borderRadius: 5,
                  padding: 10,
                  margin: 10,
                }}
              >
                <Text style={styles.textos}>Salir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#18191A",
  },
  textos: {
    color: "#fff",
    textAlign: "center",
  },
  panel: {
    borderColor: "#767676",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  boton: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginTop:20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(24,25,26,0.55)",
    flexDirection: "row",
  },
  modalView: {
    backgroundColor: "#18191A",
    borderRadius: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: "#767676",
  },

  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
export default ModalAgregar