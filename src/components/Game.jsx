import { useState } from 'react'
import Board from './Board';
import {shuffle} from '../helper';

export default function Game() {
  const generateTiles = () => {
    const tiles = [
      { value: 'A', completed: false },
      { value: 'A', completed: false },
      { value: 'B', completed: false },
      { value: 'B', completed: false },
      { value: 'C', completed: false },
      { value: 'C', completed: false },
      { value: 'D', completed: false },
      { value: 'D', completed: false },
      { value: 'E', completed: false },
      { value: 'E', completed: false },
      { value: 'F', completed: false },
      { value: 'F', completed: false },
      { value: 'G', completed: false },
      { value: 'G', completed: false },
      { value: 'H', completed: false },
      { value: 'H', completed: false },
    ];
    return shuffle(tiles);
  };

  /**
   * Game state: 
   *  - 8 letters in pairs 
   *  - clickCount 
   *  - score
   *  - clicks: array that tracks the recent two clicks 
   */

  const [clickCount, setClickCount] = useState(0);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState(generateTiles());
  const [clicks, setClicks] = useState([]);


  const handleTileClick = (index) => {
    /**
     * if the two recent clicks match: 
     *  - increase the score by 10 
     * else: 
     *  - decrease the score by -2
     * increase the clickCount by 1 
     */
  }

  return (
    <div className="flex flex-col items-center container px-4 max-w-screen-md mx-auto gap-y-4">
      {/* Heading */}
      <h1 className="font-bold text-4xl">Memory Game</h1>

      {/* Game Instructions */}
      <div className="bg-cyan-100 text-cyan-900 py-4 px-6 rounded-md">
        <p>How to play: Click a Card and then try to match it.</p>
        <p>Each match earns 10 points, and mismatch loses 2 points</p>
        <p className="italic font-extrabold mt-4">Good Luck!</p>
      </div>

      {/* Board */}
      <Board tiles={tiles} />

      {/* Clicks */}
      <div className="bg-cyan-100 text-cyan-900 py-4 px-6 rounded-md w-full">
        Clicks: <strong>{ clickCount }</strong>
      </div>

      {/* Score */}
      <div className="bg-green-200 text-green-900 py-4 px-6 rounded-md w-full">
        Score: <strong>{ score }</strong>
      </div>

      {/* Restart Button */}
      <button className="bg-yellow-500 px-4 py-2 rounded-md self-start">
        Restart
      </button>
    </div>
  );
}