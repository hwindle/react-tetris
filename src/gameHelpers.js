// stage width, height
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  return Array.from(
    // get the height first
    Array(STAGE_HEIGHT),
    () =>
      // second dimension, contains another array
      // with 0 or the letters for a piece if filled,
      // and clear for when no pieces are there.
      new Array(STAGE_WIDTH).fill([0, 'clear'])
  );
};

// check whether the tetris piece has gone too far left or right
// of the playing field.
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.piece.length; y++) {
    for (let x = 0; x < player.piece[y].length; x++) {
      // check if tetris piece is there
      if (player.piece[y][x] !== 0) {
        if (
          // check the move is within the height (y value)
          !stage[y + player.pos.y + moveY] ||
          // check that the move is within the game area width (x)
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // check the cell that we're moving to is not 'clear'
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            'clear'
        ) {
          return true;
        }
      }
    }
  }
};
