// stage width, height
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => {
  return Array.from(
    // get the height first
    Array(STAGE_HEIGHT), () => (
      // second dimension, contains another array
      // with 0 or the letters for a piece if filled,
      // and clear for when no pieces are there.
      new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
  );
}