import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const RecipeDetailsScreen = ({ route, navigation }) => {
  const { recipe, updateRecipe, deleteRecipe } = route.params;
  const [isFavorite, setIsFavorite] = useState(recipe.favorite);

  const toggleFavorite = () => {
    const updatedRecipe = { ...recipe, favorite: !isFavorite };
    setIsFavorite(!isFavorite);
    updateRecipe(updatedRecipe);
  };

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{recipe.name}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'black'} />
      </TouchableOpacity>
      <Text style={styles.category}>{recipe.category}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <Text style={styles.ingredients}>{recipe.ingredients}</Text>
      <Text style={styles.instructions}>{recipe.instructions}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default RecipeDetailsScreen;
