import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ArrowSmallLeftIcon } from 'react-native-heroicons/solid';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const RestaurantLogin = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleSignIn = async () => {
      try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
  
        // Navigate to the desired screen after successful sign-in
        // Replace "PatientDrawer" with the screen you want to navigate to
        navigation.navigate('RestaurantHome');
      } catch (error) {
        console.error('Error signing in:', error.message);
        // Handle authentication errors (e.g., display an error message to the user)
      }
    };
   

 
  return (
    <SafeAreaView className="flex-1 relative pt-10 bg-zinc-200 space-y-1">
    <TouchableOpacity
     onPress={() => navigation.navigate("Home")}
     className="px-3">
    <ArrowSmallLeftIcon size={40}  color="#000000"/>
    </TouchableOpacity>
    
        <View className="p-6">
            <Text className="font-extrabold text-3xl tracking-[2px] text-orange-400">
           Restaurant Sign In
            </Text>
        </View>

        <View className="px-3 space-y-6">
        <TextInput
            className="border-2 h-14  border-gray-500 rounded-md p-2 "
            keyboardType="default"
            placeholder="Enter your email address here"
            type="email"
            autoFocus
            value={email}
            onChangeText={(text) => setEmail(text)}
            
          />
           <TextInput
            className="border-2 h-14  border-gray-500 rounded-md p-2"
            placeholder="Enter your password"
            keyboardType="default"
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>

        <View className="flex-row gap-1 p-2">
            <Text>
                Don't have an account? 
            </Text>
          <TouchableOpacity
           onPress={() => navigation.navigate("Restaurant")} 
          >
            <Text className=" text-blue-700 underline text-sm">
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
     
     
    <View className="space-y-2 p-2">
      <TouchableOpacity 
        onPress={handleSignIn} 
       className="justify-center items-center border-2 border-gray-500 bg-orange-300  rounded-md h-12 w-[360px] ">
        <Text>
            Sign In
        </Text>
       </TouchableOpacity>
    </View>
</SafeAreaView>
  )
}

export default RestaurantLogin