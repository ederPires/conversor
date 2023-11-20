import axios from 'axios';
//http://economia.awesomeapi.com.br/json/all

// > Rota para buscar BTC > BRL : all/BTC-BRL

export const api = axios.create({
  baseURL: "https://economia.awesomeapi.com.br/json/"
})
