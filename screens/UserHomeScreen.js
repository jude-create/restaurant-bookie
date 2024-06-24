import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AdjustmentsHorizontalIcon,  MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid'
import FeaturedRow from '../components/FeaturedRow'
import Categories from '../components/Categories'
import ResturantCard from '../components/ResturantCard'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const UserHomeScreen = () => {
  const [usersData, setUsersData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantsCollection = collection(db, 'restaurant');
        const snapshot = await getDocs(restaurantsCollection);
        const restaurantsData = snapshot.docs.map(doc => doc.data());
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error('Error fetching restaurants:', error.message);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
    
        if (!currentUser) {
          console.warn('No authenticated user');
          return;
        }
    
        const userCollectionRef = collection(db, 'users');
        const q = query(userCollectionRef, 
          where('email', '==', currentUser.email,
        ));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.size > 0) {
          const usersData = querySnapshot.docs[0].data();
          setUsersData(usersData);
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
    
    <SafeAreaView className="bg-white pt-10  flex-1">
      {/**header */}
     
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
         {usersData && (
        <React.Fragment >
        <View className="flex-1">
          <Text className="font-bold text-orange-400 text-sm">Find GO</Text>
          <Text className="font-bold  text-xl">
            {`Hi ${usersData.firstName}`}
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
        </React.Fragment>
      )}
      </View>
   
      {/**search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 ">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Resturants and cuisines "
            keyboardType="default"
          />
        </View>
        <AdjustmentsHorizontalIcon color="#00CCBB" />
      </View>

      {/**Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/**Categories */}
        <Categories />
        {/**Featured Rows */}
        <FeaturedRow
          id="123"
          title="Featured"
          description="Paid placements from our partners"
        />
  <ScrollView
  horizontal
   className="flex-row">
         {restaurants.map((restaurant, index) => (
          <ResturantCard
            key={index}
            id={restaurant.id}
            imgUrl={restaurant.text1}
            title={restaurant.companyName}
            rating= "4.4"
            address={restaurant.text}
            short_description={restaurant.text2}
            email={restaurant.email}
            phoneNumber={restaurant.phoneNumber}
          />
        ))}
    </ScrollView>


        <FeaturedRow
          id="1234"
          title="Tasty Discounts"
          description="Everyone's been enjoying these juicy discounts"
        />
       <ScrollView
  horizontal
   className="flex-row">
        <ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1527025047-354c31c26312?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Hard Rock CAFE"
    rating={4.5}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
    />

<ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1460134583608-5f5d1dd1d61c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Mitova"
    rating={4.0}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
    />

<ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1541980294979-572cb9d973fd?q=80&w=1534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Bunito"
    rating={4.1}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
    />
    </ScrollView>


        <FeaturedRow
          id="12345"
          title="Offers near you"
          description="Why not support your local resturant tonight"
        />
          <ScrollView
  horizontal
   className="flex-row">
         <ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1622215216302-2169bd5f4e5f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Columbia"
    rating={4.4}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
     />

<ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1560311225-6a3038e96820?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Supreme UPPER CRUST"
    rating={4.2}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
    />

<ResturantCard
     id={123}
    imgUrl="https://images.unsplash.com/photo-1559292444-27dab741e924?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    title="Queens Arcade"
    rating={4.2}
    address="123 Main st"
    short_description="This is a test description"
    dishes={[]}
    long={20}
    lat={0}
    />
     </ScrollView>

      </ScrollView>
     
    </SafeAreaView>
  
  )
}

export default UserHomeScreen