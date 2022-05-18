import React from "react"
import {Modal, View, ActivityIndicator, Text, StyleSheet} from "react-native"

const ModalSipnner = ({visible, text}) =>{
    return (
        <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View>
                    <ActivityIndicator
                        size={50} color="#767676"
                    />
                    <Text style={{color:"white", margin:20}} allowFontScaling={false}>
                        {text}
                    </Text>
                </View>
            </View>
        </View>
    </Modal>
    )
}


const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor: "rgba(24,25,26,0.55)",
        flexDirection:"row",
        
    },
    modalView: {
        backgroundColor: '#18191A',
        borderRadius: 20,
        padding: 10,
        borderWidth: 3,
        borderColor: "#767676",
        
    },

})

export default ModalSipnner