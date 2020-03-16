import React, { Component } from 'react';
import {Text,View,StyleSheet,Image,FlatList, ImageBackground, TouchableOpacity,ScrollView} from 'react-native'
import BackButton from './BackButton/BackButton'
import StarRating from 'react-native-star-rating';
import { Linking } from 'react-native';
 export default class Details extends React.Component {
    static navigationOptions = ({ navigation }) => {
        
        return {
            headerShown:'false', 
          headerTransparent: 'true',
          headerLeft: (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          )
        };
      };
  constructor(props) {
    super(props);
    this.state = {
        starCount: 3.5
      };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {  
    return (    
        <View style={styles.container}>
          <Image source={{uri: this.props.image}} style={styles.avatar} />
          <TouchableOpacity>
          <Image source={require('./assets/book-mark.png')} style={styles.profile} />
          </TouchableOpacity>
          <StarRating
        disabled={false}
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gold'}
        starSize={30}
        
      />
          <Text style={styles.today}>{this.props.text}</Text>
          <Text style={{color: 'grey'}}>{this.props.date}</Text>
          <ScrollView>
          <Text style={{fontSize:20}}>{this.props.detail}</Text>
          <Text style={{color: 'blue',textAlign:"center"}}
      onPress={() => Linking.openURL(this.props.url)}>
  Continue to Read
</Text>
          </ScrollView>
        </View>
       
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
},
  avatar: {
    width:'100%',
    height: '30%',
    borderRadius:7,
    marginRight: 16
},
carousel:{
  width:300,
  height:300,
  borderRadius:7
  
},
feed: {
  marginHorizontal: 16
},
slide: {
  overflow: 'visible', // for custom animations
  paddingVertical: 30
},
sliderContentContainer: {
  paddingVertical: 10 // for custom animation
  
},
exampleContainer: {
  paddingVertical: 30
},
subtitle: {
  marginTop: 120,
  width: 0,
  flexGrow: 1,
  flex: 1,
  color: 'white',
  fontSize: 23,
  fontStyle: 'italic',
  textAlign: 'center'

},
today:{
 fontSize:30
},
info:{
  flexDirection: "column",
  alignItems: "flex-start", 
  width: 0,
  flexGrow: 1,
  flex: 1
},
profile: {
  width: 50,
  height: 50,
  borderRadius: 25,
  marginTop:-30,
  marginLeft:300
},


});
