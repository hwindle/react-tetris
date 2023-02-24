import React from 'react';
// import pieces
import Cell from './Cell';

const Stage = ({ stage }) => (
  <div>
    {stage.map((row) => 
      row.map((cell, i) => 
      <Cell key={i} type={cell[0]} />
    ))}
  </div>
);

export default Stage;