import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ArrowSmallLeftIcon from 'react-native-heroicons/solid/ArrowSmallLeftIcon'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterRestaurant = () => {
    const navigation = useNavigation();


  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState(null);

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
     
      const userDocRef = doc(db, "restaurant", authUser.user.uid);

      // Create a new patient object
     if(authUser){
       const newRestaurant = {
        uid: authUser.user.uid,
        companyName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        text: text,
        text1: text1,
        text2: text2
      };
      await setDoc(userDocRef, newRestaurant);
    
      // Create the user in Firebase Authentication
   
    }
      navigation.navigate("RestaurantHome");
    } catch (e) {
      // Handle errors
      setError('Error signing up. Please try again.');
      console.error(e);
    }
  };
  
  return (
    <SafeAreaView className="flex-1  pt-6 bg-zinc-200 space-y-4 ">
    <TouchableOpacity
   onPress={() => navigation.navigate("Home")}
   className="px-3">
  <ArrowSmallLeftIcon size={30}  color="#000000"/>
  </TouchableOpacity>
    <View className="p-3">
      <Text className="font-extrabold text-3xl tracking-[2px] text-orange-400">
      Sign Up
      </Text>
    </View>
   

    <ScrollView className="px-4 space-y-4 relative">


    
   
      <View> 
        <TextInput
          className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
          keyboardType="default"
          placeholder="Company Name"
          autoFocus
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
     </View>
     
      <View>
        <TextInput
         className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
          keyboardType="default"
          placeholder="Enter your email address here"
          type="Email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View>
        <TextInput
          className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
          keyboardType="default"
          placeholder="Enter your address"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>

      <View>
        <TextInput
          className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white "
          keyboardType="default"
          placeholder="Enter Restuarant Prolile Pic"
          value={text1}
          onChangeText={(text) => setText1(text)}
        />
      </View>

      <View>
       
      <TextInput
            className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white w-56"
            placeholder='Enter your phone number'
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={(number) => setPhoneNumber(number)}
            
          />

    </View>

       
    <View>
        <TextInput
          className="border-2 h-44  border-gray-500 rounded-lg pb-28 px-2 bg-white "
          keyboardType="default"
          multiline={true}
          placeholder="Tell us more about your company(Description, Food, Brand slogan etc)"
          value={text2}
          onChangeText={(text) => setText2(text)}
        />
      </View>

      <View>
      <Text className="text-red-600 italic">{error}</Text>
        <TextInput
          className="border-2 h-14  border-gray-500 rounded-lg p-2 bg-white"
          placeholder="Enter your password"
          keyboardType="default"
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>



      <View>
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
         {!passwordsMatch && (
      <Text className="text-red-600 italic">Passwords do not match</Text>
    )}
      </View>

     
      <TouchableOpacity 
       onPress={signUp} 
     className="justify-center items-center border-2 border-gray-500 bg-orange-300   rounded-md h-12 mb-2 ">
      <Text className="text-base font-bold">
          Sign up
      </Text>
     </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  )
}

export default RegisterRestaurant