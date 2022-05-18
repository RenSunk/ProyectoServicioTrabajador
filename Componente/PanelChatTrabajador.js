import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native"

const PanelChatTrabajador = ({texto, imagen, fecha, hora}) => {
    return (
        <View style={{ flexDirection:"row", margin:10, }}>
            <Image source={{uri:imagen}} style={{ width: 40, height: 40, borderRadius: 100 }} />
            <View style={{flex:1, borderWidth: 2, borderColor: "#767676", borderRadius: 10, marginHorizontal: 10 }}>
                <Text allowFontScaling={false} style={{ color: "white", padding: 5, textAlign:"left" }}> {texto} </Text>

                <Text style={{color:"white", textAlign:"right", padding:5}} allowFontScaling={false}>
                    {fecha+"/"+ hora}
                </Text>
            </View>

        </View>
    )
}

export default PanelChatTrabajador