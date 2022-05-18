import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

import EstrellaDR from "../assets/Estrella_Derecha_Relleno.png"
import EstrellaD from "../assets/Estrella_Derecha.png"

import EstrellaIR from "../assets/Estrella_Izquierda_Relleno.png"
import EstrellaI from "../assets/Estrella_Izquierda.png"

const Estrellas = ({numero, anchura, altura}) => {

    const [numeros] = useState([0,1,2,3,4])
    
    if(anchura == undefined){
        anchura = 1;
    }
    if(altura == undefined){
        altura = 1
    }

    return (
        <View style={{flexDirection:"row"}}>
            {
                numeros.map((value,i)=>{
                    if(numero > value){
                        let img1,img2
                        if(numero <= value+0.5){
                            img1 = EstrellaIR
                            img2 = EstrellaD
                        }else{
                            img1 = EstrellaIR
                            img2 = EstrellaDR
                        }
                        return(
                            <View style={{ marginHorizontal: 1, flexDirection: "row" }} key={i}>
                                <View style={{ width: 9.7*anchura, height: 20*anchura, }}>
                                    <Image source={img1} style={{ width: 10*anchura, height: 10*anchura, flex: 1 }} />
                                </View>

                                <View style={{ width: 9.7*anchura, height: 20*anchura, }}>
                                    <Image source={img2} style={{ width: 10*anchura, height: 10*anchura, flex: 1 }} />
                                </View>
                            </View>
                        )
                    }else{
                        return(
                            <View style={{ marginHorizontal: 1, flexDirection: "row" }} key={i}>
                                <View style={{  width: 9.7*anchura, height: 20*anchura, }}>
                                    <Image source={EstrellaI} style={{ width: 10*anchura, height: 10*anchura, flex: 1 }} />
                                </View>

                                <View style={{width: 9.7*anchura, height: 20*anchura, }}>
                                    <Image source={EstrellaD} style={{ width: 10*anchura, height: 10*anchura, flex: 1 }} />
                                </View>
                            </View>
                        )
                    }


                })
            }


        </View>

    )

}

export default Estrellas

