import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICAO_COLLECTION } from '../storageConfig';
import { Refeicao } from '../../@types/refeicao.type';

export async function refeicaoGetAll() {
  try {
    const storage = await AsyncStorage.getItem(REFEICAO_COLLECTION);
    const refeicoes: Refeicao[] = storage ? JSON.parse(storage) : [];
    return refeicoes;
  } catch (error) {
    throw error;
  }
}
