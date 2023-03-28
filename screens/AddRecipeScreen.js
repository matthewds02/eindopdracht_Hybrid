import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();

  const handleSaveRecipe = async () => {
    try {
      const recipe = {
        name: recipeName,
        description: recipeDescription,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        favorite: isFavorite
      };
      const storedRecipes = await AsyncStorage.getItem('recipes');
      const parsedRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      const updatedRecipes = [...parsedRecipes, recipe];
      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      console.log(`Recipe saved: ${recipeName}`);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput style={styles.input} value={recipeName} onChangeText={setRecipeName} />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={recipeDescription} onChangeText={setRecipeDescription} />

      <Text style={styles.label}>Ingredients:</Text>
      <TextInput style={styles.input} value={recipeIngredients} onChangeText={setRecipeIngredients} />

      <Text style={styles.label}>Instructions:</Text>
      <TextInput style={styles.input} value={recipeInstructions} onChangeText={setRecipeInstructions} />

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Favorite:</Text>
        <Button title={isFavorite ? 'Unfavorite' : 'Favorite'} onPress={() => setIsFavorite(!isFavorite)} />
      </View>

      <Button title="Save Recipe" onPress={handleSaveRecipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    width: '100%',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default AddRecipeScreen;
