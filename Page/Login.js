import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { useContext } from "react"
import DataContext from "../Context/Context"
import UsuarioContext from "../Context/UsuarioContext"
import { useIsFocused } from '@react-navigation/native';
import Firebase from "../Database/Firebase"

import Logo from "../assets/Logo.png"
import Spinner from "../Componente/ModalSpinner"

const Login = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { setdata } = useContext(DataContext)
    const {usuario, setusuario} = useContext(UsuarioContext)

    const [vis, setvis] = useState(false)
    const [text, setetx] = useState("Cargando...")

    const [datos, setdatos] = useState({
        correo: "",
        contra: "",
        id:"",
        imagen:"",
        tipo:"",
        nombre:"",
        apellido:""
    })

    const handleChangeText = (name, valor) => {
        setdatos({ ...datos, [name]: valor })
    }

    useEffect(() => {
        if (isFocused) {
            setdata("Login")
            setusuario({})
            //iniciar(navigation,usuario)
            
        }
        
    }, [isFocused])


    const iniciar = (navigation) => {
        setvis(true)
        setetx("Inician...")
        if(datos.correo != ""){
            
            Firebase.auth().signInWithEmailAndPassword(datos.correo,datos.contra).then( ()=>{
                setetx("Comprobando credenciales...")
                Firebase.auth().onAuthStateChanged((user)=>{
                    setetx("Cargando Informacion...")
                    if(user){
                        datos.id=user.uid
                        Firebase.database().ref("usuario/"+user.uid).on("value", (sna)=>{
                            setetx("Entrando a la cuenta")
                            setdatos(sna.val())
                            setusuario(sna.val())
                        })
                        
                    }
                })
                setvis(false)
                navigation.navigate('Inicio');
            }).catch(()=>{
                alert("error")
            })
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
                    <Text style={{ color: "white" }} allowFontScaling={false}>
                        Inicio de sesion
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "50%", alignItems: "center" }} onPress={() => {
                    navigation.navigate('Registro');
                }}>
                    <Text style={{ color: "#767676" }} allowFontScaling={false}>
                        Registro de cuenta
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={{alignItems:"center", justifyContent:"center", marginVertical:20}}>
                <Image source={Logo}  style={{width:100, height:100}} />
            </View>
            


            <View style={{  }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                    <View style={{ borderWidth: 2, borderColor: "#767676", margin: 20, borderRadius: 15, padding: 30 }}>

                        <View style={{ paddingVertical: 20 }}>
                            <Text style={{ color: "white" }} allowFontScaling={false}>
                                Correo Electronico
                        </Text>

                            <TextInput
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                                onChangeText={(value) => handleChangeText("correo", value)} 
                                keyboardType={"email-address"}/>
                        </View>


                        <View style={{ paddingVertical: 20 }}>

                            <Text
                                style={{ color: "white" }}
                                allowFontScaling={false}>
                                Contraseña
                        </Text>

                            <TextInput
                                style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white", }}
                                secureTextEntry={true}
                                
                                onChangeText={(value) => handleChangeText("contra", value)}
            
                            />
                        </View>


                    </View>

                    <View style={{ margin: 20 }}>
                        <TouchableOpacity onPress={() => iniciar(navigation, datos)}>
                            <Text style={{ 
                                color: "white", 
                                    borderWidth: 2, 
                                    borderColor: "#767676", 
                                    paddingHorizontal: 30, 
                                    paddingVertical: 15, 
                                    borderRadius: 10, textAlign:"center"
                                }} 
                                allowFontScaling={false}>
                                Entrar
                        </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>

        </View>
    )
}
export default Login