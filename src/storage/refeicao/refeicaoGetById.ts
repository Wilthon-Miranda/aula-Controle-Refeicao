import { refeicaoGetAll } from './refeicaoGetAll';

export async function refeicaoGetById(id: string) {
  try {
    const storage = await refeicaoGetAll();
    const refeicao = storage.find((item) => item.id === id);
    return refeicao;
  } catch (error) {
    throw error;
  }
}
