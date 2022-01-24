require('dotenv').config();
const axios = require('axios');

const api = axios.create({
    // moved API key from here 
    baseURL: 'https://free.currconv.com/api/v7',
    // baseURL: 'https://free.currencyconvertapi.com/api/v5',
    timeout: process.env.TIMEOUT || 5000,
});

module.exports = {
    convertCurrency: async (from, to) => {
        // to here
        const response = await api.get(`/convert?q=${from}_${to}&compact=y&apiKey=f204d773b08dcff401a2`);
        const key = Object.keys(response.data)[0];
        const { val } = response.data[key];
        return { rate: val };
    },
};