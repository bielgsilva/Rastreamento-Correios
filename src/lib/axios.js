import axios from 'axios';

export default axios.create({
    baseURL: 'https://rastreamento-correios.cyclic.app', 
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' } 
})