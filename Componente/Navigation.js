import React, { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native"
import iconHomeR from "../assets/Icono_Inicio_Relleno.png"
import iconUserR from "../assets/Icono_Usuario_Relleno.png"

import iconHome from "../assets/Icono_Inicio.png"
import iconUser from "../assets/Icono_Usuario.png"

import IconChat from "../assets/Icono_Chat.png"
import IconChatR from "../assets/Icono_Chat_Relleno.png"


import DataContext from "../Context/Context"
import { useContext } from "react"


const Navigation = ({ r }) => {

  const {data} = useContext(DataContext)
  const [nav, setnav] = useState("home");
  const [img, setimg] = useState([iconHome, iconUser, IconChat]);
  const [textC, settextC] = useState(["white", "#767676", "#767676"])


  useEffect(() => {
    if (nav === "home") {
      setimg([iconHomeR, iconUser, IconChat])
      settextC(["white", "#767676", "#767676"])
    } else if (nav === "user") {
      setimg([iconHome, iconUserR, IconChat])
      settextC(["#767676", "white", "#767676"])
    } else if (nav === "conf") {
      setimg([iconHome, iconUser, IconChatR])
      settextC(["#767676", "#767676", "white"])
    }

  }, [nav,])

  useEffect(()=>{
    if (data === "Inicio") {
      setimg([iconHomeR, iconUser, IconChat])
      settextC(["white", "#767676", "#767676"])
    } else if (data === "Usuario") {
      setimg([iconHome, iconUserR, IconChat])
      settextC(["#767676", "white", "#767676"])
    } else if (data === "Chat") {
      setimg([iconHome, iconUser, IconChatR])
      settextC(["#767676", "#767676", "white"])
    }
  },[data])

  if(data != "Inicio" && data != "Usuario" && data != "Chat"  ){
    return <View />
  }
  
  return (

    <View style={{backgroundColor:"#111111"}}>

      <View style={styles.navegacion}>

        <TouchableOpacity style={styles.contenedor} onPress={() => {
          setnav("home")
          r.current.navigate('Inicio');
        }}>
          <Image source={img[0]} style={styles.imagenes} />
          <Text style={{ color: textC[0] }}> Inicio </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contenedor} onPress={() => {
          setnav("user");
          r.current.navigate('Usuario');
        }}>
          <Image source={img[1]} style={styles.imagenes} />
          <Text style={{ color: textC[1] }}> Usuario </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contenedor} onPress={() => {
          setnav("conf")
          r.current.navigate('Chat');
        }}>
          <Image source={img[2]} style={styles.imagenes} />
          <Text style={{ color: textC[2] }}> Chats </Text>
        </TouchableOpacity>

      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  navegacion: {

    height: 75,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderTopColor: "#767676",
    borderTopWidth: 2,
  },
  imagenes: {
    height: 35,
    width: 35,
  },
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  botonInferior: {
    backgroundColor: "#fff",
    borderRadius: 100, padding: 4
  }
})

export default Navigation