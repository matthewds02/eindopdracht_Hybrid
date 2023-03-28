import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // importeer de FontAwesome icons

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from API or local storage and update state
    const fetchedRecipes = [    { id: 1, name: 'Pancakes', favorite: false, category: 'Breakfast', description: 'Delicious fluffy pancakes', ingredients: ['flour', 'sugar', 'milk', 'butter', 'eggs'], instructions: '1. Combine dry ingredients. 2. Mix in wet ingredients. 3. Cook on griddle.' },
      { id: 2, name: 'Spaghetti Bolognese', favorite: false, category: 'Pasta', description: 'Classic Italian pasta dish', ingredients: ['spaghetti', 'ground beef', 'onion', 'garlic', 'tomato sauce'], instructions: '1. Cook spaghetti according to package instructions. 2. Brown ground beef with onion and garlic. 3. Add tomato sauce and simmer. 4. Serve over spaghetti.' },
      { id: 3, name: 'Chicken Curry', favorite: false, category: 'Indian', description: 'Spicy chicken dish with rice', ingredients: ['chicken', 'onion', 'garlic', 'curry powder', 'coconut milk', 'rice'], instructions: '1. Cook rice according to package instructions. 2. Brown chicken with onion and garlic. 3. Add curry powder and coconut milk and simmer. 4. Serve over rice.' },
      { id: 4, name: 'Vegetable Stir Fry', favorite: false, category: 'Asian', description: 'Healthy and colorful stir fry', ingredients: ['broccoli', 'carrots', 'mushrooms', 'bell peppers', 'soy sauce', 'sesame oil'], instructions: '1. Stir fry vegetables until tender-crisp. 2. Add soy sauce and sesame oil. 3. Serve over rice or noodles.' },
    ];
    setRecipes(fetchedRecipes);
  }, []);


  const navigation = useNavigation();

  const toggleFavorite = (itemId) => {
    const newRecipes = recipes.map(recipe => {
      if (recipe.id === itemId) {
        return { ...recipe, favorite: !recipe.favorite };
      } else {
        return recipe;
      }
    });
    setRecipes(newRecipes);
  };

  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map(recipe => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe;
      } else {
        return recipe;
      }
    });
    setRecipes(updatedRecipes);
  };

  const renderRecipe = ({ item }) => {
    const isFav = item.favorite;

    return (
      <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('Recipe Details', { recipe: item, updateRecipe: updateRecipe })}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <FontAwesome name={isFav ? 'heart' : 'heart-o'} size={24} color={isFav ? 'red' : 'black'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.recipeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row', // Om de items naast elkaar te plaatsen
    justifyContent: 'space-between', // Om de naam en het hartje aan de uiteinden van de rij te plaatsen
    width: '80%',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
