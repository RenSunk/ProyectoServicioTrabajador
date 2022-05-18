import React, { useEffect, useContext, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native"
import Estrella from "../assets/Estrella.png"

import PanelChatUsuario from "../Componente/PanelChatUsuario"
import PanelChatTrabajador from "../Componente/PanelChatTrabajador"

import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"
import TrabajoContext from "../Context/TrabajoContext"
import DataContext from "../Context/Context"
import { useIsFocused } from '@react-navigation/native';


const ComentariosTrabajador = ({ navigation }) => {
    const { setdata } = useContext(DataContext)
    const isFocused = useIsFocused();
    const { trabajador } = useContext(TrabajoContext)
    const { usuario } = useContext(UsuarioContext)
    const [input, setinput] = useState("")
    const [comentarios, setcomentarios] = useState([])

    let time = new Date()
    useEffect(() => {
        if (isFocused) {
            setdata("Comentarios_Trabajador")
            Firebase.database().ref("comentarios/" + trabajador.id).on("value", (sna) => {
                //console.log(sna.val())
                setcomentarios([sna.val()])
            })
        }
    }, [isFocused])

    const Panel = () =>{
        return(
            comentarios.map((value) => {
                let array = []
                for (let i in value) {
                    array.push([value[i]])
                }
                return array.map((value, i) => {
                    return (
                        <PanelChatUsuario
                            texto={value[0].com}
                            imagen={value[0].imagen}
                            nombre={value[0].nombre}
                            key={i}
                        />
                    )
                })
            })
        )
    }

    return (
        <View style={{ backgroundColor: "#18191A", flex: 1 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: 5 }}>




                <TouchableOpacity onPress={() => {
                    navigation.navigate('Perfil_Trabajador');
                }} style={{ flexDirection: "row", borderColor: "#767676", borderWidth: 2.5, borderRadius: 100, justifyContent: "center", alignItems: "center", marginVertical: 10, paddingHorizontal: 7, paddingVertical: 10 }}>
                    <Text allowFontScaling={false} style={{ color: "white" }}>
                        {trabajador.nombre + " " + trabajador.apellido}
                    </Text>

                </TouchableOpacity>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity style={{ marginHorizontal: 10 }}>
                        <Image style={{ width: 25, height: 25 }} source={Estrella} />
                    </TouchableOpacity>


                    <TouchableOpacity >
                        <Text style={{ color: "red", fontSize: 25 }} allowFontScaling={false}> ! </Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={{ flex: 5, borderWidth: 3, borderColor: "#767676", margin: 15, borderRadius: 15 }}>
                <View >
                    <Panel />
                </View>

            </View>
            <View style={{ flex: 0.8, justifyContent: "center", }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%" }}>

                    <TextInput style={{ width: "80%", borderWidth: 2, borderColor: "#767676", color: "white", padding: 5, borderRadius: 10 }}
                        value={input} onChangeText={(value) => setinput(value)} />

                    <TouchableOpacity style={{ borderWidth: 2, borderColor: "#767676", borderRadius: 10, width: "15%", justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            //let codigo = time.getUTCFullYear() - (time.getMonth() + 1) - time.getDate() - time.getHours() - time.getUTCMinutes() - time.getSeconds()
                            let codigo = -(time.getTime())
                            let json = {
                                id: usuario.id,
                                com: input,
                                imagen: usuario.imagen,
                                nombre: usuario.nombre + " " + usuario.apellido
                            }

                            Firebase.database().ref("comentarios/" + trabajador.id + "/" + codigo).set(json)
                            setinput("")
                        }}>
                        <Text style={{ color: "white" }} allowFontScaling={false}>
                            Enviar
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}

export default ComentariosTrabajador