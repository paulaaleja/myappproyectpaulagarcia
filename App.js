import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Modal from "./components/Modal";
import { useState } from "react";

export default function App() {
  const [textItem, setTextItem] = useState("");
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [itemSelected, setItemSelected] = useState({});

  const onHandleChange = (t) => setTextItem(t);

  const addItem = () => {
    setList((currentState) => [
      ...currentState,
      { id: Math.random().toString(), value: textItem },
    ]);
    setTextItem("");
    console.log("Probando desde Chrome");
  };

  const selectedItem = (id) => {
    console.log(id);
    //setItemSelected(list.filter((item) => item.id === id)[0]);
    setItemSelected(list.find((item) => item.id === id));
    setModalVisible(true);
  };

  const deleteItem = () => {
    console.log(itemSelected);
    setList((currentState) =>
      currentState.filter((item) => item.id !== itemSelected.id)
    );
    setItemSelected({});
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectedItem(item.id)}>
      <Text>{item.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Lista de Medicamentos para solicitar</Text> 
      
      <View style={styles.inputcontainer}>
        <TextInput
          placeholder="Escriba su medicamento"
          placeholderTextColor="white"
          style={styles.inputStyle}
          value={textItem}
          onChangeText={onHandleChange}
        />
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text> + </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal isVisible={modalVisible} actionDeleteItem={deleteItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    paddingTop: 100,
  },
  inputcontainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  inputStyle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 250,
  },
  button: {
    backgroundColor: "lightgreen",
    height: 35,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});