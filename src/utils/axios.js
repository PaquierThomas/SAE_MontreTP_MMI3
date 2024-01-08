import axios from 'axios'

//  CLient axios global

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const foo = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
