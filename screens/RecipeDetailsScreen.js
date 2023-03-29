import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{width:'76%', height: 400}}>
        <Image source={{uri: recipe.thumbnail}} style={styles.image}/>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : 'black'} />
      </TouchableOpacity>
      <Text style={styles.name}>{recipe.name}</Text>
      <Text style={styles.category}>{recipe.category}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{recipe.description}</Text>
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecipeDetailsScreen;
