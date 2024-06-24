
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RegisterRestaurant from './screens/RegisterRestaurant';
import UserHomeScreen from './screens/UserHomeScreen';
import UserRestuarant from './screens/UserRestuarant';
import RestaurantLogin from './screens/RestaurantLogin';
import RestaurantHome from './screens/RestaurantHome';
import Reservation from './screens/Reservation';
import RestaurantProfile from './screens/RestaurantProfile';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="Login"
              component={UserLoginScreen}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
 <Stack.Screen
              name="RestaurantLogin"
              component={RestaurantLogin}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="User"
              component={UserHomeScreen}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="UserRestaurant"
              component={UserRestuarant}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="Restaurant"
              component={RegisterRestaurant}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="RestaurantHome"
              component={RestaurantHome}
              options={{ headerShown: false }}
            />
          
 <Stack.Screen
              name="Reservation"
              component={Reservation}
              options={{ headerShown: false }}
            />

<Stack.Screen
              name="Profile"
              component={RestaurantProfile}
              options={{ headerShown: false }}
            />
             </Stack.Navigator>
    </NavigationContainer>
  );
}