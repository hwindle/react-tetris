import React, { useState } from 'react';
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  // setting state
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  // get player and stage
  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');

  return (
    <StyledTetrisWrapper>
      <StyledTetris>
        <Stage stage={stage} />
        {/* Game info */}
        <aside>
          {gameOver ? 
            <Display gameOver={gameOver} text={'Game Over'} />  
          : (
          <div>
            <Display text='Score' />
            <Display text='Rows' />
            <Display text='Level' />
          </div>
          )}
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
