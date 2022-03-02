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


  /**
   * Do something when a tile is clicked
   * @param {int} index index of the tile being clicked
   * 
   * 1. increase clickCount
   * 2. - the first click: 
   *      1. reveal the tile
   *    - the second click: 
   *      - reveal the tile 
   *      - if matches with the first click: 
   *        1. mark both tiles as completed 
   *        2. reavel the tile for 1s
   *        3. reset clicks
   *        4. increase score by 10
   *      - mismatch with first click: 
   *        1. reset clicks
   *        2. decrease the score by 2
   *        3. reveal the tile for 1s
   *    - more than two clicks: ignore it 
   */
  const handleTileClick = (index) => {
    // third click: ignore 
    if (clicks.length === 2) return;

    // increase the clickCount
    setClickCount(clickCount + 1);

    // first click: 
    if (clicks.length === 0) {
      setClicks([index]);
      return;
    }

    // second click:
    setClicks(clicks.concat([index]));
    // match
    if (tiles[index].value === tiles[clicks[0]].value) {
      const newTiles = tiles.slice();
      newTiles[index].completed = true;
      newTiles[clicks[0]].completed = true;
      setTiles(newTiles);
      setScore(score + 10);
    } else {
      setScore(score - 2);
    }

    // hide letters after 1s. 
    // INFO: basically clear the clicks array, since only tiles inside the clicks array are revealed 
    setTimeout(() => {
      setClicks([]);
    }, 1000);
  }

  const restartGame = () => {
    /**
     * TODO: restart the game 
     */
    setClickCount(0);
    setScore(0);
    setTiles(generateTiles());
    setClicks([]);
  };

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
      <Board tiles={tiles} handleTileClick={handleTileClick} clicks={clicks} />

      {/* Clicks */}
      <div className="bg-cyan-100 text-cyan-900 py-4 px-6 rounded-md w-full">
        Clicks: <strong>{ clickCount }</strong>
      </div>

      {/* Score */}
      <div className="bg-green-200 text-green-900 py-4 px-6 rounded-md w-full">
        Score: <strong>{ score }</strong>
      </div>

      {/* Restart Button */}
      <button className="bg-yellow-500 px-4 py-2 rounded-md self-start" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
}