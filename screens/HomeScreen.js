import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    async function getRecipes() {
      try {
        const jsonRecipes = await AsyncStorage.getItem('recipes');
        if (jsonRecipes != null) {
          setRecipes(JSON.parse(jsonRecipes));
        }
      } catch (error) {
        console.log(error);
      }
      console.log(recipes);
    }

    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  const toggleFavorite = (itemId) => {
    const newRecipes = recipes.map(recipe => {
      if (recipe.id === itemId) {
        return { ...recipe, favorite: !recipe.favorite };
      } else {
        return recipe;
      }
    });
    setRecipes(newRecipes);
    saveRecipes(newRecipes);
  };

  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((r) => {
      if (r.id === updatedRecipe.id) {
        return updatedRecipe;
      }
      return r;
    });
    setRecipes(updatedRecipes);
  };


  const deleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
  };

  const renderRecipe = ({ item }) => {
    const isFav = item.favorite;

    return (
      <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate('Recipe Details', { recipe: item, updateRecipe: updateRecipe, deleteRecipe: deleteRecipe })}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <FontAwesome name={isFav ? 'heart' : 'heart-o'} size={24} color={isFav ? 'red' : 'black'} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const saveRecipes = async (recipesToSave) => {
    try {
      await AsyncStorage.setItem('recipes', JSON.stringify(recipesToSave));
    } catch (error) {
      console.log(error);
    }
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;