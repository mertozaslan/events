const UNSPLASH_ACCESS_KEY = 'tAbRlIKxMqPdWyJzDGMCOdO_pN2aQhS12HiW9QorvKU';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

export const getRandomImage = async (query: string): Promise<string> => {
  try {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/photos/random?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Unsplash API error');
    }
    
    const image: UnsplashImage = await response.json();
    return image.urls.regular;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    // Fallback image
    return 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop';
  }
};

export const getImagesForEvents = async (categories: string[]): Promise<Record<string, string>> => {
  const imagePromises = categories.map(async (category) => {
    const imageUrl = await getRandomImage(category);
    return { category, imageUrl };
  });

  const results = await Promise.all(imagePromises);
  
  return results.reduce((acc, { category, imageUrl }) => {
    acc[category] = imageUrl;
    return acc;
  }, {} as Record<string, string>);
}; 