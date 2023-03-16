import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = newStage => newStage.reduce((acc, row) => {
      // looking for full rows without 0
      if (row.findIndex(cell => cell[0] === 0)  === -1) {
        setRowsCleared(prev => prev + 1);
        // insert value at start of array
        acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
        return acc;
      }
      // empty spaces remaining in row
      acc.push(row);
      return acc;
    }, []);

    const updateStage = (prevStage) => {
      // create a fresh, new stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );
      // draw the new piece for this render
      player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            // row is y, x is the column
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // check player collision with walls, other tetris pieces
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }
      // return newStage render
      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
