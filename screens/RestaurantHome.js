import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { BanknotesIcon, BellIcon, ChatBubbleLeftIcon, SparklesIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { UserIcon } from 'react-native-heroicons/solid';

const RestaurantHome = () => {
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
    <View className="flex-1   bg-zinc-200  pt-8 space-y-6 ">
      {userData && (
      <React.Fragment >
      <View className="flex-row  items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-orange-400 text-sm">Find GO</Text>
          <Text className="font-bold  text-xl">
           {userData.companyName}
          </Text>
        </View>
        </View>
     <View className="flex items-center space-x-4 mt-2">
      

      <TouchableOpacity
      onPress={() => navigation.navigate("Reservation")} 
      className="border-2 justify-center   border-blue-500 bg-blue-600  rounded-md h-24 w-64 shadow-lg shadow-gray-900"
      >
     <View className="flex-row space-x-24 px-1">
        <Text className="text-base font-bold text-slate-100 uppercase">Reservations</Text>
        <BellIcon size={40} color="#999999"/>
      </View>
        <Text className="px-2 text-slate-50 font-extrabold tracking-wide">4</Text>
      </TouchableOpacity>
    </View>

   <View className="flex items-center  space-x-3 mt-4">
      <TouchableOpacity
       className="border-2 justify-center  border-green-500 bg-green-600  rounded-md h-24 w-64 shadow-lg shadow-gray-900"
      >
      <View  className="flex-row space-x-32 px-2">
        <Text className="text-base font-bold text-slate-100 uppercase">Reviews</Text>
        <ChatBubbleLeftIcon size={40} color="#808080"/>
      </View>
        <Text className="px-2 text-slate-50 font-extrabold tracking-wide">20</Text>
      </TouchableOpacity>
    </View>


  <View className="flex-row">
    <Image
     className="w-full h-64"
     source={{uri: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} />
   </View>

<View className="justify-center items-center">
   
<TouchableOpacity 
      onPress={() => navigation.navigate("Profile")}  
          className="justify-center items-center border-2 border-gray-200 bg-orange-500  rounded-md h-12  w-52">
         <Text className="text-white  text-lg ">View Profile</Text>
      </TouchableOpacity>
</View>
  </React.Fragment>
  )}  
</View>

  )
}

export default RestaurantHome