'use server'

export const generateAIThumbnail = async (prompt: string) => {

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

    return result.generated_image

  } catch (error) {
    console.error(error);
  }
}
