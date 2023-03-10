export const PIECES = {
  // blank tetris piece
  0: { shape: [[0]], colour: '0, 0, 0' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0]
    ],
    colour: '158, 85, 159'
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0]
    ],
    colour: '74, 84, 138'
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L']
    ],
    colour: '197, 187, 42'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    colour: '209, 142, 49'
  },
  S: {
    shape: [
      [0, 'S', 'S'], 
      ['S', 'S', 0], 
      [0, 0, 0]
    ],
    colour: '80, 158, 160',
  },
  T: {
    shape: [
      [0, 0, 0], 
      ['T', 'T', 'T'], 
      [0, 'T', 0]
    ],
    colour: '90, 169, 81',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0], 
      [0, 'Z', 'Z'], 
      [0, 0, 0]
    ],
    colour: '183, 51, 33',
  },
};

export const randomPiece = () => {
  const letters = 'IJLOSTZ';
  const randPiece =
    letters[Math.floor(Math.random() * letters.length)];
  return PIECES[randPiece];
};