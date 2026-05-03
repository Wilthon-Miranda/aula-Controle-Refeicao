import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'phosphor-react-native';

import theme from '../../theme';
import { HomeHeader } from '../../components/HomeHeader';
import { PercentCard } from '../../components/PercentCard';
import { Button } from '../../components/Button';
import { MealItem } from '../../components/MealItem';
import { refeicaoGetAll } from '../../storage/refeicao/refeicaoGetAll';
import { Refeicao } from '../../@types/refeicao.type';

type SectionData = {
  title: string;
  data: Refeicao[];
};

export function Home() {
  const [refeicao, setRefeicao] = useState<SectionData[]>([]);
  const [percent, setPercent] = useState('0,00');

  const navigation = useNavigation();

  async function fetchRefeicao() {
    try {
      const data = await refeicaoGetAll();

      if (data.length > 0) {
        const insideDiet = data.filter(refeicao => refeicao.isDieta).length;
        const calculatedPercent = (insideDiet / data.length) * 100;
        setPercent(calculatedPercent.toFixed(2).replace('.', ','));
      }

      const sections = data
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        .reduce((acc: SectionData[], refeicao) => {
          const date = new Date(refeicao.data);
          const dateString = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`;

          const section = acc.find(s => s.title === dateString);

          if (section) {
            section.data.push(refeicao);
          } else {
            acc.push({ title: dateString, data: [refeicao] });
          }

          return acc;
        }, []);

      setRefeicao(sections);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNewRefeicao() {
    navigation.navigate('new');
  }

  useFocusEffect(useCallback(() => {
    fetchRefeicao();
  }, []));

  return (
    <View style={styles.container}>
      <HomeHeader />

      <PercentCard
        percent={percent}
        onPress={() => navigation.navigate('statistics')}
      />

      <Text style={styles.sectionTitle}>Refeições</Text>

      <Button
        title="Nova refeição"
        icon={<PlusIcon color={theme.COLORS.WHITE} size={18} />}
        onPress={handleNewRefeicao}
        style={{ marginBottom: 32 }}
      />

      <SectionList
        sections={refeicao}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealItem
            name={item.nome}
            time={new Date(item.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            isInsideDiet={item.isDieta}
            onPress={() => navigation.navigate('refeicao', { id: item.id })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.dateTitle}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.GRAY_7,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_1,
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    marginTop: 32,
    marginBottom: 8,
  }
});
