import soilData from '../data/soilData.json';
import soilMapping from '../data/soilMapping.json';

/**
 * SOIL API SYSTEM
 * This service mimics a real-world Agricultural Database.
 * It uses the farmer's district to automatically fetch the 
 * geological soil profile from our mapping system.
 */
export async function fetchSoilType(district) {
  return new Promise((resolve) => {
    // Artificial delay to simulate a real network request
    setTimeout(() => {
      // Get the Soil ID from our geological mapping
      const soilId = soilMapping[district];
      
      // Find the detailed soil profile from our dataset
      const profile = soilData.find(s => s.id === soilId) || soilData[0];
      
      console.log(`System: Automatically detected ${profile.name} for ${district}`);
      resolve(profile);
    }, 800);
  });
}
