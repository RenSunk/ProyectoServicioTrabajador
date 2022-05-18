import React, { useContext, useState, useEffect } from "react"
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"

import { useIsFocused } from '@react-navigation/native';

import UsuarioContext from "../Context/UsuarioContext"

import Firebase from "../Database/Firebase"
import * as ImagePicker from 'expo-image-picker';

import Spinner from "../Componente/ModalSpinner"

const Editar = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { setusuario, usuario } = useContext(UsuarioContext)
    const [datos, setdatos] = useState({})
    const [datos1, setdatos1] = useState({})

    const [vis, setvis] = useState(false)
    const [text, setetx] = useState("Cargando...")


    const handleChangeText = (name, valor) => {
        setdatos({ ...datos, [name]: valor })
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert("permisos para aceder ala camara son requeridos")
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        if (!pickerResult.cancelled) {
            const uri = pickerResult.uri
            handleChangeText("imagen", uri)
        }
    }

    let actualizar = () => {
        
        setetx( "Cargando Informacion...")
        if (datos1.imagen != datos.imagen) {

            uriToBlob(datos.imagen).then((blod) => {
               setetx( "Cargando Imagen...")
                uploadToFirebase(blod).then(() => {
                    Firebase.storage().ref().child(usuario.id + ".jpg").getDownloadURL().then((data) => {
                        setetx("Subiendo Imagen")
                        Firebase.database().ref("usuario/" + usuario.id).set(datos).then(()=>{
                            setetx("Subiendo Informacion")
                            Firebase.database().ref("usuario/"+usuario.id+"/imagen").set(data).then(()=>{
                                setvis( false)
                                setusuario(datos)
                                navigation.navigate("Usuario")
                            })
                        })
                    })
                })
            })
        } else {
            setetx("Subiendo Informacion")
            Firebase.database().ref("usuario/" + usuario.id).set(datos).then(()=>{
                setusuario(datos)
                setvis(false)
                navigation.navigate("Usuario")
            })
        }
    }

    let uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };
            // this helps us get a blob
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);

            xhr.send(null);
        });
    }

    let uploadToFirebase = (blob) => {
        return new Promise((resolve, reject) => {
            var storageRef = Firebase.storage().ref();
            storageRef.child(`${usuario.id}.jpg`).put(blob, {
                contentType: 'image/jpeg'
            }).then((snapshot) => {
                blob.close();
                resolve(snapshot);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    useEffect(() => {
        if (isFocused) {
            Firebase.database().ref("usuario/" + usuario.id).on("value", (snapshot) => {
                setdatos(snapshot.val())
                setdatos1(snapshot.val())
            })
        }
    }, [isFocused])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

            <Spinner 
                visible={vis}
                text={text}
            />


            <View style={{ flex: 1, backgroundColor: "#18191A", justifyContent: "center" }}>
                <View style={{ borderWidth: 2, borderColor: "#767676", marginHorizontal: 15, padding: 1, borderRadius: 10 }}>

                    <View style={styles.panel}>
                        <Text style={{ color: "white" }}>
                            Nombre
                    </Text>
                        <TextInput style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                            onChangeText={(text) => handleChangeText("nombre", text)}
                            value={datos.nombre} />
                    </View>

                    <View style={styles.panel}>
                        <Text style={{ color: "white" }}>
                            Apellido
                    </Text>
                        <TextInput style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                            onChangeText={(text) => handleChangeText("apellido", text)}
                            value={datos.apellido} />
                    </View>
                    <View style={styles.panel}>
                        <Text style={{ color: "white" }}>
                            Direccion
                    </Text>
                        <TextInput style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                            onChangeText={(text) => handleChangeText("direccion", text)}
                            value={datos.direccion} />
                    </View>

                    <View style={styles.panel}>
                        <Text style={{ color: "white" }}>
                            Email
                    </Text>
                        <TextInput style={{ borderBottomColor: "#767676", borderBottomWidth: 2, color: "white" }}
                            onChangeText={(text) => handleChangeText("correo", text)}
                            value={datos.correo} />
                    </View>

                    <View style={styles.panel}>
                        <TouchableOpacity style={styles.boton}
                            onPress={() => openImagePickerAsync()}>
                            <Text style={{ color: "white", textAlign: "center" }}
                                allowFontScaling={false}>
                                Cambiar la imagen de perfil
                        </Text>
                            <View style={{}}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100
                                    }}
                                    source={{ uri: datos.imagen }} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.panel}>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => {
                            setvis(true)
                            actualizar()
                        }}
                    >
                        <Text style={{ color: "white", textAlign: "center" }}
                            allowFontScaling={false}>
                            Aplicar Cambios
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.panel}>
                    <TouchableOpacity
                        style={styles.boton}
                        onPress={() => navigation.navigate("Usuario")}>
                        <Text style={{ color: "white", textAlign: "center" }}
                            allowFontScaling={false}>
                            Salir
                    </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    panel: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    boton: {
        borderWidth: 2,
        borderColor: "#767676",
        padding: 10,
        borderRadius: 100,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})

export default Editar