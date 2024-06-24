import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckIcon, XMarkIcon } from 'react-native-heroicons/solid'

const Reservation = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const userCollection = collection(db, 'users');
        const snapshot = await getDocs(userCollection);
        const usersData = snapshot.docs.map(doc => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching restaurants:', error.message);
      }
    };
    fetchRestaurants();
  }, []);
  return (
<View>
{users.map(user => (
  <View key={user.id}>
    <View className="flex-row pt-6 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-orange-400 text-sm">Find GO</Text>
        </View>
        </View>
    <View className="flex-row mt-5 justify-center items-center space-y-2 space-x-12 border-2 border-gray-200 shadow-md rounded-lg">  
   <View className="space-y-2">   
    <View className="flex-row space-x-2">
      <Text className="text-base font-extrabold">{user.firstName}</Text>
      <Text className="text-base font-extrabold">{user.lastName}</Text>
    </View>

<View className="flex-row space-x-2">
    <Text className="text-base font-bold">{user.email}</Text>
    <Text className="text-base font-bold">{user.phoneNumber}</Text>
</View>
<View>
    <Text className="text-base font-bold">Number of Table: {user.tables}</Text>
    <Text className="text-base font-bold">Number of Chair: {user.chairs}</Text>
    <Text className="text-base font-bold">Date and Time: {user.dateTime} </Text>
</View>
</View>

      <View className="flex-row space-x-3">
      <TouchableOpacity>
      <CheckIcon size={30} color="#10e100" />
      </TouchableOpacity>
        
        <TouchableOpacity>
        <XMarkIcon size={30} color="#cc0000" />
        </TouchableOpacity>
        
      </View>
    </View>
    </View>
    ))}
  </View>
  )
}

export default Reservation