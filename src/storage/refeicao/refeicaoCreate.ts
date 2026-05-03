import AsyncStorage from '@react-native-async-storage/async-storage';
import { REFEICAO_COLLECTION } from '../storageConfig';
import { refeicaoGetAll } from './refeicaoGetAll';
import { Refeicao } from '../../@types/refeicao.type';

export async function refeicaoCreate(newRefeicao: Refeicao) {
  try {
    const storedRefeicoes = await refeicaoGetAll();
    const storage = JSON.stringify([...storedRefeicoes, newRefeicao]);
    await AsyncStorage.setItem(REFEICAO_COLLECTION, storage);
    console.log('Deu certo')
  } catch (error) {
    console.log(error)
    throw error;
  }
}
