import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { SparklesIcon } from "react-native-heroicons/solid"; 
import { StatusBar } from 'expo-status-bar';




const HomeScreen = () => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  return (
   
     <View className="flex-1 items-center justify-center pt-64  bg-orange-400 space-y-72" >
       
      <View className="space-y-1">
       <View className="flex-row space-x-1 ">
         <SparklesIcon size={50} color="#f5f5dc" />
         <Text className="font-bold uppercase text-yellow-50 tracking-[6px] pt-3 text-2xl">
           Find Go
         </Text>
       </View>

       <View>
         <Text className="font-extrabold text-sm tracking-[2px] text-slate-500 text-center">
           Anywhere you wan chop...........
         </Text>
       </View>


      </View>

      
      
     
    <View className="space-y-3">

   
      <TouchableOpacity
       onPress={() => navigation.navigate( "Login")} 
          className="justify-center items-center border-2 border-gray-500 bg-slate-500  rounded-md h-12 w-[360px] ">
         <Text className="text-white text-lg ">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      onPress={() => navigation.navigate("Restaurant")}  
          className="justify-center items-center border-2 border-gray-500 bg-slate-200  rounded-md h-12 ">
         <Text className="text-slate-500  text-lg ">Register  Restaurant</Text>
      </TouchableOpacity>
      </View>
      <StatusBar style = "light"/>
     </View>
     
    
  )
}

export default HomeScreen