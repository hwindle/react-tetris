import { useState } from 'react';
import { randomPiece } from '../tetrisPieces';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    piece: randomPiece().shape,
    collided: false,
  });

  return [player];
};