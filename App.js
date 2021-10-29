import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var list=[];
const Startscreen = ({navigation}) => {
  const[getop, setop] = useState(""); 
  const[getdp, setdp] = useState("");
  const[getsave, setsave] = useState(0);
  const[getfprice, setfprice] = useState(0);  
  const[getmessage1, setmessage1] = useState(""); 
  const[getmessage2, setmessage2] = useState("");

  const calculate = (op, dp) =>{
    if(op>=0 && dp>=0 && dp<=100){
    setop(op);
    setdp(dp);
    let p = (dp/100)* op;  
    setfprice((op - p).toFixed(2));
    setsave(p.toFixed(2));
    setmessage1("");
    setmessage2("");
    }
    else if(isNaN(op)){
      setmessage1("Original Price should be a positive number");
    }
    else if(isNaN(dp)){
      setmessage2("Discount % should be a positive number");
    }
    
  }
  const save = ()=>{
      var obj =  {key: Math.random().toString() ,originalprice:getop, discount:getdp, finalprice:getfprice};
      list.push(obj); 
      setdp("");
      setop("");
  }
  
 navigation.setOptions({
 headerRight: () => <Button color='#000' title="HISTORY" onPress={() => navigation.navigate('historyscreen'
)}/>
        });
        
  return(
    <View style={styles.container}>
         <View style={styles.bigContainer}> 

      <TextInput style={styles.inputText}  
      placeholder= "Enter original price" 
     // placeholderTextColor="#fff"  
      onChangeText= {op => calculate(op, getdp)}
      value= {getop} 
      />
      <Text style={styles.message}> {getmessage1} </Text> 
      <TextInput style={styles.inputText}  
      placeholder= "Enter discount percentage" 
      //placeholderTextColor="#fff"  
      onChangeText= {dp => calculate(getop, dp)}
      value = {getdp}
      />
      <Text style={styles.message} > {getmessage2} </Text> 

 
      <View style={styles.outcontainer}>
      <Text style= {styles.out}> Final Price: </Text> 
      <Text style= {styles.out}> {getfprice} </Text> 
      </View>
      
      <View style={styles.outcontainer}>
      <Text style= {styles.out}> You Saved: </Text> 
      <Text style= {styles.out}> {getsave} </Text> 
      </View>

      <View style={styles.btn}> 
      <Button color='black' disabled={getop=="" || getdp==""} title="Save" onPress = {() => save(this)}/> 
      </View>
      
      </View>
    </View>
  );
}

const Historyscreen = ({navigation}) => {
  const[getl, setl] = useState(list);
  const remove= (key) => {
    var l = getl.filter(item => item.key!=key);
    setl(l);
    list = l;
  }
  
  navigation.setOptions({
      headerRight: () => (
                <Button
                  color='black'
                  title="CLEAR"
                  onPress={() => Alert.alert(
                                "You are deleting history",
                                "Are you sure you want to delete the history?",
                      [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "Yes", onPress: () =>{
                            setl([]);
                            list = [];
                    }  } 
                  ]
                )}
                />
        )
        
        });
        
  return(
    <View style={styles.container}> 
    <View style={ styles.list}>
    <Text style={{fontWeight: 'bold'}}> Original Price </Text> 
    <Text style={{fontWeight: 'bold'}}> Discount% </Text>
    <Text style={{fontWeight: 'bold'}}> Final Price </Text> 
    <Text > </Text> 
    </View>
    <ScrollView >
    {getl.map((item) => 
    <TouchableOpacity key={item.key} onPress= {() => remove(item.key)}>
    <View style={styles.list}>
      <Text style={{lineHeight: 50, marginLeft: '10%'}}> {item.originalprice} </Text>
      <Text style={{lineHeight: 50, marginLeft: '10%'}}> {item.discount}% </Text>
      <Text style={{lineHeight: 50, marginLeft: '10%'}}> {item.finalprice} </Text>
       <Text style={styles.cross}> X </Text>
    </View>
    </TouchableOpacity>
    )}
    </ScrollView>
    </View>
  ); 
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator  initialRouteName={"startscreen"}> 
          <Stack.Screen
            name= "startscreen"
            component= {Startscreen}
             options={()=> ({
            headerTitle: "Discount Calculator",      
            })}
          />
          <Stack.Screen 
          name="historyscreen"
          component= {Historyscreen}
          options={{headerTitle: "History"}}
          />
      </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,
  },
  inputText:{
    borderColor: 'black',
    borderBottomWidth: 3, 
    borderBottomColor: 'black', 
    padding: 2,
    outline: 'none', 
    marginTop: 25,
    color: 'black',
    fontFamily: 'trebuchet MS',
  },
   message: {
    color: 'red', 
  },
   outcontainer: {
    width: '100%',
    backgroundColor: 'black',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    padding: 10, 
  },
   out :{
    fontSize: 17,
    color: 'white',
    fontFamily: 'trebuchet MS',
  },
   bigContainer: {
    width: '95%',
    padding: 10,
    height: '90%',
  },
  list:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    
  },
  btn: {
      marginTop: 10,
  },
  cross:{
     textAlign: 'center',
     fontWeight: 'bold', 
     borderColor: 'black', 
     borderWidth: 1,
     borderStyle: 'solid', 
     borderRadius: 50 ,
     fontSize: 18,
  }
});

