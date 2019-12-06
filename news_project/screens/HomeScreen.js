import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image, AsyncStorage } from 'react-native';

import { connect } from 'react-redux'

import ItemArticle from '../components/ItemArticle';
import { ActivityIndicator } from 'react-native-paper';

const HomeScreen = props => {
    const serv = new NewsService()
    const [noSettings, setNoSettings] = useState(false)
    const [displayArticles, setDisplayArticles] = useState([])

    const getArticles = async shouldUpdate => {
        let catAsyncS = await AsyncStorage.getItem('catAsyncS')
        catAsyncS = JSON.parse(catAsyncS)
        setNoSettings(catAsyncS.length > 0)
        if(catAsyncS.length > 0 || shouldUpdate){
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
                setDisplayArticles(allArticles)
                _addArticles(allArticles)
            } catch( err ) {
                console.log(err)
            }
        }
    }

    const _addArticles = articles => {
        const action = {type:'ADD_ARTICLES', value:articles}
        props.dispatch(action)
    }

    useEffect(() => {
        getArticles(false)
    }, [])

    props.navigation.addListener(
        'didFocus',
        () => {
            getArticles(true)
        }
    )

    return (
        <View style={{flex: 1}}>
            <Text style={{marginTop:20, marginBottom:20, textAlign:'center'}}>News</Text>
            {
                noSettings ?
                    displayArticles.length > 0 ? 
                        <FlatList
                            data={displayArticles}
                            renderItem={(article, index) => <ItemArticle article={article} navigation={props.navigation}/>}
                            keyExtractor={(article, index) => index.toString()}
                        />
                    : 
                    <View>
                        <ActivityIndicator/>
                        <Text style={{textAlign:"center", marginTop: 50}}>Très beau loading</Text>
                    </View>
                : <Text style={{textAlign:"center", marginTop: 50}}>No settings</Text>
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        stateArticles: state.articles
    }
}

export default connect(mapStateToProps)(HomeScreen)