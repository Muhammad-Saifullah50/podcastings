'use server'

export const generateAIThumbnail = async (prompt: string) => {
  console.log(prompt)
  try {
    const url = 'https://open-ai21.p.rapidapi.com/texttoimage2';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': process.env.RAPID_API_KEY!,
        'x-rapidapi-host': process.env.RAPID_API_HOST!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: prompt })
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }

  } catch (error) {
    console.error(error)
  }

}

https://prlabsapi.com:8005/matagimage?id=0BmGp5wnApPidu6NkfoK1723564183.5893078