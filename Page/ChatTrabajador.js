import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import PanelChatUsuario from "../Componente/PanelChatUsuario";
import PanelChatTrabajador from "../Componente/PanelChatTrabajador";
import Firebase from "../Database/Firebase";
import UsuarioContext from "../Context/UsuarioContext";
import TrabajoContext from "../Context/TrabajoContext";
import DataContext from "../Context/Context";
import { useIsFocused } from "@react-navigation/native";

const ChatTrabajador = ({ navigation }) => {
  const isFocused = useIsFocused();

  const { trabajo, trabajador, cliente } = useContext(TrabajoContext);
  const { usuario } = useContext(UsuarioContext);
  const { data, setdata } = useContext(DataContext);

  const [chats, setchats] = useState([]);
  const [input, setinput] = useState("");
  const [nombre, setnombre] = useState("");

  let time = new Date();

  useEffect(() => {
    Firebase.database()
      .ref("Servicios Solicitados/" + trabajo + "/chat")
      .on("value", function (snapshot) {
        setchats( snapshot.val() == null ? {} : snapshot.val() );
      });
  }, [isFocused]);

  return (
    <View style={{ backgroundColor: "#18191A", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderColor: "#767676",
            borderWidth: 2.5,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            marginTop:30,
            marginBottom: 10,
            paddingHorizontal: 7,
            paddingVertical: 10,
          }}
        >
          <Text allowFontScaling={false} style={{ color: "white" }}>
            {trabajador.nombre} {trabajador.apellido}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 5,
          borderWidth: 3,
          borderColor: "#767676",
          margin: 15,
          borderRadius: 15,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {
              
            Object.values( Object.values(chats).length <= 0 ? [] : chats ).map((val, i) => {
              console.log(val, i);
              if (val.id == usuario.id) {
                return (
                  <PanelChatUsuario
                    texto={val.ms}
                    imagen={usuario.imagen}
                    key={i}
                    fecha={val.fecha}
                    hora={val.hora}
                  />
                );
              } else {
                return (
                  <PanelChatTrabajador
                    texto={val.ms}
                    imagen={trabajador.imagen}
                    key={i}
                    fecha={val.fecha}
                    hora={val.hora}
                  />
                );
              }
            })
          }
        </ScrollView>
      </View>

      <View style={{ flex: 0.8, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: "5%",
          }}
        >
          <TextInput
            style={{
              width: "80%",
              borderWidth: 2,
              borderColor: "#767676",
              color: "white",
              padding: 5,
              borderRadius: 10,
            }}
            value={input}
            onChangeText={(value) => setinput(value)}
          />

          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#767676",
              borderRadius: 10,
              width: "15%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (input != "") {
                //let codigo = time.getUTCFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "-" + time.getHours() + "-" + time.getUTCMinutes() + "-" + time.getSeconds()
                let codigo = time.getTime();
                let horas = time.getHours(),
                  minutos = time.getMinutes(),
                  dia = time.getDate(),
                  mes = time.getMonth() + 1,
                  anio = time.getFullYear();

                if (horas <= 9) {
                  horas = "0" + horas;
                }
                if (minutos <= 9) {
                  minutos = "0" + minutos;
                }
                if (dia <= 9) {
                  dia = "0" + dia;
                }
                if (mes <= 9) {
                  mes = "0" + mes;
                }

                let hora = horas + ":" + minutos;
                let fecha = anio + "-" + mes + "-" + dia;

                let json = {
                  id: usuario.id,
                  ms: input,
                  fecha: fecha,
                  hora: hora,
                };

                Firebase.database()
                  .ref(
                    "Servicios Solicitados/" + trabajo + "/" + "chat/" + codigo
                  )
                  .set(json);
              }

              setinput("");
            }}
          >
            <Text style={{ color: "white" }} allowFontScaling={false}>
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatTrabajador;
