import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/"



const KEY = "36261891-c8f1f30f7f3c0f5c391e4fa5f"

export const getAllCards = async (name,page) =>{

    const {data} = await axios.get(`?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    return data
}


 

