import React, { useContext } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Image, Touchable } from "react-native"
import { useEffect, useState } from "react/cjs/react.development"
import Estrellas from "../Componente/Estrellas"
import TrabajoContext from "../Context/TrabajoContext"
import UsuarioContext from "../Context/UsuarioContext"
import Firebase from "../Database/Firebase"
import { useIsFocused } from '@react-navigation/native';
import DataContext from "../Context/Context"
const EditarTrabajador = ({ navigation }) => {

    const isFocused = useIsFocused();
    const { settrabajador } = useContext(TrabajoContext)
    const { usuario } = useContext(UsuarioContext)
    const [datos, setdatos] = useState({})
    const { setdata } = useContext(DataContext)
    const [estado, setestado] = useState({})

    const [estilos, setestilos] = useState()
    
    useEffect(() => {
        if (isFocused) {
            setdata("Usuario")
            setdatos(usuario)
            setestado(usuario.estado)
        }
    }, [isFocused])

    useEffect(()=>{
        if(estado == "Disponible"){
            setestilos("#00FF38")
        }else{
            setestilos("red")
        }
    },[estado])

    const cambiarEstado = () =>{
        if(estado == "Disponible"){
            setestado("Ocupado")
            datos.estado = "Ocupado"
            Firebase.database().ref("usuario/"+usuario.id+"/estado").set("Ocupado")
        }else{
            setestado("Disponible")
            datos.estado = "Disponible"
            Firebase.database().ref("usuario/"+usuario.id+"/estado").set("Disponible")
        }
    }

    return (
        <View style={{ backgroundColor: "#18191A", flex: 1, justifyContent: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center", margin:20 }}>

                <Image style={styles.imagen} source={{ uri: datos.imagen }} />
            </View>

            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderWidth:2, borderColor:"#767676", margin:10, borderRadius:100, padding:5 }}
                onPress={()=>cambiarEstado()}
            >

                <Text style={styles.texto} allowFontScaling={false}>
                        Cambiar Estado {datos.estado}
                </Text>

                <View style={ {backgroundColor: estilos,  borderColor: "#00FF38",  borderWidth: 0, width: 15, height: 15,borderRadius: 100, marginHorizontal: 5} } />

            </TouchableOpacity>

            <View>

                <View style={{ borderWidth: 3, borderColor: "#767676", borderRadius: 15, marginHorizontal: 20, margin: 10,  }}>

                    <Text style={{ color: "white", margin:10 }}>
                        Trabajos: {datos.trabajos}
                    </Text>

                    <View style={styles.linea} />

                    <Text style={{ color: "white", margin:10 }}>
                        Cedula: {datos.cedula}
                    </Text>

                </View>

            </View>

            <View style={{ alignItems: "center", justifyContent: "center", margin: 10 }}>
                <Estrellas altura={2.5} anchura={2.5} numero={datos.estrellas} />
            </View>

            <TouchableOpacity onPress={
                () => {

                    settrabajador(datos)
                    navigation.navigate("Comentarios_Trabajador")
                }
            } style={styles.boton} >

                <Text style={styles.texto} allowFontScaling={false}>
                    Abrir Comentarios
                </Text>
            </TouchableOpacity>
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
        margin: 20
    },
    texto: {
        margin: 5,
        color: "white",
        textAlign: "center"
    }
})

const disponible = StyleSheet.create({
    bolita:{
        
    }

})

const ocupado = StyleSheet.create({
    bolita:{
        backgroundColor: "black", 
        borderColor: "#00FF38", 
        borderWidth: 0,
        width: 15, 
        height: 15, 
        borderRadius: 100, 
        marginHorizontal: 5
    }
})
export default EditarTrabajador