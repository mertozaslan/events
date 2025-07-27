import { profileApi, ApiResponse } from './apiService';
import { UserProfile, dummyUserProfile } from '@/lib/dummyData';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response: ApiResponse<UserProfile> = await profileApi.get();
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Profil bilgileri yüklenemedi');
    }
  } catch (error) {
    console.warn('API failed, using dummy data:', error);
    // Fallback to dummy data
    return dummyUserProfile;
  }
};

export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    const response: ApiResponse<UserProfile> = await profileApi.update(profileData);
    
    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || 'Profil güncellenemedi');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

export const getUserStats = async () => {
  try {
    const profile = await getUserProfile();
    return profile.stats;
  } catch (error) {
    console.error('Failed to get user stats:', error);
    return dummyUserProfile.stats;
  }
};

export const getUserPreferences = async () => {
  try {
    const profile = await getUserProfile();
    return profile.preferences;
  } catch (error) {
    console.error('Failed to get user preferences:', error);
    return dummyUserProfile.preferences;
  }
}; 