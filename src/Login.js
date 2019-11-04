import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 StatusBar,
	ScrollView ,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	AsyncStorage,
	Dimensions
} from 'react-native'
import { Actions } from 'react-native-router-flux';

// import console = require('console');


export default class LoginForm extends Component {

	state = {
		mobile: '',
		Password:'',
	  };

componentDidMount()
{

}

checkMobile(mobile) {
    this.setState({ mobileNumberStatus: false });
    const regexp = /^[789]\d{9}$/;
    if (regexp.test(mobile) === true) {
      this.setState({ mobileNumberStatus: true });
    } else {
      this.setState({ mobileNumberStatus: false });
    }
    this.setState({ mobile });
  }
  checkPassword(Password) {
    this.setState({ Password });
  }
  submit = () => {
    if (this.state.mobileNumberStatus === true) {
      this.CheckAuth();
    } else {
      Alert.alert('Alert', 'Please Enter a Valid Phone Number ');
    }
  }
  CheckAuth= async () => {
  
	try {
		const userArray = await AsyncStorage.getItem('User')
		if(userArray !== null) {
		  // value previously stored
		  let user =JSON.parse(userArray)
		  console.log("userArray",user)
		  if(this.state.mobile == user.mobile && this.state.Password == user.password){
			
			AsyncStorage.setItem('Name', user.name);
			Actions.dashboard()
		  }else{
			Alert.alert('Alert', 'Please Enter a Valid Detail ');
	
		  }
		}
	  } catch(e) {
		// error reading value
		Alert.alert('Alert', 'Kindly Register First ');

	  }
	
	
  }
  registerLink = () =>{
	  Actions.Register()
  }
	render() {
		const { container,textBox,input,errorInput ,label} = styles;
		
		const { mobileNumberStatus } = this.state

		return (
			<View style={container}>
			                <View style={{ backgroundColor: '#fff', height: StatusBar.currentHeight }} />
				<StatusBar backgroundColor={'rgba(146,104,13,0.4)'} translucent />
				<ScrollView contentContainerStyle={{ flexGrow: 1}} keyboardShouldPersistTaps='always'> 
				<View style={{		
					justifyContent: 'center',
					alignItems:'center',
					height:Dimensions.get('window').height,
					width:Dimensions.get('window').width,
					borderWidth:1,
					borderColor:'red'}}>
					<View style={textBox}>

						<Text style={label}>Enter your Mobile Number</Text> 
						<TextInput
								keyboardType="numeric"
								placeholderTextColor="#efefef"
								spellCheck={false}
								onSubmitEditing={this.signIn}
								autoCorrect={false}
								selectionColor={'#2c3e50'}
								value={this.state.mobile}
								onChangeText={mobile => this.checkMobile(mobile)}
								maxLength={10}
								style={mobileNumberStatus ? input: errorInput}
							/>
					  </View>
					<View style={textBox}>

					<Text style={label}>Enter Your Password</Text> 
					<TextInput
							placeholderTextColor="#efefef"
							spellCheck={false}
							onSubmitEditing={this.signIn}
							autoCorrect={false}
							selectionColor={'#2c3e50'}
							value={this.state.Password}
							onChangeText={Password => this.checkPassword(Password)}
							maxLength={10}
							style={input}
						/>
					</View>
					
	
					<View style={{ justifyContent: 'center', alignItems: 'center',marginVertical:20 }}>
							<TouchableOpacity onPress={() => this.submit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Login</Text>
							</TouchableOpacity>
							<Text>OR</Text>
							<TouchableOpacity onPress={() => this.registerLink()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Register</Text>
							</TouchableOpacity>
						</View>
				</View>

					</ScrollView>
			</View>
		)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	
	textBox:{
		paddingHorizontal: 50,

	},
	label: {
		fontSize: 17, marginVertical: 3, color: '#2c3e50',fontWeight:'500'
	},
	input: {
		width:Dimensions.get('window').width-50,
		borderWidth: 1, 
		fontSize: 16, 
		borderColor: '#cfcfcf', 
		borderRadius: 5, 
		paddingHorizontal: 2,
	},
	errorInput:{
		width:Dimensions.get('window').width-50,
		borderWidth: 1, 
		fontSize: 16, 
		borderColor: '#c0392b', 
		borderRadius: 5, 
		paddingHorizontal: 2,
	}
	
});