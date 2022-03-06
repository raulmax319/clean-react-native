import styled from 'styled-components/native';

type TabProps = {
  selected?: boolean;
};

export const Container = styled.View`
  flex-direction: row;
`;

export const TabItem = styled.View<TabProps>`
  border-bottom-width: 3px;
  border-bottom-color: ${(props) => props.theme.colors.border};

  ${(props) =>
    props.selected &&
    `
    border-bottom-color: ${props.theme.colors.activeBorder};
  `}
`;

export const Label = styled.Text<TabProps>`
  font-size: 16px;
  font-weight: 900;
  padding: 15px 30px 15px 10px;
  color: ${(props) => props.theme.colors.border};

  ${(props) =>
    props.selected &&
    `
    color: ${props.theme.colors.activeBorder};
  `}
`;
