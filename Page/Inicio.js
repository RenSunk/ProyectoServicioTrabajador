import React, {useEffect} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, SnapshotViewIOS } from "react-native"
import ListaTargeta from "../Componente/ListaTragetas"
import Logo from "../assets/Logo.png"


import { useContext } from "react"
import DataContext from "../Context/Context"
import { useIsFocused } from '@react-navigation/native';

import Firebase from "../Database/Firebase"

import UsuarioContext from "../Context/UsuarioContext"


const Inicio = ({navigation}) => {

    const { usuario } = useContext(UsuarioContext);

    const isFocused = useIsFocused();
    const {data, setdata} = useContext(DataContext)

    useEffect(()=>{
        if(isFocused){
            setdata("Inicio")

            Firebase.database().ref("usuario/").on("value", function(snapshot){
                //console.log(snapshot.val())
            })
            
        }
    },[isFocused])


    return (
        
        <View style={{ backgroundColor: "#18191A", flex: 1 }}>



            <View style={styles.container}>
                <View style={styles.linea} />
                <TouchableOpacity>
                    <Image style={{ width: 120, height: 120 }} source={Logo} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 20 }}> Servicios </Text>
            </View>
            <View style={styles.linea} />

            <ListaTargeta navigation={navigation} />
        </View>
        
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
        marginTop: 40,
        marginLeft: 20,
        marginBottom: 30
    },
    barra: {
        backgroundColor: "#767676",
        height: 30
    },
    linea: {
        height: 5,
        backgroundColor: "#767676"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:10,
        marginBottom:18
    },

})

export default Inicio