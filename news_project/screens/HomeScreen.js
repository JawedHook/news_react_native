import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const HomeScreen = props => {
    
    const serv = new NewsService()
    const [news, setNews] = useState([])

    props.navigationOptions = (e) => {
        return{
            title = 'Home',
            headerRight: (
                <Icon size={25} name={'ios-add'}
                    onPress={() => {
                    e.navigation.push('Detail');
                }} />
            )
        }
    }
    
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
            <View style={{marginBottom:50, width:'95%'}}>
                <Image style={{width:'100%', height:140, marginBottom:10}} source={{uri: props.urlToImage}}/>
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
            <Text style={{marginTop:50, marginBottom:30}}>News</Text>
            {
                news ? 
                    <FlatList
                        style={{marginBottom: 40}}
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