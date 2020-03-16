import React, { Component } from 'react';
import {Text,View,StyleSheet,Image,FlatList, ImageBackground, TouchableOpacity,ScrollView,Picker} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class picker extends React.Component {
    static navigationOptions ={
        headerShown:false
    }
    constructor(props) {
        super(props);
        this.state = {
            language: 'Select',
          };
      }

    render() {  
        return (  
            <View style={styles.container}>
<Picker
  selectedValue={this.state.language}
  style={{height: 50, width: 300,alignSelf:'center'}}
  onValueChange={(itemValue, itemIndex) =>
    
    Actions.mainScreen({url:itemValue})
   
  }>
  <Picker.Item label="Please chose a type of news" value="http://newsapi.org/v2/top-headlines?country=tr&apiKey=79af8a0825ba4443adf9c1f76f8913cb" /> 
  <Picker.Item label="Turkey" value="http://newsapi.org/v2/top-headlines?country=tr&apiKey=79af8a0825ba4443adf9c1f76f8913cb" />
  <Picker.Item label="Bitcoin" value="http://newsapi.org/v2/everything?q=bitcoin&apiKey=79af8a0825ba4443adf9c1f76f8913cb" />
</Picker>
</View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
      flex: 5,
      backgroundColor: "yellow",
      flexDirection: 'row',
      alignItems:'center'
      
      
  }});