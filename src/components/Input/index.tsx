import { useState } from 'react';
import { TextInput, TextInputProps, Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          rest.multiline && { height: 120, textAlignVertical: 'top' }
        ]}
        placeholderTextColor={theme.COLORS.GRAY_4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: theme.FONT_SIZE.SM,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_2,
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: theme.COLORS.GRAY_5,
    borderRadius: 6,
    padding: 14,
    fontSize: theme.FONT_SIZE.MD,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    color: theme.COLORS.GRAY_1,
  },
  inputFocused: {
    borderColor: theme.COLORS.GRAY_3,
  },
});
