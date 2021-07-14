import axios from "axios";

const _baseUrl = 'http://localhost:3002';



export const getResource = async () => {
    return axios.get('http://localhost:3002/products')
		.then(response => response.data)
}






