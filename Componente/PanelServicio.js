import { View, StyleSheet, Text } from "react-native";

const PanelServicio = ({ titulo, descripcion, estado }) => {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{titulo}</Text>
      <Text style={styles.texto}>{estado}</Text>
      <Text style={styles.texto}>{descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: "#fff",
    margin: 1,
  },

  contenedor: {
    marginVertical: 10,
    borderColor: "#767676",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
  },
});

export default PanelServicio;
