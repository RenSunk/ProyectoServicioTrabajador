import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import Targeta from "./Targeta"

import IconoComputador from "../assets/Icono_Computador.png"
import IconoLlave from "../assets/Icono_Llave.png"

import IconoSanitario from "../assets/Icono_Sanitario.png"
import IconoElectricidad from "../assets/Icono_Electricidad.png"

import IconoPintura from "../assets/Icono_Pintura.png"
import IconoEscoba from "../assets/Icono_Escoba.png"

const ListaTargeta = ({navigation}) => {
    
    return (

        <ScrollView style={{flex:1, marginBottom:20}}>

            <View style={styles.filas}>
                <Targeta 
                    servicio={"Tecnicos de computadores"} 
                    imagenes={IconoComputador} 
                    navigation={navigation}
                />
                <Targeta 
                    servicio={"Cerrajeros"} 
                    imagenes={IconoLlave}
                    navigation={navigation}
                />
            </View>

            <View style={styles.filas}>
                <Targeta 
                    servicio={"Plomeros"} 
                    imagenes={IconoSanitario}
                    navigation={navigation} 
                />
                <Targeta 
                    servicio={"Electricistas"} 
                    imagenes={IconoElectricidad} 
                    navigation={navigation}
                />
            </View>
            <View style={styles.filas}>
                <Targeta 
                    servicio={"Pintores"} 
                    imagenes={IconoPintura} 
                    navigation={navigation}
                />
                <Targeta 
                    servicio={"Aseadores"} 
                    imagenes={IconoEscoba} 
                    navigation={navigation}
                />
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({

    filas: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    columnas: {
        flex: 5
    }

})

export default ListaTargeta