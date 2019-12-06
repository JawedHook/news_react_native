const initialState = { articles: [], readArticles: [] }

const actionsArticles = (state = initialState, action) => {
    let nextState
    switch (action.type) {
        case 'ADD_ARTICLES':
            const addArticles = action.value
            nextState = {
                ...state,
                articles: addArticles
            }
            return nextState || state
        case 'REMOVE_ARTICLES':
            if( !state.readArticles.includes(action.value) ){
                const alreadyReadArticles = state.readArticles
                alreadyReadArticles.push(action.value)
                nextState = {
                    ...state,
                    readArticles: alreadyReadArticles
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default actionsArticles