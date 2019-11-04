import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 StatusBar,
	ScrollView ,
	Text,
	TextInput,
	TouchableOpacity,
	Alert
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
  CheckAuth= () => {
	  if(this.state.mobile == '8080817552' && this.state.Password == '1234'){
		Actions.dashboard()
	  }else{
		Alert.alert('Alert', 'Please Enter a Valid Detail ');

	  }
  }
	render() {
		const { container,textBox,input,errorInput ,label} = styles;
		
		const { mobileNumberStatus } = this.state

		return (
			<View style={container}>
			                <View style={{ backgroundColor: '#fff', height: StatusBar.currentHeight }} />
				<StatusBar backgroundColor={'rgba(146,104,13,0.4)'} translucent />
				<ScrollView contentContainerStyle={{ flexGrow: 1}} keyboardShouldPersistTaps='always'> 
				<View style={{justifyContent:"center",marginVertical:50}}>
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
							keyboardType="text"
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
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<TouchableOpacity onPress={() => this.submit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Submit</Text>
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
		paddingHorizontal: 30,
		justifyContent: 'center'
	},
	textBox:{
		paddingHorizontal: 2,

	},
	label: {
		fontSize: 17, marginVertical: 3, color: '#2c3e50',fontWeight:'500'
	},
	input: {
		borderWidth: 1, 
		fontSize: 16, 
		borderColor: '#cfcfcf', 
		borderRadius: 5, 
		paddingHorizontal: 2,
	},
	errorInput:{
		borderWidth: 1, 
		fontSize: 16, 
		borderColor: '#c0392b', 
		borderRadius: 5, 
		paddingHorizontal: 2,
	}
	
});