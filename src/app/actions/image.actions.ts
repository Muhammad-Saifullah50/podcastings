'use server'

export const generateAIThumbnail = async (prompt: string) => {
    try {
            const request = await fetch(`https://api.limewire.com/api/image/generation`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Api-Version': 'v1',
                  Accept: 'application/json',
                  Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`,
                },
                body: JSON.stringify({
                  prompt: prompt,
                  aspect_ratio: '1:1'
                })
              }
            );
          
            const response = await request.json();

            if (!response.data[0].asset_url) {
                return null
            }
            
            return response.data[0].asset_url

    } catch (error) {
        console.error(error)
    }

}