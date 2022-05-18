import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native"
import { useContext } from "react"
import DataContext from "../Context/Context"
import UsuarioContext from "../Context/UsuarioContext"
import { useIsFocused } from '@react-navigation/native';
import Firebase from "../Database/Firebase"
import Spinner from "../Componente/ModalSpinner"
const Registro = ({ navigation }) => {

    const isFocused = useIsFocused();
    const { setdata } = useContext(DataContext)
    const { setusuario } = useContext(UsuarioContext);

    const [vis, setvis] = useState(false)
    const [text, setetx] = useState("Cargando...")

    const [datos, setdatos] = useState({
        nombre:"",
        apellido:"",
        correo: "",
        imagen:"https://firebasestorage.googleapis.com/v0/b/servicioandroid-d0467.appspot.com/o/Icono%20Usuario%20Grande.png?alt=media&token=aa308f99-7b21-4bcd-9d01-b078892465c4",
        id:"",
        direccion:"",
        tipo:"Usuario / Consumidor"
    })

    const [contra, setcontra] = useState({
        contra:"",
        contra2:""
    })

    useEffect(() => {
        if (isFocused) {
            setdata("Registro")
            setusuario({})
            
        }
    }, [isFocused])


    const registrarCuenta = () => {

        setvis(true)
        setetx("Cargando informacion...")

        Firebase.auth().createUserWithEmailAndPassword(datos.correo, contra.contra).then(()=>{
            setetx("Creando Cuenta...")
            Firebase.auth().signInWithEmailAndPassword(datos.correo, contra.contra).then(()=>{
                Firebase.auth().onAuthStateChanged((user)=>{
                    setetx("Subiendo Datos...")
                    if(user){
                        datos.id = user.uid
                        escribirUsuario()
                    }
                })
            })
        })
    }
    
    const escribirUsuario = () =>{

        Firebase.database().ref("usuario/"+datos.id).set(datos).then(()=>{
            setusuario(datos)
            setvis(false)
            navigation.navigate('Tipo');
        })

    }





    const handleChangeText = (name, valor) => {
        if(name == "contra" || name == "contra2"){
            setcontra({ ...contra, [name]: valor })
        }else{
            setdatos({ ...datos, [name]: valor })
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#18191A" }}>
            < Spinner 
                visible={vis}
                text={text}
            />
            <View style={{ flexDirection: "row", borderBottomColor: "#767676", borderBottomWidth: 2, paddingVertical: 15 }}>
                <TouchableOpacity style={{ width: "50%", alignItems: "center" }} onPress={() => {
                    navigation.navigate('Login');
                }}>
                    <Text style={{ color: "#767676" }} allowFontScaling={false}>
                        Inicio de sesion
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "50%", alignItems: "center" }} onPress={() => {
                    navigation.navigate('Registro');
                }}>
                    <Text style={{ color: "white" }} allowFontScaling={false}>
                        Registro de cuenta
                    </Text>
                </TouchableOpacity>

            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                <View style={{ flex: 1, justifyContent: "center" }}>

                    <View style={{ borderWidth: 2, borderColor: "#767676", marginVertical:20, marginHorizontal:20,borderRadius: 15, padding: 30 }}>

                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                Nombres
                        </Text>

                            <TextInput 
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                                onChangeText={(value)=>handleChangeText("nombre", value)}
                            />
                        </View>

                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                Apellidos
                        </Text>

                            <TextInput 
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }} 
                                onChangeText={(value)=>handleChangeText("apellido", value)}/>
                        </View>

                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                Correo Electronico
                        </Text>

                            <TextInput 
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }} 
                                onChangeText={(value)=>handleChangeText("correo", value)}
                            />
                        </View>

                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                direccion de domicilio
                        </Text>

                            <TextInput 
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }} 
                                onChangeText={(value)=>handleChangeText("direccion", value)}
                            />
                        </View>

                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                Contraseña
                        </Text>

                            <TextInput 
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white", }} 
                                secureTextEntry={true} 
                                onChangeText={(value)=>handleChangeText("contra", value)}
                            />
                        </View>
                        <View style={style.panel}>
                            <Text style={{ color: "#767676" }} allowFontScaling={false}>
                                Verificar Contraseña
                        </Text>

                            <TextInput
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white", }} 
                                secureTextEntry={true} 
                                onChangeText={(value)=>handleChangeText("contra2", value)}
                            />
                        </View>

                    </View>

                    <View style={{ margin: 10 }}>
                        <TouchableOpacity onPress={() => registrarCuenta(navigation, datos, contra)}>
                            <Text style={{ color: "white", borderWidth: 2, borderColor: "#767676", paddingVertical: 10, borderRadius: 10, textAlign:"center", marginHorizontal:20 }} allowFontScaling={false}>
                                Registar Cuenta
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    panel: {
        paddingVertical: 5
    }
})

export default Registro