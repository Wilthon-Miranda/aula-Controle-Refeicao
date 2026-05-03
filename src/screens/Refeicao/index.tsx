import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { PencilSimpleLineIcon, TrashIcon } from 'phosphor-react-native';
import theme from '../../theme';

import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { ConfirmModal } from '../../components/ConfirmModal';
import { refeicaoGetById } from '../../storage/refeicao/refeicaoGetById';
import { refeicaoRemoveById } from '../../storage/refeicao/refeicaoRemoveById';
import { Refeicao as RefeicaoType } from '../../@types/refeicao.type';
import { Loading } from '../../components/Loading';

type RouteParams = {
  id: string;
};

export function Refeicao() {
  const [refeicao, setRefeicao] = useState<RefeicaoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchRefeicao() {
    try {
      setIsLoading(true);
      const data = await refeicaoGetById(id);
      if (!data) {
        Alert.alert('Refeição', 'Refeição não encontrada.');
        return navigation.goBack();
      }
      setRefeicao(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Refeição', 'Não foi possível carregar a refeição.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleEdit() {
    navigation.navigate('editar', { id });
  }

  async function remove() {
    try {
      setIsModalVisible(false);
      await refeicaoRemoveById(id);
      navigation.navigate('home');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover', 'Não foi possível remover a refeição.');
    }
  }

  useFocusEffect(useCallback(() => {
    fetchRefeicao();
  }, [id]));

  if (isLoading || !refeicao) {
    return <Loading />;
  }

  const dateObject = new Date(refeicao.data);
  const dateString = `${String(dateObject.getDate()).padStart(2, '0')}/${String(dateObject.getMonth() + 1).padStart(2, '0')}/${dateObject.getFullYear()}`;
  const timeString = `${String(dateObject.getHours()).padStart(2, '0')}:${String(dateObject.getMinutes()).padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Header
        title="Refeição"
        type={refeicao.isDieta ? 'SECONDARY' : 'OCCUPY'}
      />

      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{refeicao.nome}</Text>
          <Text style={styles.descricao}>{refeicao.descricao}</Text>

          <Text style={styles.label}>Data e hora</Text>
          <Text style={styles.dateTime}>{dateString} às {timeString}</Text>

          <View style={styles.tag}>
            <View style={[
              styles.tagStatus,
              { backgroundColor: refeicao.isDieta ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK }
            ]} />
            <Text style={styles.tagText}>
              {refeicao.isDieta ? 'dentro da dieta' : 'fora da dieta'}
            </Text>
          </View>
        </View>

        <Button
          title="Editar refeição"
          icon={<PencilSimpleLineIcon size={18} color={theme.COLORS.WHITE} />}
          onPress={handleEdit}
          style={{ marginBottom: 8 }}
        />

        <Button
          title="Excluir refeição"
          type="SECONDARY"
          icon={<TrashIcon size={18} color={theme.COLORS.GRAY_1} />}
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      <ConfirmModal 
        title="Deseja realmente excluir o registro da refeição?"
        visible={isModalVisible}
        onConfirm={remove}
        onCancel={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.GRAY_7,
  },
  content: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 24,
  },
  name: {
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    marginBottom: 8,
  },
  descricao: {
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
    marginBottom: 24,
  },
  label: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    marginBottom: 8,
  },
  dateTime: {
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
    marginBottom: 24,
  },
  tag: {
    width: 144,
    height: 34,
    backgroundColor: theme.COLORS.GRAY_6,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_1,
  }
});
