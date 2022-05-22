import React, { useEffect } from "react"
import { View, StyleSheet, Animated } from "react-native"
import Navigation from "../Componente/Navigation"
import Inicio from "./Inicio"
import Usuario from "./Usuario"
import Chat from "./Chat"
import ListaUsuarios from "./ListaUsuarios"
import PerfilTrabajador from "./PerfilTrabajador"
import ChatTrabajador from "./ChatTrabajador"
import Login from "./Login"
import Registro from "./Registro"
import Editar from "./Editar"
import Tipo from "./ImagenYTipo"
import Trabajos from "./Trabajos"
import EditarTrabajador from "./EditarTrabajador"
import ComentariosTrabajador from "./ComentariosTrabajador"
import ServicioPendiente from "./ServicioPendiente"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import servicioFinalizado from "./servicioFinalizado"

const Stack = createStackNavigator();

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 1
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};
const Principal = () => {


  const ref = React.useRef(null);

  return (
    <View style={styles.contenedor} >

      <NavigationContainer ref={ref}  >
        <MyStack />
        <Navigation r={ref} />

      </NavigationContainer>

    </View>
  )
}

function MyStack() {

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Tipo"
        component={Tipo}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Trabajos"
        component={Trabajos}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Pendiente"
        component={ServicioPendiente}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Finalizado"
        component={servicioFinalizado}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Usuario"
        component={Usuario}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Editar"
        component={Editar}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="EditarTrabajador"
        component={EditarTrabajador}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ cardStyleInterpolator: forFade }}
      />
      <Stack.Screen
        name="Lista_Usuarios"
        options={{ cardStyleInterpolator: forFade }}
        component={ListaUsuarios}
      />
      <Stack.Screen
        name="Perfil_Trabajador"
        options={{ cardStyleInterpolator: forFade }}
        component={PerfilTrabajador}
      />
      <Stack.Screen
        name="Chat_Trabajador"
        options={{ cardStyleInterpolator: forFade }}
        component={ChatTrabajador}
      />
      <Stack.Screen
        name="Comentarios_Trabajador"
        options={{ cardStyleInterpolator: forFade }}
        component={ComentariosTrabajador}
      />
    </Stack.Navigator>
  );
}

export default Principal

const styles = StyleSheet.create({

  contenedor: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#18191A",
  },
  textos: {
    color: "#fff",
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 30
  },
  barra: {
    backgroundColor: "#767676",
    height: 30
  },
  linea: {
    height: 13,
    backgroundColor: "#767676"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },

})