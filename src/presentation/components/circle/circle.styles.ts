import styled from 'styled-components/native';

export type CircleProps = {
  small?: boolean;
  top?: boolean;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
};

export const RedCircle = styled.View<CircleProps>`
  width: 350px;
  height: 350px;
  border-radius: 175px;
  background-color: ${(props) => props.theme.colors.primary};
  position: absolute;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  ${({ top }) => top && `top: -150px;`}
  ${({ right }) => right && `right: 0;`}
  ${({ bottom }) => bottom && `bottom: -125px;`}
  ${({ left }) => left && `left: 0;`}

  ${({ small }) =>
    small &&
    `
    width: 250px;
    height: 250px;`}
`;

export const RedCircleSmall = styled.View`
  width: 250px;
  height: 250px;
  border-radius: 175px;
  background-color: ${(props) => props.theme.colors.primary};
  bottom: -125px;
  right: 0;
  position: absolute;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;
