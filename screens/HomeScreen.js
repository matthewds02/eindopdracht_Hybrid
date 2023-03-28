import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importeer AsyncStorage
import { useIsFocused } from '@react-navigation/native';
import DeleteRecipeModal from '../components/DeleteRecipeModal';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused(); // Voeg de useIsFocused hook toe
  const [deleteRecipeModalVisible, setDeleteRecipeModalVisible] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    // Haal recepten op uit AsyncStorage
    async function getRecipes() {
      try {
        const jsonRecipes = await AsyncStorage.getItem('recipes');
        if (jsonRecipes != null) {
          setRecipes(JSON.parse(jsonRecipes));
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Roep de getRecipes functie aan telkens wanneer het startscherm opnieuw gerenderd wordt
    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  const handleLongPress = (item) => {
    setRecipeToDelete(item);
    setDeleteRecipeModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteRecipeModalVisible(false);
    setRecipeToDelete(null);
  };

  const handleDeleteConfirm = () => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== recipeToDelete.id);
    setRecipes(newRecipes);
    saveRecipes(newRecipes);
    setDeleteRecipeModalVisible(false);
    setRecipeToDelete(null);
  };

  // Functie om de recipes array op te slaan in AsyncStorage
  const saveRecipes = async (recipesToSave) => {
    try {
      await AsyncStorage.setItem('recipes', JSON.stringify(recipesToSave));
    } catch (error) {
      console.log(error);
    }
  };

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
    saveRecipes(newRecipes); // Roep de saveRecipes functie aan om de updates op te slaan
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
    saveRecipes(updatedRecipes); // Roep de saveRecipes functie aan om de updates op te slaan
  };

  const renderRecipe = ({ item }) => {
    const isFav = item.favorite;

    return (
      <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('Recipe Details', { recipe: item, updateRecipe: updateRecipe })} onLongPress={() => handleLongPress(item)}>
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
        keyExtractor={item => item.id}
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
    alignItems: 'center',
    width: '75%',
  },
  recipeItem: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row', // Om de items naast elkaar te plaatsen
    justifyContent: 'space-between', // Om de naam en het hartje aan de uiteinden van de rij te plaatsen
    width: 300,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
