import {useState} from 'react';
import {TextInput} from 'react-native';
import {TTextInputComponentProps} from '../types';

function TextInputComponent({
  onChangeText,
  styles,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  value = '',
  keyboardType = 'default',
}: TTextInputComponentProps): JSX.Element {
  const [isFocus, setIsFocus] = useState(false);

  const onFocusInput = () => setIsFocus(true);
  const onBlurInput = () => setIsFocus(false);
  const getBorderColor = (flag: boolean) => ({
    borderColor: flag ? '#609966' : '#6B728E',
  });

  return (
    <TextInput
      value={value}
      onFocus={onFocusInput}
      onBlur={onBlurInput}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize="none"
      style={[styles, getBorderColor(isFocus)]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      keyboardType={keyboardType}
    />
  );
}

export default TextInputComponent;
