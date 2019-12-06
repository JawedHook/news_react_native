import React, { Component, useState, useEffect } from 'react'
import NewsService from '../services/NewsService';
import { View, Text, FlatList, Image, AsyncStorage } from 'react-native';

import { connect } from 'react-redux'

import ItemArticle from '../components/ItemArticle';

const HomeScreen = props => {
    const serv = new NewsService()
    const [noSettings, setNoSettings] = useState(false)

    const getArticles = async () => {
        let catAsyncS = await AsyncStorage.getItem('catAsyncS')
        catAsyncS = JSON.parse(catAsyncS)
        setNoSettings(catAsyncS.length > 0)
        if(catAsyncS.length > 0){
            try{
                const PromiseCategories = catAsyncS.map( async category => {
                    return await serv.getNewsByCategory(category)
                })
                let articlesData = await Promise.all( PromiseCategories )
                let allArticles = []
                articlesData.map( category => {
                    category.data.articles.map( article => {
                        allArticles.push(article)
                        console.log(article.title)
                    })
                })
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
        getArticles()
    }, [])

    return (
        <View style={{flex: 1}}>
            <Text style={{marginTop:50, marginBottom:30, textAlign:'center'}}>News</Text>
            {
                noSettings ?
                    props.stateArticles ? 
                        <FlatList
                            style={{marginBottom: 40}}
                            data={props.stateArticles}
                            renderItem={(article, index) => <ItemArticle article={article}/>}
                            keyExtractor={(article, index) => index.toString()}
                        />
                    : <Text>Faut faire le loading</Text>
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