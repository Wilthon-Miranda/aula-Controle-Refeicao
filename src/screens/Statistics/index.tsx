import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'phosphor-react-native';
import theme from '../../theme';

import { refeicaoGetAll } from '../../storage/refeicao/refeicaoGetAll';

export function Statistics() {
  const [totalMeals, setTotalMeals] = useState(0);
  const [mealsInsideDiet, setMealsInsideDiet] = useState(0);
  const [mealsOutsideDiet, setMealsOutsideDiet] = useState(0);
  const [bestSequence, setBestSequence] = useState(0);
  const [percent, setPercent] = useState('0,00');

  const navigation = useNavigation();

  async function fetchStatistics() {
    try {
      const data = await refeicaoGetAll();
      const total = data.length;

      if (total > 0) {
        const inside = data.filter(r => r.isDieta).length;
        const outside = total - inside;
        const calculatedPercent = (inside / total) * 100;

        setTotalMeals(total);
        setMealsInsideDiet(inside);
        setMealsOutsideDiet(outside);
        setPercent(calculatedPercent.toFixed(2).replace('.', ','));

        const sortedData = [...data].sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        let currentStreak = 0;
        let maxStreak = 0;

        sortedData.forEach(item => {
          if (item.isDieta) {
            currentStreak++;
            if (currentStreak > maxStreak) {
              maxStreak = currentStreak;
            }
          } else {
            currentStreak = 0;
          }
        });

        setBestSequence(maxStreak);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchStatistics();
  }, []));

  const isHealthy = parseFloat(percent.replace(',', '.')) >= 50;

  return (
    <View style={[
      styles.container,
      { backgroundColor: isHealthy ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT }
    ]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft
            size={24}
            color={isHealthy ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK}
          />
        </TouchableOpacity>

        <Text style={styles.percentTitle}>{percent}%</Text>
        <Text style={styles.percentSubtitle}>das refeições dentro da dieta</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Estatísticas gerais</Text>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{bestSequence}</Text>
          <Text style={styles.cardText}>melhor sequência de pratos dentro da dieta</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardNumber}>{totalMeals}</Text>
          <Text style={styles.cardText}>refeições registradas</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.card, { flex: 1, backgroundColor: theme.COLORS.GREEN_LIGHT, marginRight: 12 }]}>
            <Text style={styles.cardNumber}>{mealsInsideDiet}</Text>
            <Text style={styles.cardText}>refeições dentro da dieta</Text>
          </View>

          <View style={[styles.card, { flex: 1, backgroundColor: theme.COLORS.RED_LIGHT }]}>
            <Text style={styles.cardNumber}>{mealsOutsideDiet}</Text>
            <Text style={styles.cardText}>refeições fora da dieta</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 32,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 24,
  },
  percentTitle: {
    fontSize: theme.FONT_SIZE.XXL,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
  },
  percentSubtitle: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
  },
  content: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    marginBottom: 24,
    marginTop: 8,
  },
  card: {
    width: '100%',
    backgroundColor: theme.COLORS.GRAY_6,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardNumber: {
    fontSize: theme.FONT_SIZE.XL,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_1,
    marginBottom: 8,
  },
  cardText: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_2,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  }
});
