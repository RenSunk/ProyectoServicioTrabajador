import React,{useEffect, useContext, useState} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import Estrellas from "../Componente/Estrellas"
import Estrella from "../assets/Estrella.png"
import Flecha from "../assets/Flecha.png"

import TrabajoContext from "../Context/TrabajoContext"


const PerfilTrabajador = ({ navigation }) => {

    const { trabajador } = useContext(TrabajoContext)

    const [estilos, setestilos] = useState()

    useEffect(()=>{
        if(trabajador.estado == "Disponible"){
            setestilos("#00FF38")
        }else{
            setestilos("red")
        }
    },)

    return (
        <View style={{ backgroundColor: "#18191A", flex: 1 }}>

            <TouchableOpacity onPress={()=>{
                navigation.goBack()
            }} style={{margin:15, marginBottom:0}}>
                <Image style={{ width: 40, height: 40 }} source={Flecha} />
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                <Image style={styles.imagen} source={{uri:trabajador.imagen}} />
            </View>

            <View style={{ flex: 2.5, margin: 10 }}>

                <View>

                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.texto} allowFontScaling={false}>
                            {trabajador.nombre+" "+trabajador.apellido}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>

                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.texto} allowFontScaling={false}>
                                Estado: {trabajador.estado}
                            </Text>
                            <View style={{ backgroundColor: estilos, borderColor: "#00FF38", borderWidth: 0, width: 15, height: 15, borderRadius: 100, marginHorizontal: 5 }} />
                        </View>


                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                <Image style={{ width: 25, height: 25 }} source={Estrella} />
                            </TouchableOpacity>


                            <TouchableOpacity >
                                <Text style={{ color: "red", fontSize: 25 }} allowFontScaling={false}> ! </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ alignItems: "center", justifyContent: "center", margin: 5 }}>
                        <Estrellas altura={2.5} anchura={2.5} numero={trabajador.estrellas} />
                    </View>
                </View>

                <View>

                    <View style={{ borderWidth: 3, borderColor: "#767676", borderRadius: 15, marginHorizontal: 20, margin: 5 }}>
                        <Text style={styles.texto} allowFontScaling={false}>
                            Trabajos: {trabajador.trabajos}
                        </Text>

                        <View style={styles.linea} />

                        <Text style={styles.texto} allowFontScaling={false}>
                            Correo Electronico: {trabajador.correo}
                        </Text>

                        <View style={styles.linea} />

                        <Text style={styles.texto} allowFontScaling={false}>
                            {trabajador.descripcion}
                        </Text>
                    </View>


                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5 }}>

                    <TouchableOpacity onPress={
                        () => {
                            navigation.navigate("Chat_Trabajador")
                        }
                    } style={styles.boton} >
                        <Text style={styles.texto} allowFontScaling={false}>
                            Abrir Chat
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={
                        () => {
                            navigation.navigate("Comentarios_Trabajador")
                        }
                    } style={styles.boton} >
                        <Text style={styles.texto} allowFontScaling={false}>
                            Abrir Comentarios
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    imagen: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    linea: {
        height: 3,
        backgroundColor: "#767676"
    },
    boton: {
        borderColor: "#767676",
        borderWidth: 2,
        borderRadius: 100,
        padding: 10,
        margin: 15
    },
    texto: {
        margin: 5,
        color: "white"
    }
})

export default PerfilTrabajador