import { Modal, ModalProps, View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';
import { Button } from '../Button';

type Props = ModalProps & {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ title, onConfirm, onCancel, ...rest }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.footer}>
            <Button 
              title="Cancelar" 
              type="SECONDARY"
              onPress={onCancel}
              style={{ flex: 1, marginRight: 12 }}
            />
            <Button 
              title="Sim, excluir" 
              onPress={onConfirm}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 8,
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.FONT_SIZE.LG,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_2,
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
  }
});
