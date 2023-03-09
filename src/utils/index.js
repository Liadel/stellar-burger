import {API_URL, AUTH_TOKEN} from '../constants'

export const requestWrapper = async (url, {method='GET', payload}) => {

  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  const settings = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && {'authorization': `Bearer ${accessToken}`})
      },
      ...(payload && {body: JSON.stringify(payload)})
    } 
  const res = await fetch(url, settings)
  
  if (!res.ok) {
    console.log(refreshToken)
    throw new Error('Ответ сети был не ok.')
  }

  const data = await res.json();
  return data
}

export const getRefreshedToken = async ({token}) => {
  const res = await fetch(`${API_URL}${AUTH_TOKEN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // ...(token && {'authorization': `Bearer ${token}`})
    },
    body: JSON.stringify({token})
  })
  if (!res.ok) {
    console.log(token)
    throw new Error('Ответ сети был не ok.')
  }

  const {accessToken, refreshToken} = await res.json();

  localStorage?.setItem('accessToken', accessToken)
  localStorage?.setItem('refreshToken', refreshToken)
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}