import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
    deleteRecipe(recipe.name);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: recipe.thumbnail}} style={styles.image}/>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'black'} />
      </TouchableOpacity>
      <Text style={styles.name}>{recipe.name}</Text>
      <Text style={styles.category}>{recipe.category}</Text>
      <Text style={styles.description}>{recipe.description}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.sectionText}>{recipe.ingredients}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.sectionText}>{recipe.instructions}</Text>
      </View>
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
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
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RecipeDetailsScreen;
