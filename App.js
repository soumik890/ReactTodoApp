import React, {useState, useEffect} from "react"
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, ScrollView, FlatList  } from "react-native"
import { Image } from "react-native"
import {icon} from "./assets/icon.png" 
import Single from "./Single"
import AsyncStorage from "@react-native-async-storage/async-storage";

const App=()=>{
  const [todo, setTodo]=useState("")
  const [todos, setTodos]=useState([])

  const addTodo=()=>{
    if (!todo) return

    setTodos([...todos, {id: Date.now(), text:todo}])
    setTodo("")
  }
  const fetchTodos = async () => {
    const data = await AsyncStorage.getItem("todos");
    if (data) setTodos(JSON.parse(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);
return(
  <View style={style.container}>
    <Text style={style.heading}>Todo-list App</Text>
    <Text style={style.small}>By Soumik Chakraborty</Text>
    <View style={style.inpcont}>
    <TextInput
    value={todo}
    onChangeText={(text)=>setTodo(text)}
    placeholder="Enter a todo"
    style={style.input}
    />
    </View>
    <TouchableOpacity style={style.button} onPress={addTodo}>
      <Text style={style.buttontxt}>Save It!!</Text>
    </TouchableOpacity>
     {/* <View style={{ width: "100%", marginTop: 10 }}>
      <ScrollView>
      {todos.map((todo)=>(

        <Text key={todo.id}>{todo.text}</Text>
      ))}
    </ScrollView>  
    </View>  */}
    <View style={{ width: "100%", marginTop: 10 }}>
    <FlatList
    data={todos}
    renderItem={({item})=> (<Single
    todo={item} todos={todos} setTodos={setTodos}/>
    )}
    keyExtractor={(item)=>item.id.toString()}
    />
    </View>
  <StatusBar style="auto"/>
</View>

)}

export default App

const style=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"yellow",
    
  },
  heading:{
    marginTop:50,
    marginVertical:5,
    fontSize:50,
    fontWeight: "bold",
    textDecorationLine: 'underline',
  },
  inpcont:{
    flexDirection: "row",
    alignItems:"center",
    marginHorizontal:20,

  },
  input:{
    flex:1,
    marginTop: 50,
    fontSize:20,
    backgroundColor:"white",
    paddingHorizontal:20 ,
    paddingVertical:20 ,
    borderRadius:50,
    shadowColor:"black",
    elevation:13,
  },
  button:{
    marginTop: 40,
    paddingHorizontal:20 ,
    paddingVertical:20 ,
    borderRadius:50,
    backgroundColor:"black"
    
  },
  buttontxt:{
    fontSize:20,
    color:"white"
  },
  small:{
    
    marginVertical: 20,
    fontSize:20,
    fontWeight: "bold",

  },
})
