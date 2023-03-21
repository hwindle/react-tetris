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
import { useGameStatus } from '../hooks/useGameStatus';

const Tetris = () => {
  // setting state
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  // get player and stage
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  // get scores, levels etc
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

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
    setRows(0);
    setLevel(0);
    setScore(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

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
        setDropTime(1000 / (level + 1) + 200);
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
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
