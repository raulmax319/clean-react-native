import styled from 'styled-components/native';

type TabProps = {
  selected?: boolean;
};

export const Container = styled.View`
  flex-direction: row;
`;

export const TabItem = styled.View<TabProps>`
  border-bottom-width: 3px;
  border-bottom-color: #fdfdfd;

  ${(props) =>
    props.selected &&
    `
    border-bottom-color: rgba(0,0,0,0.35);
  `}
`;

export const Label = styled.Text<TabProps>`
  font-size: 16px;
  font-weight: 900;
  padding: 15px 30px 15px 10px;
  color: #fdfdfd;

  ${(props) =>
    props.selected &&
    `
    color: rgba(0,0,0,0.35);
  `}
`;
