import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native"

const PanelChatUsuario = ({texto, imagen, nombre, fecha, hora}) =>{
    let tiempo 
    if(fecha == undefined ){
        tiempo = ""
    }else{
        tiempo = fecha+"/"+ hora
    }

    if(nombre == undefined){
        return (
            <View style={{flexDirection:"row", margin:10, justifyContent:"flex-end" }}>
                <View style={{flex:1,borderWidth:2, borderColor:"#767676", borderRadius:10, marginHorizontal:10}}>
                    <Text allowFontScaling={false} style={{color:"white", padding:5,textAlign:"right"}}> {texto} </Text>
                    <Text style={{color:"white", padding:5}} allowFontScaling={false}>
                        {tiempo}
                    </Text>
                </View>
                <Image source={{uri:imagen}} style={{width:40, height:40, borderRadius:100}} />
            </View>
        )
    }

    return (
        <View style={{flexDirection:"row",margin:10, justifyContent:"flex-end"}}>

            <View style={{borderWidth:2, borderColor:"#767676", borderRadius:5,marginHorizontal:5}}>
                <Text style={{color:"white", padding:3}} > {nombre} </Text>
                <Text style={{color:"white", marginHorizontal:5}} allowFontScaling={false}>
                    {tiempo}
                </Text>
                <View style={{borderTopColor:"#767676", borderWidth:2}}>
                    <Text allowFontScaling={false} style={{color:"white", padding:5}}> {texto} </Text>
                </View> 
            </View>
            <Image source={{uri:imagen}} style={{width:40, height:40, borderRadius:100}} />
        </View>
    )
}

export default PanelChatUsuario