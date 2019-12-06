import React, { useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, AsyncStorage } from 'react-native';

const SettingsScreen = props => {

    const [categoriesSelected, setCategoriesSelected] = useState([])

    const categories = [
        'Sciences',
        'Bitcoin',
        'Basketball',
        'Design',
        'Manga',
        'Montpellier'
    ]

    useEffect(() => {
        getCategoriesSelected()
    }, [])

    const getCategoriesSelected = async () => {
        let catAsyncS = await AsyncStorage.getItem('catAsyncS')
        if(catAsyncS){
            setCategoriesSelected(JSON.parse(catAsyncS))
        }
    }

    const CategoryComponent = props => {
        let isSelected = categoriesSelected.find(cat => cat === props)
        return <Text style={isSelected ? {backgroundColor:'grey', color:"black", marginBottom:5, padding:5} : {backgroundColor:'lightgrey', color:"grey" ,marginBottom:5, padding:5}} onPress={() => handleCategoryPress(props)}>{props}</Text>
    }

    const handleCategoryPress = async category => {
        let catAsyncS = await AsyncStorage.getItem('catAsyncS')
        catAsyncS = JSON.parse(catAsyncS)
        // No categories found : define array and push element
        if(catAsyncS === null){
            let catArray = []
            catArray.push(category)
            await AsyncStorage.setItem('catAsyncS', JSON.stringify(catArray))
            setCategoriesSelected(catArray)
            return
        }
        // There is categories and there is the one we clicked on : remove
        if(catAsyncS.find(cat => cat == category)){
            let newCatAsyncS = catAsyncS.filter(cat => cat !== category)
            await AsyncStorage.setItem('catAsyncS', JSON.stringify(newCatAsyncS))
            setCategoriesSelected(newCatAsyncS)
            return
        }
        // There is categories but not the one we clicked on : add
        catAsyncS.push(category)
        await AsyncStorage.setItem('catAsyncS', JSON.stringify(catAsyncS))
        setCategoriesSelected(catAsyncS)
        return
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:50}}>
            <Text>Settings</Text>
            <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop:50}}>
                <FlatList
                    data={categories}
                    renderItem={({item}, index) => CategoryComponent(item, index)}
                    keyExtractor={category => category}
                />
            </View>
        </View>
    )
}

export default SettingsScreen