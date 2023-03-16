import React, { useState } from 'react';
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelpers';
// custom hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
  // setting state
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  // get player and stage
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');
  /***
   * Functions for player movement
   */
  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    console.log('Restarted game');
    // reset everything
    setDropTime(1000);
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('Game Over!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
        console.log('Interval (speed) back on');

      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    console.log('Interval (speed) off');
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // left
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        // right
        movePlayer(1);
      } else if (keyCode === 40) {
        // down arrow - drop piece down
        dropPlayer();
      } else if (keyCode === 38) {
        // up arrow - player rotate
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        {/* Game info */}
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text={'Game Over'} />
          ) : (
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
