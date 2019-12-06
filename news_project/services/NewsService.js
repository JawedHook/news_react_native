import axios from 'axios'

const key = ''
const url = `https://newsapi.org/v2/everything?apiKey=${key}&`

class NewsService{
    getNewsByCategory(category){
        return axios.get(`${url}q=${category.toLowerCase()}`) 
    }
}

export default NewsService