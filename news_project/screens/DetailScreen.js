import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image } from 'react-native';

const DetailScreen = props => {
    newsService = new NewsService();

    const article = props.navigation.state.params.article.article.item

    return(
        <View>
            <Image style={{width:'100%', height:200, marginBottom:10}} source={{uri: article.urlToImage}}/>
            <View style={{width:'90%', marginLeft:'5%'}}>
                <Text style={{fontSize:20, marginBottom:10, marginTop:30}}>{article.title}</Text>
                <Text>{article.content}</Text>
            </View>
        </View>
    )
}

export default DetailScreen;