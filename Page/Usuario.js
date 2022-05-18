import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ActivityIndicator } from "react-native"

import DataContext from "../Context/Context"
import { useContext } from "react"

import { useIsFocused } from '@react-navigation/native';
import UsuarioContext from "../Context/UsuarioContext"
import Firebase from "../Database/Firebase"

import * as ImagePicker from 'expo-image-picker';

import Spinner from "../Componente/ModalSpinner"

const Usuario = ({ navigation }) => {

    const isFocused = useIsFocused();

    const { setdata } = useContext(DataContext)
    const { usuario } = useContext(UsuarioContext)
    const [datos, setdatos] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        imagen: "none",
        id: "",
        direccion: "",
        tipo: ""
    })
    const [modalVisible, setModalVisible] = useState(false);
    const [camIMg, setcamIMG] = useState(false);
    const [textEstado, settextEstado] = useState("cargando...");

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert("permisos para aceder ala camara son requeridos")
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync()
        const uri = pickerResult.uri

        if (!pickerResult.cancelled) {
            setcamIMG(true)
            settextEstado("Cargando Imagen...")
            uriToBlob(uri).then((blod) => {
                uploadToFirebase(blod, pickerResult).then(() => {
                    settextEstado("Subiendo Imagen...")
                    Firebase.storage().ref().child(usuario.id + ".jpg").getDownloadURL().then((data) => {
                        Firebase.database().ref("usuario/" + usuario.id + "/imagen").set(data).then(() => {
                            settextEstado("Subida Exitosa")
                            setcamIMG(false)
                        })
                    })
                })
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
            setdata("Usuario")
            setdatos(usuario)
        }
    }, [isFocused])
    
    const BotonTrabajador = () => {
        if (datos.tipo == "Trabajador") {
            return (
                <TouchableOpacity
                    style={{
                        borderWidth: 3,
                        borderColor: "#767676",
                        borderRadius: 20,
                        marginHorizontal: "5%"
                    }}
                    onPress={() => navigation.navigate("EditarTrabajador")}>

                    <Text
                        style={{
                            color: "white",
                            fontSize: 15,
                            paddingHorizontal: 6,
                            paddingVertical: 10,
                            textAlign: "center"
                        }}
                        allowFontScaling={false}> Perfil como trabajador </Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity

                    style={{
                        borderWidth: 3,
                        borderColor: "#767676",
                        borderRadius: 20,
                        marginHorizontal: "5%"
                    }}
                    onPress={() => navigation.navigate("Trabajos")}>

                    <Text
                        style={{
                            color: "white",
                            fontSize: 15,
                            paddingHorizontal: 6,
                            paddingVertical: 10,
                            textAlign: "center"
                        }}
                        allowFontScaling={false}> Solicitar Trabajo </Text>
                </TouchableOpacity>
            )
        }

    }
    

    return (
        <View style={{ flex: 1, backgroundColor: "#18191A" }}>
            <Spinner
                visible={camIMg}
                text={textEstado}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: '#18191A' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                openImagePickerAsync();
                            }}>
                            <Text style={styles.textStyle}>Cambiar Imagen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: '#18191A' }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Salir</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>



            <View style={{
                marginVertical: 15,
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 100
                        }}
                        source={{ uri: datos.imagen }}
                    />
                </TouchableOpacity>


            </View>


            <View style={{

                justifyContent: "center",
                alignItems: "center"
            }}>



                <View style={styles.panel_info}>
                    <Text style={styles.texto} allowFontScaling={false}>
                        Nombre: {datos.nombre}
                    </Text>
                    <View style={styles.linea} />
                    <Text style={styles.texto} allowFontScaling={false}>
                        Apellido: {datos.apellido}
                    </Text>
                    <View style={styles.linea} />
                    <Text style={styles.texto} allowFontScaling={false}>
                        Tipo de cuenta: {datos.tipo}
                    </Text>
                    <View style={styles.linea} />
                    <Text style={styles.texto} allowFontScaling={false}>
                        Email: {datos.correo}
                    </Text>
                    <View style={styles.linea} />
                    <Text style={styles.texto} allowFontScaling={false}>
                        Direccion: {datos.direccion}
                    </Text>
                </View>
            </View>
            <View style={{
                backgroundColor: "#18191A",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: "5%",
                marginHorizontal: "5%"
            }} >
                <TouchableOpacity style={styles.boton}
                    onPress={() => {
                        Firebase.auth().signOut().then(() => {
                            navigation.navigate("Login")
                        })
                    }}>
                    <Text style={styles.texto} allowFontScaling={false}>Salir de la cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate("Editar")}>
                    <Text style={styles.texto} allowFontScaling={false}> Editar Cuenta </Text>
                </TouchableOpacity>

            </View>


            <BotonTrabajador />
        </View>
    )
}

const styles = StyleSheet.create({
    imagen_perfil: {

        borderRadius: 100,
        margin: 15
    },
    texto: {
        color: "white",
        fontSize: 15,
        paddingHorizontal: 6,
        paddingVertical: 10
    },
    linea: {
        height: 3,
        backgroundColor: "#767676"
    },
    panel_info: {

        borderColor: "#767676",
        borderWidth: 3,
        borderRadius: 20,
        width: "90%",
    },
    boton: {
        borderWidth: 3,
        borderColor: "#767676",
        borderRadius: 20
    },


    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(24,25,26,0.55)"

    },
    modalView: {
        margin: 10,
        backgroundColor: '#18191A',
        borderRadius: 20,
        padding: 10,
        borderWidth: 3,
        borderColor: "#767676",
    },

    openButton: {
        backgroundColor: '#18191A',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        borderWidth: 3,
        borderColor: "#767676",
        marginVertical: 10,
        marginHorizontal: 20
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default Usuario