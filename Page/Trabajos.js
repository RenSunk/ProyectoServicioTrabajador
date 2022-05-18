import React, { useState, useContext } from "react"
import { View, Text, CheckBox, TouchableOpacity, TextInput } from "react-native"
import { useEffect } from "react/cjs/react.development"
import UsuarioContext from "../Context/UsuarioContext"
import Firebase from "../Database/Firebase"
import { useIsFocused } from '@react-navigation/native';
import DataContext from "../Context/Context"
import Spinner from "../Componente/ModalSpinner"
const Trabajos = ({navigation}) => {

    const isFocused = useIsFocused();
    const { setdata } = useContext(DataContext)
    const [pasa, setpasa] = useState(false)

    const [vis, setvis] = useState(false)
    const [text, setetx] = useState("Cargando...")
    useEffect(()=>{
        if(isFocused){
            setdata("Trabajos")
            Firebase.database().ref("solicitudes/"+usuario.id).on("value", (sna)=>{
                if(sna.val() == null){
                    setpasa(true)
                }else{
                    setpasa(false)
                }
            })
        }
    },[isFocused])

    const { usuario } = useContext(UsuarioContext)
    const [trab, settrab] = useState({
        servicio1: false,
        servicio2: false,
        servicio3: false,
        servicio4: false,
        servicio5: false,
        servicio6: false
    })
    const [cedula, setcedula] = useState("")
    const enviar = () =>{
        setvis(true)
        Firebase.database().ref("solicitudes/"+usuario.id).set({
            trab,
            cedula:cedula
        }).then(()=>{
            setetx("Subiendo...")
            setvis(false)
            navigation.navigate('Inicio')
        })
    }

    if(!pasa){

        return (
        <View style={{backgroundColor: "#18191A", flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:"white", margin:10}} allowFontScaling={false}>
                usted ya envio una solicitud para el trabajo
            </Text>
            <TouchableOpacity style={{margin:10, borderColor:"#767676", borderWidth:2, borderRadius:100, padding:10}}
            onPress={()=>navigation.goBack()}>
                <Text style={{color:"white"}} allowFontScaling={false}>
                    {"<-"} Regresar a la pantalla anterior
                </Text>
            </TouchableOpacity>
        </View>
        )
    }

    return (
        <View style={{backgroundColor: "#18191A", flex:1, justifyContent:"center"}}>

            < Spinner 
                visible={vis}
                text={text}
            />

            <Text style={{ textAlign: "center", color:"white", margin:10 }} allowFontScaling={false}>
                Elija los trabajos que quiere aplicar:
            </Text>
            <View style={{ borderColor: "#767676", borderWidth: 2, borderRadius: 10, margin: 10, padding: 10 }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ textAlign: "center",color:"white" }} allowFontScaling={false}>
                            Tecnicos de computadores
                        </Text>
                        <CheckBox
                            value={trab.servicio1}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio1: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={{color:"white"}} allowFontScaling={false}>
                            Cerrajeros
                        </Text>
                        <CheckBox
                            value={trab.servicio2}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio2: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>

                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{color:"white"}} allowFontScaling={false}>
                            Plomeros
                        </Text>
                        <CheckBox
                            value={trab.servicio3}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio3: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={{color:"white"}} allowFontScaling={false}>
                            Electricistas
                        </Text>
                        <CheckBox
                            value={trab.servicio4}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio4: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 5 }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{color:"white"}} allowFontScaling={false}>
                            Pintores
                        </Text>
                        <CheckBox
                            value={trab.servicio5}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio5: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>

                    <View style={{ alignItems: "center", flex: 1 }}>
                        <Text style={{color:"white"}} allowFontScaling={false}>
                            Aseadores
                        </Text>
                        <CheckBox
                            value={trab.servicio6}
                            onValueChange={(value) => {
                                settrab({
                                    ...trab,
                                    servicio6: value
                                })
                            }}
                            tintColors={{ true: 'white', false: 'black' }}
                        />
                    </View>
                </View>
            </View>

            <Text style={{color:"white", textAlign:"center", marginTop:5}} allowFontScaling={false}>
                Ingrese Cedula
            </Text>

            <TextInput 
                style={{borderColor:"#767676", borderBottomWidth:2, color:"white", marginHorizontal:10, marginBottom:20}}
                onChangeText={(text) => setcedula(text)}
                keyboardType={"number-pad"}
            />

            <TouchableOpacity style={{ borderColor: "#767676", borderWidth: 2, borderRadius: 20, padding: 10, margin: 10 }} 
            onPress={()=>enviar()}>
                <Text style={{ textAlign: "center", color:"white" }} allowFontScaling={false}>
                    Enviar Aplicacion
                </Text>
            </TouchableOpacity>

        </View>
    )
}



export default Trabajos