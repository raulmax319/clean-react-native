import React from 'react';
import { Label, Button } from './primary-button.styles';

type PrimaryButtonProps = {
  onPress: () => void;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => (
  <Button
    style={({ pressed }) => ({
      ...(pressed && { backgroundColor: '#C63E54' }),
    })}
    {...props}
  >
    <Label>{children}</Label>
  </Button>
);
