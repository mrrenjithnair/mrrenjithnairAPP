import React, { Component } from 'react'
import { StyleSheet,
	 View,
	 StatusBar,
	ScrollView ,
	Text,
	TextInput,
	TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux';

// import console = require('console');


export default class Register extends Component {

	state = {
        mobile:'',
        name:'',
        email:'',
        password:'',
        username:'',
        creatingUser:false,
        editing:false
      };
      
componentDidMount()
{
    if(this.props.user){
        this.getuserEdit(this.props.user);
        this.setState({editing:true})
        }
}

getuserEdit(user){

this.setState({
    mobile:user.mobile,
    name:user.name,
    email:user.email,
    password:user.password,
    username:user.username,

})
}

checkMobile(mobile) {
    this.setState({ mobileNumberError: true });
    const regexp = /^[789]\d{9}$/;
    if (regexp.test(mobile) === true) {
      this.setState({ mobileNumberError: false });
    } else {
      this.setState({ mobileNumberError: true });
    }
    this.setState({ mobile });
  }
  checkPassword(Password) {
    this.setState({ Password });
  }



  checkEmail(email) {
    this.setState({ emailError: true });
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regexp.test(email) === true) {
      this.setState({ emailError: false });
    } else {
      this.setState({ emailError: true });
    }
    this.setState({ email });
  }

  checkPassword(Password) {
    this.setState({ Password });
  }
  submit = async () => {
     await this.checkEmail(this.state.email);
     await this.checkMobile(this.state.mobile);
    if (this.state.mobileNumberError === true && this.state.emailError === true) {
        
      this.createUser();
    } else {
      Alert.alert('Alert', 'You are Entering a inValid Phone Number or email');
    }
  }
  createUser= () => {
      this.setState({creatingUser:true})
	const userBody ={
        name : this.state.name,
        mobile : this.state.mobile,
        email : this.state.email,
        username : this.state.username,
        password : this.state.password,
    }
    console.log("userndata" ,userBody)

 
    if(this.state.creatingUser === true){
        AsyncStorage.setItem('User', JSON.stringify(userBody));
      Alert.alert('Alert', 'User Created');

        Actions.login();
    }
  }
  editSubmit= () => {
    this.setState({creatingUser:true})
  const userBody ={
      name : this.state.name,
      mobile : this.state.mobile,
      email : this.state.email,
      username : this.state.username,
      password : this.state.password,
  }
  console.log("userndata" ,userBody)


  if(this.state.creatingUser === true){
      AsyncStorage.setItem('User', JSON.stringify(userBody));
      Alert.alert('Alert', 'User Updated');
      Actions.dashboard();
  }
}
	render() {
		const { container,textBox,input,errorInput ,label} = styles;
		
		const { mobileNumberError,emailError ,editing} = this.state

		return (
			<View style={container}>
			                <View style={{ backgroundColor: '#fff', height: StatusBar.currentHeight }} />
				<StatusBar backgroundColor={'rgba(146,104,13,0.4)'} translucent />
				<ScrollView contentContainerStyle={{ flexGrow: 1}} keyboardShouldPersistTaps='always'> 
				<View style={{justifyContent:"center",marginVertical:50}}>

                <View style={textBox}>

                    <Text style={label}>Enter Your Name</Text> 
                    <TextInput
                            placeholderTextColor="#efefef"
                            spellCheck={true}
                            autoCorrect={true}
                            selectionColor={'#2c3e50'}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            style={input}
                        />
                    </View>


					<View style={textBox}>

						<Text style={label}>Enter your Mobile Number</Text> 
						<TextInput
								keyboardType="numeric"
								placeholderTextColor="#efefef"
								spellCheck={true}
								autoCorrect={true}
								selectionColor={'#2c3e50'}
								value={this.state.mobile}
								onChangeText={mobile => this.checkMobile(mobile)}
								maxLength={10}
								style={mobileNumberError ? errorInput : input}
							
							/>
					  </View>
                      <View style={textBox}>

                        <Text style={label}>Enter Your email</Text> 
                        <TextInput
                                placeholderTextColor="#efefef"
                                spellCheck={true}
                                autoCorrect={true}
                                selectionColor={'#2c3e50'}
                                value={this.state.email}
                                onChangeText={(email) => this.checkEmail(email)}
								style={emailError ? errorInput : input}

                            />
                        </View>                

                        <View style={textBox}>

                        <Text style={label}>Enter Your username</Text> 
                        <TextInput
                                placeholderTextColor="#efefef"
                                spellCheck={true}
                                autoCorrect={true}
                                selectionColor={'#2c3e50'}
                                value={this.state.username}
                                onChangeText={(username) => this.setState({ username })}
                                maxLength={10}
                                style={input}
                            />
                        </View>

                        <View style={textBox}>

                        <Text style={label}>Enter Your password</Text> 
                        <TextInput
                                placeholderTextColor="#efefef"
                                spellCheck={true}
                                autoCorrect={true}
                                selectionColor={'#2c3e50'}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({ password })}
                                style={input}
								onSubmitEditing={this.submit}
                                secureTextEntry={true} 

                            />
                        </View>



				
					<View style={{ justifyContent: 'center', alignItems: 'center' ,marginVertical:20}}>
                    {editing ?	
                        <TouchableOpacity onPress={() => this.editSubmit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#8e44ad', borderColor: '#dcdcdc' }}>
                        <Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Submit</Text>
                    </TouchableOpacity>
                    :	<TouchableOpacity onPress={() => this.submit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#8e44ad', borderColor: '#dcdcdc' }}>
								<Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Register</Text>
							</TouchableOpacity>}
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
        justifyContent: 'center',
		backgroundColor:'#ecf0f1'
        
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