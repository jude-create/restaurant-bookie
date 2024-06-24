import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ArrowSmallLeftIcon from 'react-native-heroicons/solid/ArrowSmallLeftIcon'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState(""); 
     const [phoneNumber, setPhoneNumber] = useState("");
     const [confirmPassword, setConfirmPassword] = useState('');
     const [passwordsMatch, setPasswordsMatch] = useState(true);

     const checkPasswordsMatch = () => {
        if (password === confirmPassword) {
          setPasswordsMatch(true);
        } else {
          setPasswordsMatch(false);
        }
      };

      const signUp = async () => {
        try {
          // Check if passwords match before proceeding
          checkPasswordsMatch();
          const authUser = await createUserWithEmailAndPassword(auth, email, password);
          
          if (!passwordsMatch) {
            setError('Passwords do not match');
            return;
          }
         
          const userDocRef = doc(db, "users", authUser.user.uid);
    
          // Create a new patient object
         if(authUser){
           const newPatient = {
            uid: authUser.user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
          };
          await setDoc(userDocRef, newPatient );
        
          // Create the user in Firebase Authentication
       
        }
          navigation.navigate("User");
        } catch (e) {
          // Handle errors
          setError('Error signing up. Please try again.');
          console.error(e);
        }
      };
    

  return (
    
    <SafeAreaView className="flex-1 relative pt-10 bg-zinc-200 space-y-1">
    <TouchableOpacity
     onPress={() => navigation.navigate( "Login")} 
     className="px-3">
    <ArrowSmallLeftIcon size={40}  color="#000000"/>
    </TouchableOpacity>
    
        <View className="p-6">
            <Text className="font-extrabold text-3xl tracking-[2px] text-orange-400">
            Sign Up
            </Text>
        </View>
     <ScrollView>
        <View className="px-3 space-y-6">

        <View className="flex-row space-x-2">
          
          <TextInput
            className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
            keyboardType="default"
            placeholder="Enter your First name here"
            autoFocus
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

         <TextInput
            className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
            keyboardType="default"
            placeholder="Enter your Last name here"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

        <TextInput
            className="border-2 h-14  border-gray-500 rounded-md p-2  bg-white"
            keyboardType="default"
            placeholder="Enter your email address here"
            type="email"
            autoFocus
            value={email}
            onChangeText={(text) => setEmail(text)}
            
          />

<TextInput
              className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white w-56"
              placeholder='Enter your phone number'
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(number) => setPhoneNumber(number)}
              
            />

           <TextInput
            className="border-2 h-14  border-gray-500 rounded-md p-2  bg-white"
            placeholder="Enter your password"
            keyboardType="default"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

<TextInput
            className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white"
            placeholder="Confirm your password"
            keyboardType="default"
            type="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={true}
            onEndEditing={checkPasswordsMatch}
            
          />
        </View>

        <View className="flex-row gap-1 p-2">
            <Text>
                Already have an account? 
            </Text>
          <TouchableOpacity
           onPress={() => navigation.navigate( "Login")} 
          >
            <Text className=" text-blue-700 underline text-base">
              Login
            </Text>
          </TouchableOpacity>
        </View>
     
     
    <View className="space-y-2 p-2">
      <TouchableOpacity 
      onPress={signUp}
       className="justify-center items-center border-2 border-gray-500 bg-orange-300  rounded-md h-12 w-[360px] ">
        <Text>
            Sign Up
        </Text>
       </TouchableOpacity>
       
     
    </View>
    </ScrollView> 
       <StatusBar style='dark' />
    </SafeAreaView>

  )
}

export default RegisterScreen