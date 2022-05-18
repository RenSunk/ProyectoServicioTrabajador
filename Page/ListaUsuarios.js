import React, { useEffect, useContext, useState } from "react"
import { View, StyleSheet, Image, TextInput, TouchableOpacity, Text, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native"

import DataContext from "../Context/Context"

import { useIsFocused } from '@react-navigation/native';

import IconoComputador from "../assets/Icono_Computador_G.png"
import IconoLlave from "../assets/Icono_Llave_G.png"

import IconoSanitario from "../assets/Icono_Sanitario_G.png"
import IconoElectricidad from "../assets/Icono_Electricidad_G.png"

import IconoPintura from "../assets/Icono_Pintura_G.png"
import IconoEscoba from "../assets/Icono_Escoba_G.png"

import tuque from "../assets/tuque.jpg"

import Trabajador from "../Componente/PanelTrabajador"

import TrabajoContext from "../Context/TrabajoContext"
import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"

const ListaUsuarios = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { setdata } = useContext(DataContext)
    const { trabajo } = useContext(TrabajoContext)
    const [datos, setdatos] = useState([])
    const { usuario } = useContext(UsuarioContext)
    let img
    
    switch (trabajo) {
        case "Tecnicos de computadores":
            img = IconoComputador
            break;
        case "Cerrajeros":
            img = IconoLlave
            break;
        case "Plomeros":
            img = IconoSanitario
            break;
        case "Electricistas":
            img = IconoElectricidad
            break;
        case "Pintores":
            img = IconoPintura
            break;
        case "Aseadores":
            img = IconoEscoba
            break;
    }


    useEffect(() => {
        if (isFocused) {
            setdata("ListaUsuario")
            Firebase.database().ref("servicios/"+trabajo).on("value", (sna) => {
                setdatos(sna.val().id.split(","))
            })
            
        }
    }, [isFocused])


    return (
        <View style={{ backgroundColor: "#18191A", flex: 1 }}>

            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>

                <TextInput style={{ flex: 1, borderBottomWidth: 3, borderColor: "#767676", color: "white", padding: 5, margin: 30 }} />

                <TouchableOpacity style={{ borderWidth: 3, borderColor: "#767676", borderRadius: 15, marginRight: 50, paddingVertical: 8, paddingHorizontal: 15 }}>
                    <Text style={{ color: "white", fontSize: 18 }}>
                        Buscar
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{ alignItems: "center" }}>
                <View style={{ alignItems: "center", borderColor: "#767676", borderWidth: 3, borderRadius: 100, width: 110, height: 110, justifyContent: "center", }}>
                    <Image source={img} style={{ width: 60, height: 60 }} />
                </View>
                <Text style={{ color: "white", fontSize: 18, margin: 15 }}>
                    {trabajo}
                </Text>
            </View>

            <View style={styles.panel}>
                {
                
                datos.map((val) => {
                    let dat
                    Firebase.database().ref("usuario/" + val).on("value", (sna) => {
                        dat = sna.val()
                    })
                    if(dat.id != usuario.id){
                        return(
                            <Trabajador
                            nombre={dat.nombre+" "+dat.apellido}
                            imagen={dat.imagen}
                            calificacion={dat.estrellas}
                            navigation={navigation}
                            key={dat.id}
                            tra={dat}
                        />  
                        )
                    }

                })
                }

            </View>

        </View>
    )
}

export default ListaUsuarios

const styles = StyleSheet.create({
    panel: {
        borderWidth: 3,
        borderColor: "#767676",
        flex: 1,
        marginBottom: 40,
        marginHorizontal: 30,
        borderRadius: 20
    },
})