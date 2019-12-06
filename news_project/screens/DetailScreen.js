import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image } from 'react-native';

const DetailScreen = props => {
    newsService = new NewsService();

    return(
        <View >
            <Text>SALUT C'EST LE DETAIL</Text>
        </View>
    )
}

export default DetailScreen;