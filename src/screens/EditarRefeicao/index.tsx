import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Platform, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import theme from '../../theme';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Option } from '../../components/Option';
import { Button } from '../../components/Button';
import { refeicaoGetById } from '../../storage/refeicao/refeicaoGetById';
import { refeicaoUpdate } from '../../storage/refeicao/refeicaoUpdate';
import { Loading } from '../../components/Loading';

type RouteParams = {
  id: string;
};

export function EditarRefeicao() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [isDieta, setIsDieta] = useState<boolean | null>(null);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  async function fetchRefeicao() {
    try {
      setIsLoading(true);
      const data = await refeicaoGetById(id);
      
      if (data) {
        setNome(data.nome);
        setDescricao(data.descricao);
        setIsDieta(data.isDieta);
        
        const dateObj = new Date(data.data);
        setDate(dateObj);
        
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(-2);
        setData(`${day}.${month}.${year}`);
        
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        setHora(`${hours}:${minutes}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Editar', 'Não foi possível carregar os dados da refeição.');
    } finally {
      setIsLoading(false);
    }
  }

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear()).slice(-2);
    setData(`${day}.${month}.${year}`);
  }

  function onTimeChange(event: DateTimePickerEvent, selectedDate?: Date) {
    const currentDate = selectedDate || date;
    setShowTimePicker(Platform.OS === 'ios');
    setDate(currentDate);

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    setHora(`${hours}:${minutes}`);
  }

  async function handleSave() {
    if (nome.trim().length === 0 || isDieta === null) {
      return Alert.alert('Editar', 'Informe o nome da refeição e se está na dieta.');
    }

    try {
      const dataParts = data.split('.');
      const horaParts = hora.split(':');
      
      let year = Number(dataParts[2]);
      if (year < 100) {
        year += 2000;
      }
      
      const formattedDate = new Date(
        year, 
        Number(dataParts[1]) - 1, 
        Number(dataParts[0]), 
        Number(horaParts[0]), 
        Number(horaParts[1])
      );

      await refeicaoUpdate({
        id,
        nome,
        descricao,
        data: formattedDate,
        isDieta,
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert('Editar', 'Não foi possível salvar as alterações.');
    }
  }

  useEffect(() => {
    fetchRefeicao();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header title="Editar refeição" />

      <ScrollView 
        style={styles.form}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Input 
          label="Nome" 
          value={nome}
          onChangeText={setNome}
        />

        <Input 
          label="Descrição" 
          multiline 
          numberOfLines={4}
          value={descricao}
          onChangeText={setDescricao}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 20 }}>
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => Platform.OS !== 'web' && setShowDatePicker(true)} 
              disabled={Platform.OS === 'web'}
            >
              <Input 
                label="Data" 
                value={data}
                onChangeText={setData}
                placeholder="DD.MM.YY"
                editable={Platform.OS === 'web'}
                pointerEvents={Platform.OS === 'web' ? 'auto' : 'none'}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => Platform.OS !== 'web' && setShowTimePicker(true)} 
              disabled={Platform.OS === 'web'}
            >
              <Input 
                label="Hora" 
                value={hora}
                onChangeText={setHora}
                placeholder="HH:MM"
                editable={Platform.OS === 'web'}
                pointerEvents={Platform.OS === 'web' ? 'auto' : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {Platform.OS !== 'web' && showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {Platform.OS !== 'web' && showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            is24Hour={true}
            onChange={onTimeChange}
          />
        )}

        <View style={styles.isDietaLabelContainer}>
          <Text style={styles.isDietaLabel}>Está dentro da dieta?</Text>
        </View>

        <View style={styles.isDieta}>
          <Option 
            title="Sim" 
            type="SUCCESS" 
            isActive={isDieta === true}
            onPress={() => setIsDieta(true)}
            style={{ marginRight: 8 }}
          />

          <Option 
            title="Não" 
            type="DANGER" 
            isActive={isDieta === false}
            onPress={() => setIsDieta(false)}
          />
        </View>

        <View style={{ flex: 1 }} />

        <Button 
          title="Salvar alterações" 
          onPress={handleSave}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.GRAY_7,
  },
  form: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
  },
  isDietaLabelContainer: {
    marginBottom: 8,
  },
  isDietaLabel: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_2,
  },
  isDieta: {
    flexDirection: 'row',
    marginBottom: 40,
  }
});
