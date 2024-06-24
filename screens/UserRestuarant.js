import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../config/firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

const UserRestuarant = () => {
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            email,
            address,
            short_description,
            phoneNumber,
            long,
            lat,
        },
    } = useRoute();
    const navigation = useNavigation();

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedChair, setSelectedChair] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setShowTimePicker(false);
        setDate(currentDate);
      };
    
      const showDatePickerHandler = () => {
        setShowDatePicker(true);
        setShowTimePicker(false);
      };
    
      const showTimePickerHandler = () => {
        setShowTimePicker(true);
        setShowDatePicker(false);
      };

      const makeReservation = async () => {
        try {
          
            const currentUser = auth.currentUser;
    
            if (!currentUser) {
              console.warn('No authenticated user');
              return;
            }
            
            const userId = currentUser.uid;
            console.log(userId);
            const userDocRef = doc(db, "users", userId);
         
          const reservationData = {
            tables: selectedValue,
            chairs: selectedChair,
            date: date,
            createdAt: serverTimestamp(),
          };
          await updateDoc(userDocRef, reservationData);
          navigation.navigate("User");
          // Display a pop-up message indicating successful reservation
          Alert.alert('Reservation Booked', 'Your reservation has been successfully booked!');
        } catch (error) {
          console.error('Error making reservation:', error.message);
        }
      };
  return (
    <ScrollView className="flex-1 mb-4">
      <Image 
        source={{
            uri: imgUrl
        }}
        className="h-48 w-full rounded-xl"
      />
   <View className="space-y-4 justify-center items-center">
      <View className="pt-2">
        <Text className="text-lg font-bold">{title}</Text>
      </View>

      <View className="flex-row space-x-8">
        <Text className="text-base font-bold">{email}</Text>
        <Text className="text-base font-bold">{phoneNumber}</Text>
      </View>

      <View className="space-y-3">
        <Text className="text-center text-base font-bold ">{address}</Text>
        <Text className="text-center text-base font-bold ">{short_description}</Text>
      </View>

      <View className="flex-row space-x-2">
      <View>
      <Text className="text-center text-base font-bold ">Rating:</Text>
      </View>
      <View className="flex-row">
      <StarIcon color="green" opacity={0.5} size={22} />
        <Text className="text-center text-base font-bold ">{rating}</Text>
      </View>
      
      </View>

      <View>
      <Text className="text-center text-base font-bold ">Select Number of Tables:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 40, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        {/* Add more Picker.Item for additional options */}
      </Picker>

      {/* Display selected value */}
      <Text style={{ marginTop: 20 }}>Selected Tables: {selectedValue}</Text>
      </View>

      <View>
      <Text className="text-center text-base font-bold ">Select Number of Chairs:</Text>
      <Picker
        selectedValue={selectedChair}
        className="h-6 w-32"
        onValueChange={(itemValue, itemIndex) => setSelectedChair(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        {/* Add more Picker.Item for additional options */}
      </Picker>

      {/* Display selected value */}
      <Text style={{ marginTop: 20 }}>Selected Chairs: {selectedChair}</Text>
      </View>

      
      <TouchableOpacity onPress={showDatePickerHandler}>
      <Text className="text-base font-extrabold text-orange-400 underline">Select Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode='date'
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
        <TouchableOpacity onPress={showTimePickerHandler}>
          <Text className="text-base font-extrabold text-orange-400 underline">Select Time</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode='time'
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
        <View className="mb-2">
          <Text className="text-base font-bold">{date.toLocaleString()}</Text>
        </View>
      <TouchableOpacity
              onPress={makeReservation}
              className="justify-center items-center border-2 border-gray-500 bg-orange-500 rounded-md h-10 w-[200px] mx-5"
            >
              <Text className="text-lg text-white">Make a Reservation</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

export default UserRestuarant