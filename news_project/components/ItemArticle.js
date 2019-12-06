import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { SwipeRow } from 'react-native-swipe-list-view';
import { View, Text, FlatList, Image, AsyncStorage, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'

const ItemArticle = props => {

    const swipeToDelete = (swipeData, title) => {
        const { value } = swipeData;
        if(value > 200){
            _deleteArticle(title)
        }
    }
    
    const _deleteArticle = title => {
        const action = { type:'REMOVE_ARTICLES', value: title}
        props.dispatch(action)
    }

    const {navigate} = props.navigation

    const article = props.article
    const readArticles = props.readArticles
    if(!readArticles.includes(article.item.title)){
        return (
            <SwipeRow 
                key={article.item.title}
                onSwipeValueChange={ swipeData => swipeToDelete(swipeData, article.item.title)}
            >
                <View style={styles.standaloneRowBack}>
                    <Text>Suppr.</Text>
                </View>
                <View style={styles.standaloneRowFront}>
                    <View style={{ flex: 1, flexDirection:'column', justifyContent: 'space-between' }}>
                        <Image style={{ width: '100%', height:200 }} source={{ uri: `${article.item.urlToImage}` }} />
                        <View style={{ flex: 1, flexDirection: 'column', padding:10, paddingBottom:30}}>
                            <Text style={{paddingBottom:20, fontSize:20}}>{article.item.title}</Text>
                            <Text>{article.item.description}</Text>
                            <Button onPress={() => navigate('Detail', {article:props})} title='View Article'/>
                        </View>
                    </View>
                </View>
            </SwipeRow>
        )
    }
    return <></>
}


ItemArticle.propTypes = {
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        readArticles: state.readArticles
    }
}

export default connect(mapStateToProps)(ItemArticle)

const styles = StyleSheet.create({
    standaloneRowFront: {
        backgroundColor: 'white',
        paddingBottom:20
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#3D3D3D',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingBottom:20
    },
    backTextWhite: {
        color: '#FFF',
    }
});

