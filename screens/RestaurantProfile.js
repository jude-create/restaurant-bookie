import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { StarIcon } from 'react-native-heroicons/solid';

const RestaurantProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
          console.warn('No authenticated user');
          return;
        }
    
        const restaurantCollectionRef = collection(db, 'restaurant');
        const q = query(restaurantCollectionRef, 
          where('email', '==', currentUser.email,
        ));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size > 0) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        } else {
          console.warn('No user data found for the authenticated user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, []);  

  return (
    <ScrollView className="flex-1 ">
    {userData && (
      <React.Fragment >
      <Image 
        source={{
            uri: userData.text1
        }}
        className="h-48 w-full rounded-xl"
      />
   <View className="space-y-8 justify-center items-center">
      <View className="pt-4">
        <Text className="text-lg font-bold">{userData.companyName}</Text>
      </View>

      <View className="flex-row space-x-10">
        <Text className="text-base font-bold">{userData.email}</Text>
        <Text className="text-base font-bold">+{userData.phoneNumber}</Text>
      </View>

      <View className="space-y-5">
        <Text className="text-center text-base font-bold ">{userData.text}</Text>
        <Text className="text-center text-base font-bold ">{userData.text2}</Text>
      </View>

      <View className="flex-row space-x-2">
      <View>
      <Text className="text-center text-base font-bold ">Rating:</Text>
      </View>
      <View className="flex-row">
      <StarIcon color="green" opacity={0.5} size={22} />
        <Text className="text-center text-base font-bold ">4.4</Text>
      </View>
      
      </View>

     </View>
     </React.Fragment>
     )}
     <View className="justify-center items-center pt-8">
     <TouchableOpacity
    onPress={() => navigation.navigate("Restaurant")}
    className="justify-center items-center border-2 border-gray-500 bg-blue-500  rounded-md h-10 w-[100px] mx-5 mb-4 "
    >
        <Text>Edit Profile</Text>
    </TouchableOpacity>
  </View>
    </ScrollView>
  )
}

export default RestaurantProfile