import './Board.css';

export default function Board(props) {
  const { tiles, handleTileClick, clicks } = props; // object destruct
  return (
    <div className="grid grid-cols-4 grid-rows-4">
      {tiles.map((tile, index) => {
        /**
         * A tile could have 3 states:
         * - normal: hidden from user, allow click
         * - clicked: show the letter, dark bg, disable click
         * - completed: hide the letter, dark bg, disable click
         */
        const { value, completed } = tile;
        const disabled = clicks.includes(index) || completed;
        const text = clicks.includes(index) ? value : '';
        return (
          <button
            className="tile"
            onClick={() => handleTileClick(index)}
            disabled={disabled}
            key={index}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}
