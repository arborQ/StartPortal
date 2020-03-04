import axios from 'axios'

export function SetToken (token?: string): void {
  fetch.defaults.headers.common['Authorization'] = token
}

export const fetch = axios.create({
  headers: { 'X-Front-Version': 'Vue' }
})
