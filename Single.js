import { View, Text, StyleSheet, TouchableOpacity,TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Single({todo, setTodos, todos}) {
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState(todo.text)

    useEffect(() => {
      AsyncStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    

const editHandle=()=>{
if(!edit)
setEdit(!edit)

else{
        setEdit(!edit);
        setTodos(
          todos.map((t) =>
            t.id === todo.id
              ? {
                  id: t.id,
                  text: editText,
                }
              : t
          )
        )
        AsyncStorage.setItem("todos", JSON.stringify(todos));
      }
    
}

const deleteHandle=(id)=>{
    setTodos(todos.filter((t)=>t.id!==id))

}


  return (
    <View style={styles.todo}>

    <TouchableOpacity>
    <AntDesign style={styles.action} name="edit" size={24} color="black" onPress={editHandle} />
    </TouchableOpacity>

    {!edit?<Text style={styles.txt}>{todo.text}</Text>:<TextInput style={styles.inp} value={editText}
    onChangeText={(text)=>setEditText(text)}
    
    />}



    <TouchableOpacity> 
    <AntDesign name="delete" size={24} color="black" 
    onPress={()=>deleteHandle(todo.id)} />
    </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    todo: {
        flexDirection: "row",
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 50,
      },
    action:{
       
    },
    txt:{
        flex: 1,
        fontSize: 18,
        paddingVertical: 3,
        paddingHorizontal: 5,

    },
    inp:{
        flex:1,
        fontSize:18,
        borderColor:"grey",
        borderRadius:50,
        borderWidth:1,
    }
})