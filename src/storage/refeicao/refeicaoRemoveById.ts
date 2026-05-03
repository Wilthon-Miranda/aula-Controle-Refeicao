import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICAO_COLLECTION } from '../storageConfig';
import { refeicaoGetAll } from './refeicaoGetAll';

export async function refeicaoRemoveById(id: string) {
  try {
    const storage = await refeicaoGetAll();
    const updatedStorage = storage.filter((item) => item.id !== id);
    
    await AsyncStorage.setItem(REFEICAO_COLLECTION, JSON.stringify(updatedStorage));
  } catch (error) {
    throw error;
  }
}
