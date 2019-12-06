import { AsyncStorage } from 'react-native';

const initialState = { categories: [] }

const actionsArticles = (state = initialState, action) => {
    let nextState,
        category = action.value
    switch (action.type) {
        case 'GET_CATEGORIES':

            return nextState || state
        case 'HANDLE_CATEGORY':
            let catAsyncS = await AsyncStorage.getItem('catAsyncS')
            catAsyncS = JSON.parse(catAsyncS)
            // No categories found : define array and push element
            if(catAsyncS === null){
                let catArray = []
                catArray.push(category)
                await AsyncStorage.setItem('catAsyncS', JSON.stringify(catArray))
                return {
                    ...state,
                    categories:catArray
                }
            }
            // There is categories and there is the one we clicked on : remove
            if(catAsyncS.find(cat => cat == category)){
                let newCatAsyncS = catAsyncS.filter(cat => cat !== category)
                await AsyncStorage.setItem('catAsyncS', JSON.stringify(newCatAsyncS))
                return {
                    ...state,
                    categories:newCatAsyncS
                }
            }
            // There is categories but not the one we clicked on : add
            catAsyncS.push(category)
            await AsyncStorage.setItem('catAsyncS', JSON.stringify(catAsyncS))
            return {
                ...state,
                categories:catAsyncS
            }     
        default:
            return state
    }
}

export default actionsArticles