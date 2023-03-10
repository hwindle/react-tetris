import { useCallback, useState } from 'react';
import { STAGE_WIDTH } from '../gameHelpers';
import { PIECES, randomPiece } from '../tetrisPieces';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    piece: PIECES[0].shape,
    collided: false,
  });

  // update where the piece should be
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  // useCallback is used to prevent an infinite loop
  // or too many re-renders.
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      piece: randomPiece().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};