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
    this.setState({ mobileNumberStatus: false });
    const regexp = /^[789]\d{9}$/;
    if (regexp.test(mobile) === true) {
      this.setState({ mobileNumberStatus: true });
    } else {
      this.setState({ mobileNumberStatus: false });
    }
    this.setState({ mobile });
  }


  checkEmail(email) {
    this.setState({ emailStatus: false });
    const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regexp.test(email) === true) {
      this.setState({ emailStatus: true });
    } else {
      this.setState({ emailStatus: false });
    }
    this.setState({ email });
  }

  checkPassword(Password) {
    this.setState({ Password });
  }
  submit = async () => {
     await this.checkEmail(this.state.email);
     await this.checkMobile(this.state.mobile);
    if (this.state.mobileNumberStatus === true && this.state.emailStatus === true) {
        
      this.createUser();
    } else {
      Alert.alert('Alert', 'Please Enter a Valid Phone Number and email');
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
		
		const { mobileNumberStatus,emailStatus ,editing} = this.state

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
								style={mobileNumberStatus ? input: errorInput}
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
								style={emailStatus ? input: errorInput}

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

                            />
                        </View>



				
					<View style={{ justifyContent: 'center', alignItems: 'center' ,marginVertical:20}}>
                    {editing ?	
                        <TouchableOpacity onPress={() => this.editSubmit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
                        <Text style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5 ,color:'#fff',}}>Submit</Text>
                    </TouchableOpacity>
                    :	<TouchableOpacity onPress={() => this.submit()} activeOpacity={0.5} style={{ height: 50, width: 150, borderRadius: 5, justifyContent: 'center', borderWidth: 2,backgroundColor:'#673ab7', borderColor: '#dcdcdc' }}>
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