import React, { useEffect, useContext, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native"
import tuque from "../assets/tuque.jpg"
import yo from "../assets/yo.jpg"
import Estrella from "../assets/Estrella.png"
import PanelChatUsuario from "../Componente/PanelChatUsuario"
import PanelChatTrabajador from "../Componente/PanelChatTrabajador"
import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"
import TrabajoContext from "../Context/TrabajoContext"
import DataContext from "../Context/Context"
import { useIsFocused } from '@react-navigation/native';


const ChatTrabajador = ({ navigation }) => {

    const isFocused = useIsFocused();
    const { trabajador,cliente } = useContext(TrabajoContext)
    const { usuario } = useContext(UsuarioContext)
    const {data, setdata} = useContext(DataContext)
    const [chats, setchats] = useState([])
    const [input, setinput] = useState("")
    const [nombre, setnombre] = useState("")
    let time = new Date()

    useEffect(() => {
        if (isFocused) {
            setdata("Chat_trabajador")
            
            if(usuario.tipo == "Trabajador"){

                Firebase.database().ref("chats/"+usuario.id+"/"+cliente.id+"/time/visto").set(true)

                Firebase.database().ref("chats/"+usuario.id+"/"+cliente.id).on("value",(sna)=>{
                    setchats([])
                    setchats([sna.val()])
                })

                if(cliente.nombre == undefined){
                    setnombre(trabajador.nombre + " " + trabajador.apellido)
                }else{
                    setnombre(cliente.nombre+" "+cliente.apellido)
                }
                
            }else{
                Firebase.database().ref("chats/" + usuario.id + "/" + trabajador.id+"/time/visto").set(true)

                Firebase.database().ref("chats/" + usuario.id + "/" + trabajador.id).on("value", (sna) => {
                    setchats([])
                    setchats([sna.val()])
                })
                setnombre(trabajador.nombre + " " + trabajador.apellido)

            }

        }
    }, [isFocused])

    return (
        <View style={{ backgroundColor: "#18191A", flex: 1 }}>

            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: 5 }}>

                <TouchableOpacity onPress={() => {
                    if(usuario.tipo == "Trabajador"){
                        navigation.navigate('Chat');
                    }else{
                        navigation.navigate('Perfil_Trabajador');
                    }
                }} style={{ flexDirection: "row", borderColor: "#767676", borderWidth: 2.5, borderRadius: 100, justifyContent: "center", alignItems: "center", marginVertical: 10, paddingHorizontal: 7, paddingVertical: 10 }}>
                    <Text allowFontScaling={false} style={{ color: "white" }}>
                        {nombre}
                    </Text>
                    <View style={{ backgroundColor: "#00FF38", borderColor: "#00FF38", borderWidth: 0, width: 15, height: 15, borderRadius: 100, marginHorizontal: 5 }} />

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
                <ScrollView style={{flex:1}}>
                    {
                        chats.map((value) => {
                            let array = []
                            for (let keay in value) {
                                if(keay != "time"){
                                    array.push(value[keay])
                                }
                               
                            }
                            return array.map((val, i) => {
                                if(cliente.nombre == undefined){
                                    if (val.id == usuario.id) {
                                    
                                        return (
                                            <PanelChatUsuario
                                                texto={val.ms}
                                                imagen={usuario.imagen}
                                                key={i}
                                                fecha={val.fecha}
                                                hora={val.hora}
                                            />)
                                    } else {
                                        return (
                                            <PanelChatTrabajador
                                                texto={val.ms}
                                                imagen={trabajador.imagen}
                                                key={i}
                                                fecha={val.fecha}
                                                hora={val.hora}
                                            />
                                        )
                                    }
                                }else if(usuario.tipo == "Trabajador"){
                                    
                                    if (val.id == usuario.id) {
                                        
                                        return (
                                            <PanelChatUsuario
                                                texto={val.ms}
                                                imagen={usuario.imagen}
                                                key={i}
                                                fecha={val.fecha}
                                                hora={val.hora}
                                            />)
                                    } else {
                                        return (
                                            <PanelChatTrabajador
                                                texto={val.ms}
                                                imagen={cliente.imagen}
                                                key={i}
                                                fecha={val.fecha}
                                                hora={val.hora}
                                            />
                                        )
                                    }
                                }
                            })
                        })
                    }

                </ScrollView>

            </View>

            <View style={{ flex: 0.8, justifyContent: "center", }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: "5%" }}>

                    <TextInput style={{ width: "80%", borderWidth: 2, borderColor: "#767676", color: "white", padding: 5, borderRadius: 10 }} value={input} onChangeText={(value) => setinput(value)} />

                    <TouchableOpacity style={{ borderWidth: 2, borderColor: "#767676", borderRadius: 10, width: "15%", justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            if(input != ""){
                                //let codigo = time.getUTCFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "-" + time.getHours() + "-" + time.getUTCMinutes() + "-" + time.getSeconds()
                                let codigo = time.getTime()
                                let horas= time.getHours(), minutos= time.getMinutes(), dia=time.getDate(), mes = time.getMonth()+1, anio = time.getFullYear();
                                
                                if(horas <= 9){
                                    horas = "0"+horas 
                                }
                                if(minutos <= 9){
                                    minutos = "0"+minutos 
                                }
                                if(dia <= 9){
                                    dia = "0"+dia 
                                }
                                if(mes <= 9){
                                    mes = "0"+mes 
                                }

                                let hora=horas+":"+minutos

                                let fecha= anio+"-"+ mes +"-" +dia
                                
                                let json = {

                                    id: usuario.id,
                                    ms: input,
                                    fecha:fecha,
                                    hora:hora,
                                }

                                if(cliente.nombre == undefined){

                                    
                                    Firebase.database().ref("chats/"+usuario.id+"/"+trabajador.id+"/"+"time").set({
                                        time:codigo,
                                        ms:input
                                    })

                                    Firebase.database().ref("chats/"+usuario.id+"/"+trabajador.id+"/"+codigo).set(json)

                                    Firebase.database().ref("chats/"+trabajador.id+"/"+usuario.id+"/"+"time").set({
                                        time:codigo,
                                        ms:input,
                                        visto:false
                                    })

                                    Firebase.database().ref("chats/"+trabajador.id+"/"+usuario.id+"/"+codigo).set(json)
                                    
                                    
                                }else if(usuario.tipo == "Trabajador"){
                                    
                                    
                                    Firebase.database().ref("chats/"+usuario.id+"/"+cliente.id+"/"+codigo).set(json).then(()=>{
                                        Firebase.database().ref("chats/"+cliente.id+"/"+usuario.id+"/"+codigo).set(json).then(()=>{
                                            Firebase.database().ref("chats/"+cliente.id+"/"+usuario.id+"/"+"time").set({
                                                time:codigo,
                                                ms:input,
                                                visto:false
                                            }).then(()=>{
                                                Firebase.database().ref("chats/"+usuario.id+"/"+cliente.id+"/"+"time").set({
                                                    time:codigo,
                                                    ms:input,
                                                    
                                                })
                                            })
                                        })

                                    })
                                    
                                }
    
                            }


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

export default ChatTrabajador