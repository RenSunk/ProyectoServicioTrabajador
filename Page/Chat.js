import React,{useEffect,useContext,useState}  from "react"
import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import ChatPanel from "../Componente/ChatPanel"

import DataContext from "../Context/Context"

import { useIsFocused } from '@react-navigation/native';
import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"
import PanelServicio from "../Componente/PanelServicio";
import TrabajoContext from "../Context/TrabajoContext";

const Chat = ({navigation}) =>{

    const isFocused = useIsFocused();
    const {setdata} = useContext(DataContext)
    const { settrabajo } = useContext(TrabajoContext)
    const { usuario } = useContext(UsuarioContext)
    const [chats , setchats] = useState([])
    const [sSolicitados, setsSolicitados] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if (isFocused && Object.keys(usuario).length != 0) {
          setdata("Chat");
          Firebase.database()
            .ref("usuario/" + usuario.id + "/Servicios Solicitado/ids")
            .on("value", function (snapshot) {
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
                      if (i == snapshot.val().length) {
                        setloading(false);
                      }
                     
                    setsSolicitados(json);
                      
                      setloading(false);
                    });
                });
              } else {
                setloading(false);
              }
            });
        }
      }, [isFocused]);

    const Panel = () =>{
        return(
            <View></View>
        )
    }

    const Servicio = (id) =>{
        settrabajo(id)
        navigation.navigate('Finalizado')
    }
    
    return(
        <View style={ { backgroundColor:"#18191A",flex:1 } }>

            <View style={{  alignItems:"center", marginVertical:10, marginVertical:40  }}>
                <Text style={styles.texto}>
                    Historial
                </Text>
            </View>
            <View style={{ marginHorizontal:20 }}>
            {
                Object.values(sSolicitados).map((val, index)=>{
                    console.log(val)
                    if(val.estado === "Finalizado"){
                        return (
                            <TouchableOpacity
                            key={index}
                            onPress={()=> Servicio(val.id)}
                          >
                            <PanelServicio
                              titulo={val != undefined ? val.trabajo : ""}
                              descripcion={val != undefined ? val.descripcion : ""}
                              estado={val.estado}
                            />
                          </TouchableOpacity>
                        )
                    }
                    
                })
            }
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({

    texto:{
        color:"white",
        fontSize:20,
        
    },
    panel:{ 
        borderWidth:3, 
        borderColor:"#767676", 
        flex:1, 
        marginBottom:40, 
        marginHorizontal:30, 
        borderRadius:10 
    },
    textoT:{
        color:"#C4C4C4",
        fontSize:15,
        marginTop:5
    },
    textoC:{
        color:"white",
        fontSize:15,
        
    },
    imagen:{
        width:50, 
        height:50, 
        borderRadius:100, 
        margin:15
    },

})

export default Chat