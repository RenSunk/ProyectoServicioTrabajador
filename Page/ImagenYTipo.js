import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

const ImagenYTipo = ({navigation}) => {

    return (
        <View style={{backgroundColor: "#18191A", flex:1, justifyContent:"center"}}>

            <View style={{ justifyContent: "center", alignItems: "center", borderColor: "#767676", borderWidth: 2, padding: 10, borderRadius: 20, margin: 10 }}>
                <Text style={{ color: "red", marginVertical: 5,color: "white" }}>
                    Importante leer:
                </Text>
                <Text style={{color: "white"}}>
                    Ahora eliga el tipo de cuenta que desea tener, tenemos dos tipos de cuenta, la cuenta usuario que se utiliza para poder consumir los servicios que se ofrecen y la cuenta trabajador que es para ser prestador de servicios en la aplicacion
                </Text>
            </View>

            <View style={{ margin: 10 }}>
                <Text style={{ textAlign: "center",color: "white", margin:10 }}>
                    Elija el tipo de cuenta:
                </Text>

                <TouchableOpacity style={{ borderColor: "#767676", borderWidth: 2, borderRadius: 20, padding: 10, marginVertical: 10 }}
                onPress={()=> navigation.navigate('Inicio') }>
                    <Text style={{ textAlign: "center",color: "white" }}>
                        Ser un usuario
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ borderColor: "#767676", borderWidth: 2, borderRadius: 20, padding: 10, marginVertical: 10 }}
                onPress={()=> navigation.navigate('Trabajos')}>
                    <Text style={{ textAlign: "center",color: "white" }}>
                        Ser un trabajador
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ImagenYTipo