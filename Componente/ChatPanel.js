import React, { useContext } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import TrabajoContext from "../Context/TrabajoContext"
import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"

const ChatPanel = ({ nombre, imagen, ultimo_mensaje, id, navigation, visto }) => {
    const { usuario } = useContext(UsuarioContext)
    const { settrabajador, setcliente } = useContext(TrabajoContext)

    const Alerta = () => {
        if(visto == false){
            return (
                <View style={{ borderWidth: 2, borderColor: "#767676", paddingHorizontal: 9, paddingVertical: 2, borderRadius: 100, backgroundColor: "black" }}>
                    <Text style={{ color: "white" }} allowFontScaling={false}>
                        !
                    </Text>
                </View>
            )
        }else{
            return (
                <View>

                </View>
            )
        }


    }

    return (
        <View style={{ borderBottomWidth: 3, borderColor: "#767676" }}>
            <TouchableOpacity style={{ flexDirection: "row" }}
                onPress={() => {
                    if (usuario.tipo == "Trabajador") {
                        Firebase.database().ref("usuario/" + id).on("value", (sna) => {
                            setcliente(sna.val())
                            navigation.navigate("Chat_Trabajador")
                        })
                    } else {
                        Firebase.database().ref("usuario/" + id).on("value", (sna) => {
                            settrabajador(sna.val())
                            navigation.navigate("Chat_Trabajador")
                        })
                    }

                }}>
                <Image style={styles.imagen} source={{ uri: imagen }} />
                <View style={{ justifyContent: "center", flex: 2 }}>
                    <Text style={styles.textoC} minimumFontScale={0.1}>
                        {nombre}
                    </Text>
                    <Text style={styles.textoT}>
                        {ultimo_mensaje}
                    </Text>
                </View>

                <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>

                    <Alerta />

                </View>

            </TouchableOpacity>
        </View>
    )
}

export default ChatPanel

const styles = StyleSheet.create({

    texto: {
        color: "white",
        fontSize: 20,

    },
    panel: {
        borderWidth: 3,
        borderColor: "#767676",
        flex: 1,
        marginBottom: 40,
        marginHorizontal: 30,
        borderRadius: 20
    },
    textoT: {
        color: "#C4C4C4",
        fontSize: 15,
        marginTop: 5
    },
    textoC: {
        color: "white",
        fontSize: 15,

    },
    imagen: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 15
    },

})