import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICAO_COLLECTION } from '../storageConfig';
import { refeicaoGetAll } from './refeicaoGetAll';
import { Refeicao } from '../../@types/refeicao.type';

export async function refeicaoUpdate(updatedRefeicao: Refeicao) {
  try {
    const storage = await refeicaoGetAll();
    const updatedStorage = storage.map((item) => 
      item.id === updatedRefeicao.id ? updatedRefeicao : item
    );
    
    await AsyncStorage.setItem(REFEICAO_COLLECTION, JSON.stringify(updatedStorage));
  } catch (error) {
    throw error;
  }
}
