import React from 'react';
import { useTheme } from 'styled-components/native';
import { Label, Button } from './primary-button.styles';

type PrimaryButtonProps = {
  onPress: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <Button
      style={({ pressed }) => ({
        ...(pressed && { backgroundColor: colors.highlight }),
      })}
      {...props}
    >
      <Label>{children}</Label>
    </Button>
  );
};

export default PrimaryButton;
