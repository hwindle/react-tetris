import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { PIECES } from '../tetrisPieces';

const Cell = ({ type }) => (
  <StyledCell type={type} colour={PIECES[type].colour}></StyledCell>
);

export default React.memo(Cell);