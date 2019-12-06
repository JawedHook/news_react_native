import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text } from 'react-native';

const HomeScreen = props => {

    const serv = new NewsService()
    const [news, setNews] = useState([])

    const getNews = async () => {
        try{
            let newsResponse = await serv.getNews()
            setNews(newsResponse)
        } catch( err ) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <View>

        </View>
    )
}

export default HomeScreen;