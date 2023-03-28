import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import FavoriteRecipeScreen from './screens/FavoriteRecipeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Recipes" component={HomeScreen}/>
      <Stack.Screen name="Recipe Details" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} options={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 30} }} />
        <Tab.Screen name="Favorite" component={FavoriteRecipeScreen} options={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 30} }} />
        <Tab.Screen name="Add Recipe" component={AddRecipeScreen} options={{ headerTitleAlign: 'center', headerTitleStyle: { fontSize: 30} }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
