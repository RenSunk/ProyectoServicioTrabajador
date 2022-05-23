import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useContext, useState, useEffect } from "react";
import UsuarioContext from "../Context/UsuarioContext";
import Firebase from "../Database/Firebase";
import TrabajoContext from "../Context/TrabajoContext";
import Estrellas from "../Componente/Estrellas";

const ServicioPendiente = ({ navigation }) => {
  const { usuario } = useContext(UsuarioContext);
  const { trabajo, settrabajador } = useContext(TrabajoContext);
  const [data, setadate] = useState({});
  const [trabajador, setTrabajador] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    Firebase.database()
      .ref("Servicios Solicitados/" + trabajo)
      .on("value", function (snapshot) {
        setadate(snapshot.val());
        console.log(snapshot.val());
        Firebase.database()
          .ref( "usuario/" + snapshot.val().cliente )
          .on("value", function (sna) {
            setloading(true);
            console.log(sna.val());
            setTrabajador(sna.val());
            settrabajador(sna.val());
            setloading(false);
          });
      });
  }, []);

  const Aceptar = () => {
    let array = data;
    array.estado = "pendiente";
    array.trabajador = usuario.id
    setadate(array);
    Firebase.database()
      .ref("Servicios Solicitados/" + trabajo)
      .set(data)
      .then(() => {});
  };

  const Rechazar = () => {
    Firebase.database()
      .ref("Servicios Solicitados/" + trabajo + "/estado")
      .set("buscando")
      .then(() => {
        navigation.navigate("Inicio");
      });
  };

  const abrirchat = () => {
    navigation.navigate("Chat_Trabajador");
  };

  const handleChangeText = (name, valor) => {
    setadate({ ...data, [name]: valor });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#18191A" }}>
      <Text> HOLA </Text>
      <Text> HOLA </Text>
      {loading ? (
        <View></View>
      ) : (
        <View>
          <View
            style={{
              borderColor: "#767676",
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
          >
            <Text style={{ color: "#fff" }}> {data.trabajo} </Text>
            <Text style={{ color: "#fff" }}> {data.estado} </Text>
            <Text style={{ color: "#fff" }}> {data.descripcion} </Text>
          </View>

          {/*trabajador != undefined ? (
            <View
              style={{
                borderColor: "#767676",
                borderWidth: 2,
                borderRadius: 10,
                padding: 10,
                margin: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{ uri: trabajador.imagen }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    marginHorizontal: 30,
                  }}
                >
                  <Text style={{color:"#fff"}}>
                    {trabajador.nombre} {trabajador.apellido}
                  </Text>
                  <Text style={{color:"#fff"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Text>
                  <Estrellas
                    altura={2}
                    anchura={2}
                    numero={trabajador.estrellas}
                  ></Estrellas>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )*/}

          <View
            style={{
              borderColor: "#767676",
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ color: "#fff" }}> Precio: </Text>
            <TextInput
              style={{
                borderBottomColor: "#767676",
                borderBottomWidth: 2,
                color: "white",
              }}
              value={data.precio}
              onChangeText={(value) => handleChangeText("precio", value)}
              keyboardType={"default"}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            {
             ( data.estado == "buscando") ? (<TouchableOpacity
              onPress={() => Aceptar()}
              style={{
                borderWidth: 2,
                borderColor: "#767676",
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "#00FF0A" }}>Aceptar</Text>
            </TouchableOpacity> ):( <View></View>)

            }

          </View>
          <TouchableOpacity
            onPress={() => abrirchat()}
            style={{
              borderWidth: 2,
              borderColor: "#767676",
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
              margin: 10,
            }}
          >
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Abrir Chat para conversar con el cliente
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ServicioPendiente;
