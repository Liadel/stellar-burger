import {API_URL, AUTH_TOKEN} from '../constants'

export const createRequestHeaders = (headers = {}) => {
  const accessToken = localStorage.getItem('accessToken')
  
  return {
    ...headers,
    'Content-Type': 'application/json',
    ...(accessToken && {'authorization': `Bearer ${accessToken}`})
  }
}

export const requestWrapper = async (url, options) => {
  const {method = 'GET', headers, payload} = options
  const refreshToken = localStorage.getItem('refreshToken')

  const settings = {
      method,
      headers: createRequestHeaders(headers),
      ...(payload && {body: JSON.stringify(payload)})
    } 
  const response = await fetch(url, settings)

  if (response.ok) {
    const data = await response.json();
    return data;
    
  } else if (response.status === 403) {
    console.log(response)
    try {
      await refreshAccessToken(refreshToken);
      const newResponse = await fetch(url, {
        ...settings,
        headers: createRequestHeaders(headers)
      });

      if (newResponse.ok) { 
        const newData = await newResponse.json();
        return newData;
      } else {
        throw new Error('Request failed with refreshed access token');
      }
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  } else {
    throw new Error('Request failed with access token');
  }
}

export const refreshAccessToken = async (token) => {
  const response = await fetch(`${API_URL}${AUTH_TOKEN}`, {
    method: 'POST',
    headers: createRequestHeaders(),
    body: JSON.stringify({token})
  })
  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  const {accessToken, refreshToken} = await response.json();

  setTokens({accessToken, refreshToken})

  return { accessToken, refreshToken }
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

export const setTokens = ({accessToken, refreshToken}) => {
  localStorage.setItem('accessToken', accessToken.split(' ')[1])
  localStorage.setItem('refreshToken', refreshToken)
}

export const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}