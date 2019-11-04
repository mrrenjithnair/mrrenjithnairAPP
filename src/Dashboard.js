import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 StatusBar,
	ScrollView ,
	Text,
	TextInput,
	TouchableOpacity,
    Alert,
    Dimensions,
    AsyncStorage,
    ToastAndroid
} from 'react-native'
import { Actions } from 'react-native-router-flux';
// import console = require('console');


export default class Dashboard extends Component {

    state = {
        user:[]
      };
      
     componentDidMount() {

     this.CheckAuth();  
     
      }
    CheckAuth= async () => {
        try {
            const userArray = await AsyncStorage.getItem('User')
            if(userArray !== null) {
              // value previously stored
              let user =JSON.parse(userArray)
              console.log("userArray",user)
             this.setState({user})
            }
          } catch(e) {
            // error reading value
    
          }
        
      }
      editPage = async () => {
          Actions.Register({user:this.state.user})
      }
      signOut = async () => {
        try {
          ToastAndroid.showWithGravityAndOffset('please wait, logging you out !', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 30);
          // await GoogleSignin.revokeAccess();
          // await GoogleSignin.signOut();
          try {
            // this.setState({ user: null }); // Remember to remove the user from your app's state as well
          } catch (error) {
            console.error(error);
          }
          const user = await AsyncStorage.getItem('user');
          if (user !== null || user !== undefined) {
            const keys = ['Name', 'user'];
            await AsyncStorage.multiRemove(keys);
          }
          Actions.login();
          ToastAndroid.showWithGravityAndOffset('Logged Out Successfully !', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 30);
        }
        catch (error) {
          console.error('error in logout', error);
        }
      }
    render() {
		
		const { container} = styles;

		return (
            <View style={container}>
            <View style={{ backgroundColor: '#fff', height: StatusBar.currentHeight }} />
                <StatusBar backgroundColor={'rgba(146,104,13,0.4)'} translucent />
                <View style={{		
					justifyContent: 'center',
					alignItems:'center',
					height:Dimensions.get('window').height,
					width:Dimensions.get('window').width,
					borderWidth:1,
					borderColor:'red'}}>
                    <View style={{justifyContent:'center',alignContent:'center'}}>
                        <Text style={{fontSize:22,textAlign:'center'}}> Hello {this.state.user.name || 'user'}</Text>
                        <Text style={{fontSize:18,textAlign:'center'}}> Your Mobile Number is {this.state.user.mobile || 'No mobile'} and Email Id is {this.state.user.email || 'No email'}</Text>
                        </View>
                        <View style={{ flexDirection:'row',marginVertical:20 }}>
							<TouchableOpacity onPress={() => this.editPage()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Edit</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.signOut()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#c0392b', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>signOut</Text>
							</TouchableOpacity>
						</View>
                </View>
            </View>
            )
        }

}
const styles = StyleSheet.create({
	container: {
		flex: 1,

	},

});