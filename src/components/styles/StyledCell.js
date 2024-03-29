import styled from 'styled-components';

export const StyledCell = styled.div`
  width: auto;
  height: auto;
  background: rgba(${props => props.colour}, 0.8);
  border: ${props => (props.type === 0 ? 'none' : '4px solid')};
  border-bottom-color: rgba(${props => props.colour}, 0.1);
  border-top-color: rgba(${props => props.colour}, 1);
  border-right-color: rgba(${props => props.colour}, 1);
  border-left-color: rgba(${props => props.colour}, 0.3);
  border-radius: 4px;
  margin: 0;
`;