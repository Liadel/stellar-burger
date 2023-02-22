export const requestWrapper = async ({url, payload}) => {
  const settings = payload ? {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    } : null
    console.log(settings)
    const res = await fetch(url, settings)
  
  if (!res.ok) {
    throw new Error('Ответ сети был не ok.')
  }

  const data = await res.json();
  return data
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}