import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image } from 'react-native';

const HomeScreen = props => {

    const serv = new NewsService()
    const [news, setNews] = useState([])

    const getNews = async () => {
        try{
            let newsResponse = await serv.getNews()
            setNews(newsResponse.data.articles)
        } catch( err ) {
            console.log(err)
        }
    }

    const CardComponent = props => {
        return (
            <View>
                <Image style={{width:80, height:80}} source={{uri: props.urlToImage}}/>
                <Text>{props.title}</Text>
                <Text>{props.description}</Text>
            </View>
        )
    }

    useEffect(() => {
        getNews()

    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {
                news ? 
                    <FlatList
                        data={news}
                        renderItem={({item}, index) => CardComponent(item, index)}
                        keyExtractor={(article, index) => article.title}
                    />
                : <Text>Faut faite le loading</Text>
            }
        </View>
    )
}

export default HomeScreen;