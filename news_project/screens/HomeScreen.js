import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image, AsyncStorage } from 'react-native';

const HomeScreen = props => {

    const serv = new NewsService()
    const [articles, setArticles] = useState([])
    const [noSettings, setNoSettings] = useState(false)

    const getArticles = async () => {
        let catAsyncS = await AsyncStorage.getItem('catAsyncS')
        catAsyncS = JSON.parse(catAsyncS)
        setNoSettings(catAsyncS.length > 0)
        if(noSettings){
            try{
                const PromiseCategories = catAsyncS.map( async category => {
                    return await serv.getNewsByCategory(category)
                })
                let articlesData = await Promise.all( PromiseCategories )
                let allArticles = []
                articlesData.map( category => {
                    category.data.articles.map( article => {
                        allArticles.push(article)
                    })
                })
                setArticles(allArticles)
            } catch( err ) {
                console.log(err)
            }
        }
    }

    const CardComponent = props => {
        return (
            <View style={{marginBottom:50, width:'95%'}}>
                <Image style={{width:'100%', height:140, marginBottom:10}} source={{uri: props.urlToImage}}/>
                <Text>{props.title}</Text>
                <Text>{props.description}</Text>
            </View>
        )
    }

    useEffect(() => {
        getArticles()
    }, [noSettings])

    props.navigation.addListener(
        'didFocus',
        () => {
            getArticles()
        }
    )

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginTop:50, marginBottom:30}}>News</Text>
            {
                noSettings ?
                    articles ? 
                        <FlatList
                            style={{marginBottom: 40}}
                            data={articles}
                            renderItem={({item}, index) => CardComponent(item, index)}
                            keyExtractor={article => article.title}
                        />
                    : <Text>Faut faire le loading</Text>
                : <Text>No settings</Text>
            }
        </View>
    )
}

export default HomeScreen;