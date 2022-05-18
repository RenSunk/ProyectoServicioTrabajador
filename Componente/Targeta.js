import React,{useContext} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

import TrabajoContext from "../Context/TrabajoContext"

const Targeta = ({ servicio, imagenes, navigation }) => {

    const {trabajo, settrabajo} = useContext(TrabajoContext)

    return (

        <TouchableOpacity onPress={ () =>{
            navigation.navigate('Lista_Usuarios');
            settrabajo(servicio)
        }} >
            <View style={styles.targeta}>
                <Image source={imagenes} style={styles.imagen} />
                <Text style={styles.texto}>
                    {servicio}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({

    imagen: {

        height: 40,
        width: 40
    },

    targeta: {
        flex:1,
        borderColor:"#767676",
        borderWidth:3,
        marginTop: 30,
        padding:17,
        width: 105,
        borderRadius: 25,
        alignItems: "center",
        justifyContent:"center",

    },

    texto: {
        color: "#fff",
        fontSize:12,
        marginTop: 5,
        flex:1,
        textAlign:"center"
    },

})

export default Targeta