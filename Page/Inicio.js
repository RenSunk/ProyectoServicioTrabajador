import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SnapshotViewIOS,
  TextInput,
  FlatList,
} from "react-native";
import ListaTargeta from "../Componente/ListaTragetas";
import Logo from "../assets/Logo.png";

import { useContext } from "react";
import DataContext from "../Context/Context";
import { useIsFocused } from "@react-navigation/native";

import Firebase from "../Database/Firebase";

import UsuarioContext from "../Context/UsuarioContext";

import PanelServicio from "../Componente/PanelServicio";

import Agregar from "../assets/Agregar.png";

import ModalAgregar from "../Componente/ModalAgregar"
const peticion = async () => {
  return;
};

const Inicio = ({ navigation }) => {
  const { usuario } = useContext(UsuarioContext);
  const isFocused = useIsFocused();
  const { data, setdata } = useContext(DataContext);
  const [sSolicitados, setsSolicitados] = useState([]);
  const [loading, setloading] = useState(false);
  const [datos, setdatos] = useState({});
  const [array, setarray] = useState([])
  const [visible, setvisible] = useState(false)
  let time = new Date();
  useEffect(() => {
    if (isFocused && Object.keys(usuario).length != 0) {
      setdata("Inicio");
      Firebase.database()
        .ref("usuario/" + usuario.id + "/Servicios Solicitado/ids")
        .on("value", function (snapshot) {

          if(snapshot.val() != null){
            setarray(snapshot.val())
          }
         

          let json = {};
          setsSolicitados([]);
          setloading(true);
          let i = 0;
          if (snapshot.val() != null) {
            snapshot.val().map((val, index) => {
              Firebase.database()
                .ref("Servicios Solicitados/" + val)
                .on("value", function (sna) {
                  setloading(true);

                  json[sna.val().id] = sna.val();
                  i++;
                  setsSolicitados(json);
                  if (i == snapshot.val().length) {
                    setloading(false);
                  }
                  setloading(false);
                });
            });
          } else {
            setloading(false);
          }
        });
    }
  }, [usuario, isFocused]);

  const handleChangeText = (name, valor) => {
    setdatos({ ...datos, [name]: valor });
  };

  const enviar = () => {
    console.log(datos);
    datos["cliente"] = usuario.id;
    datos["estado"] = "buscando";
    let codigo = time.getTime();
    let id =
      usuario.id + "()" + Object.values(sSolicitados).length + "()" + codigo;
      datos["id"] = id

    let arra = array

    arra.push(id)
    setarray(arra)

    Firebase.database()
      .ref("Servicios Solicitados/" + id)
      .set(datos)
      .then(() => {
        Firebase.database()
          .ref("usuario/" + usuario.id + "/Servicios Solicitado/ids")
          .set(array).then(()=>{
            setdatos({
              trabajo:"",
              descripcion:""
            })
          })
      });
  };

  return (
    <View style={{ backgroundColor: "#18191A", flex: 1 }}>
      
      <ModalAgregar

        visible={visible}
        setvisible={setvisible}
        handleChangeText={handleChangeText}
        enviar={enviar}

      />

      

      <TouchableOpacity style={styles.boton}
      onPress={()=> setvisible(true)}>
        <Text style={styles.textos}> Solicitar Servicio </Text>
        <Image source={Agregar} style={{ width: 30, height: 30, margin: 10 }} />
      </TouchableOpacity>

      <View style={styles.panel}>
        <Text style={styles.textos}>Servicios Solicitados</Text>
       

        {loading ? (
          <Text style={styles.textos}> Cargando... </Text>
        ) : (
          Object.values(sSolicitados).map((val, index) => {
            return (
              <TouchableOpacity key={index}>
                <PanelServicio
                  titulo={val != undefined ? val.trabajo : ""}
                  descripcion={val != undefined ? val.descripcion : ""}
                  estado={val.estado}
                />
              </TouchableOpacity>
            );
          })
        )}
        {Object.values(sSolicitados).length <= 0 && loading ? (
          <Text style={styles.textos}> No Hay Servicios En COLA </Text>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#18191A",
  },
  textos: {
    color: "#fff",
    textAlign: "center",
  },
  panel: {
    borderColor: "#767676",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  boton: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    marginTop:20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(24,25,26,0.55)",
    flexDirection: "row",
  },
  modalView: {
    backgroundColor: "#18191A",
    borderRadius: 10,
    padding: 10,
    borderWidth: 3,
    borderColor: "#767676",
  },

  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Inicio;
