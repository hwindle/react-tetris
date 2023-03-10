import { useCallback, useState } from 'react';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';
import { PIECES, randomPiece } from '../tetrisPieces';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    piece: PIECES[0].shape,
    collided: false,
  });

  // rotate a piece
  const rotate = (matrix, dir) => {
    // make the rows become the columns
    const rotatedPiece = matrix.map((_, index) =>
      matrix.map((col) => col[index])
    );
    // shift  the letter values backwards (mirror image)
    // rotating clockwise 
    if (dir > 0) return rotatedPiece.map(row => row.reverse());
    // rotating anti-clockwise
    return rotatedPiece.reverse();
  };

  const playerRotate = (stage, dir) => {
    // not mutating state - deep copy of player
    const clonedPlayer  = JSON.parse(JSON.stringify(player));
    clonedPlayer.piece = rotate(clonedPlayer.piece, dir);
    // collision detection
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      // this checks for a collision left and right, so pieces
      // don't get deformed
      clonedPlayer.pos.x += offset;
      // going left 1, right 1
      offset = -(offset + (offset > 0 ? 1 : -1));
      // checking whether the offset is bigger than the piece 1st row width.
      if (offset > clonedPlayer.piece[0].length) {
        rotate(clonedPlayer.piece, -dir);
        // reset the row position
        clonedPlayer.pos.x = pos;
        // break while loop
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  // update where the piece should be
  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
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

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
