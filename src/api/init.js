import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/api/'
})

const setJwt = (token) => {
  api.defaults.headers.common['Authorization'] = `Beaer ${token}`
}

export { api, setJwt }