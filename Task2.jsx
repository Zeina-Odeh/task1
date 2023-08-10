import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userEmail } = route.params;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
      const user = users.find((user) => user.email === userEmail);

      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userEmail]);

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.title}>User Info</Text>
          <Text style={styles.name}>{userData.name}</Text>

          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>ID:</Text> {userData.id}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>Email:</Text> {userData.email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>Username:</Text> {userData.username}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>Address:</Text> {userData.address.street}, {userData.address.suite}, {userData.address.city}, {userData.address.zipcode}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>Phone:</Text> {userData.phone}</Text>
          </View>
         
          <View style={styles.userInfo}>
           <Text style={styles.label}>
             <Text style={styles.boldText}>Website:</Text>{' '}
               <TouchableOpacity style={styles.handleCreate}>
             <Text style={styles.linkText}>{userData.website}</Text>
               </TouchableOpacity>
           </Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.label}><Text style={styles.boldText}>Company:</Text> {userData.company.name}</Text>
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>User not found</Text>
      )}
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();

      const user = users.find((user) => user.email === email);

      if (user) {
        navigation.navigate('UserScreen', { userEmail: user.email });
      } else {
        alert('User not found');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Error fetching users:', error);
    }
  };

  return (
    
    
    <View style={styles.container}>
      <View style={styles.login}>
        <Image source={require('./user.png')} style={styles.logo} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>

          <View style={styles.create}>
            <Text>
              Don't have an account?{' '}
              <TouchableOpacity style={styles.handleCreate}>
                <Text style={{ fontWeight: 'bold' }}>Create</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
        </View>
      </View>   
    
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },


  login: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 280,
  },

  logo: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },

  form: {
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#e6e4e4',
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 15,
  },

  forgotPassword: {
    textAlign: 'center',
    padding: 5,
    marginTop: 10,
    fontSize: 12,
  },

  loginBtn: {
    backgroundColor: '#ff00b3',
    borderRadius: 15,
    padding: 9,
    width: 200,
    alignItems: 'center',
    marginTop: 10,
  },

  create: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    lineHeight: 5, 
    marginTop: 14,
  },

  profileContainer: {
    backgroundColor: '#e9b2e0',
    padding: 20,
    borderRadius: 20,
    width: '70%',
    height: '70%',
  },

  title: {
    color: '#581d39',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
  },

  name: {
    marginBottom: 20,
    marginTop: -15,
    color: '#641d20',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  userInfo:{
    marginBottom: 10,
  },

  boldText: {
    fontWeight: 'bold',
  },

  linkText: {
    color: 'blue', 
  },

  backButton: {
    backgroundColor: '#d67bc2',
    marginTop: 20,
    marginLeft: 'auto',
    padding: 13,
    alignItems: 'flex-end',
    borderWidth: 1.5,
    borderColor: '#641d20',
    borderRadius: 15,
  },

  backButtonText: {  
    color: '#581d39',
  },
});

export default App;
