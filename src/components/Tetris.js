import React from 'react';
import Display from './Display';
import Stage from './Stage';
import StartButton from './StartButton';
// import helper functions
import { createStage } from '../gameHelpers';

const Tetris = () => {
  return (
    <section>
      <Stage stage={createStage()} />
      {/* Game info */}
      <aside>
        <div>
          <Display text='Score' />
          <Display text='Rows' />
          <Display text='Level' />
        </div>
        <StartButton />
      </aside>
    </section>
  );
};

export default Tetris;