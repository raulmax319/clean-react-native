import React from 'react';
import {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { Label, Button } from './primary-button.styles';

const PrimaryButton: React.FC<PressableProps> = ({ children, ...props }) => {
  const { colors } = useTheme();

  return (
    <Button
      /* c8 ignore next 3 */
      style={(state: PressableStateCallbackType): StyleProp<ViewStyle> => ({
        ...(state.pressed && { backgroundColor: colors.highlight }),
      })}
      {...props}
      testID="primary-button"
    >
      <Label disabled={props.disabled}>{children}</Label>
    </Button>
  );
};

export default PrimaryButton;
