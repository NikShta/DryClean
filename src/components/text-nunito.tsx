import {useMemo} from 'react';
import {Text} from 'react-native';
import {TTextNunitoProps} from '../types';

function TextNunito({
  children,
  weight = 'Regular',
  styles,
}: TTextNunitoProps): JSX.Element {
  const fontFamily = useMemo(
    () => ({fontFamily: `Nunito-${weight}`}),
    [weight],
  );

  return <Text style={[styles, fontFamily]}>{children}</Text>;
}

export default TextNunito;
