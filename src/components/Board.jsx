export default function Board(props) {
  const { tiles } = props; // object destruct 
  
  
  return <div className="grid grid-cols-4 grid-rows-4">
    {
      tiles.map((tile) => {
        const {value, completed} = tile;
        return <button className="w-20 h-20 outline outline-gray-200 rounded-md font-bold text-3xl" onClick={() => {}}>
          {value}
        </button>
      })
    }
  </div>;
}