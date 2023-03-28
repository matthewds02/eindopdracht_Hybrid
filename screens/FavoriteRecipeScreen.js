import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const FavoriteRecipeScreen = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    // Fetch favorite recipes from API or local storage and update state
    const fetchedFavoriteRecipes = [
      { id: 2, name: 'Spaghetti Bolognese', favorite: true, category: 'Pasta', description: 'Classic Italian pasta dish', ingredients: ['spaghetti', 'ground beef', 'onion', 'garlic', 'tomato sauce'], instructions: '1. Cook spaghetti according to package instructions. 2. Brown ground beef with onion and garlic. 3. Add tomato sauce and simmer. 4. Serve over spaghetti.' },
      { id: 3, name: 'Chicken Curry', favorite: true, category: 'Indian', description: 'Spicy chicken dish with rice', ingredients: ['chicken', 'onion', 'garlic', 'curry powder', 'coconut milk', 'rice'], instructions: '1. Cook rice according to package instructions. 2. Brown chicken with onion and garlic. 3. Add curry powder and coconut milk and simmer. 4. Serve over rice.' },
    ].filter(recipe => recipe.favorite);
    setFavoriteRecipes(fetchedFavoriteRecipes);
  }, []);

  const navigation = useNavigation();

  const toggleFavorite = (itemId) => {
    const newFavoriteRecipes = favoriteRecipes.map(recipe => {
      if (recipe.id === itemId) {
        return { ...recipe, favorite: !recipe.favorite };
      } else {
        return recipe;
      }
    });
    setFavoriteRecipes(newFavoriteRecipes);
  };

  const renderRecipe = ({ item }) => {
    const isFav = item.favorite;

    return (
      <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('Recipe Details', { recipe: item, updateRecipe: toggleFavorite })}>
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
        data={favoriteRecipes}
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
    flexDirection: 'row', // Add this to align name and heart side by side
    justifyContent: 'space-between', // Add this to separate name and heart
    alignItems: 'center', // Add this to vertically center the items
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoriteRecipeScreen;
