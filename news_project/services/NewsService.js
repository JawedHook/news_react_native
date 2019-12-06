import axios from 'axios'

const key = ''
const country = 'us'
const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}`

class NewsService{
    getNews(){
        return axios.get(`${url}`)
    }
}

export default NewsService