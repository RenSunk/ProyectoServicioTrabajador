import React,{useEffect,useContext,useState}  from "react"
import { View,Text, StyleSheet } from "react-native"
import ChatPanel from "../Componente/ChatPanel"

import DataContext from "../Context/Context"

import { useIsFocused } from '@react-navigation/native';
import Firebase from "../Database/Firebase"
import UsuarioContext from "../Context/UsuarioContext"

const Chat = ({navigation}) =>{

    const isFocused = useIsFocused();
    const {setdata} = useContext(DataContext)
    const { usuario } = useContext(UsuarioContext)
    const [chats , setchats] = useState([])
    useEffect(()=>{
        if(isFocused){
            setdata("Chat")
            Firebase.database().ref("chats/"+usuario.id).on("value", (sna)=>{
                setchats([sna.val()])
            })
        }
    },[isFocused])
    const Panel = () =>{
        return(
                chats.map((value)=>{
                    let arrayT = []
                    for(let keay in value){                            
                        arrayT.push({
                            id: keay,
                            time : value[keay].time.time,
                            ms: value[keay].time.ms,
                            visto : value[keay].time.visto
                        })
                    }
                    
                    //ordenar arrayT

                    arrayT.sort(function(a,b){
                        return  b.time - a.time
                    })
                    
                    return arrayT.map((value,i) =>{

                        let nombre, imagen, id

                        Firebase.database().ref("usuario/"+value.id).on("value", (sna)=>{
                            nombre = sna.val().nombre+" "+sna.val().apellido
                            imagen = sna.val().imagen
                            id = sna.val().id
                        })

                        return(
                            <ChatPanel 
                            nombre={nombre} 
                            imagen={imagen} 
                            ultimo_mensaje={value.ms}
                            key={i}
                            id={id}
                            navigation={navigation}
                            visto={value.visto}
                        />
                        )

                    })
                })
        )
    }
    return(
        <View style={ { backgroundColor:"#18191A",flex:1 } }>

            <View style={{  alignItems:"center", marginVertical:10, marginVertical:40  }}>
                <Text style={styles.texto}>
                    Chat Recientes
                </Text>
            </View>


            <View style={styles.panel}>
                
                <Panel />
 
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
        borderRadius:20 
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