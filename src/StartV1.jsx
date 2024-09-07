import { Link, useNavigate } from "react-router-dom";
import { usePlayersContext } from "./PlayersContext";

function Start() {
  const { allPlayers, player1, player2, handlePlayer } = usePlayersContext();
  const navigate = useNavigate();

  function handleAddPlayers(e) {
    e.preventDefault();
  }

  function handleStart(e) {
    e.preventDefault();
    if (player1.name === "" || player2.name === "") return; // if no players
    navigate("game");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[25rem] h-[25rem]">
      <h1 className="text-[2.5rem] font-bold">Add Players 🎮</h1>

      {/* FORM */}
      <form className="flex flex-col gap-3 w-[100%]">
        {allPlayers.map((player) => (
          <PlayerForm player={player} onPlayer={handlePlayer} key={player.id} />
        ))}

        {/* BUTTONS */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            onClick={handleAddPlayers}
            className="bg-yellow-400 w-[100%] text-xl font-semibold px-3 py-5 rounded-lg"
          >
            + Add more
          </button>

          <button
            onClick={handleStart}
            className="bg-red-500 w-[100%] text-xl font-semibold px-3 py-5 rounded-lg"
          >
            Start
          </button>

          <Link to={"/"}>
            <button className="bg-slate-300 w-[100%] text-xl font-semibold px-3 py-5 rounded-lg">
              Go back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

function PlayerForm({ player, onPlayer }) {
  return (
    <div>
      <label htmlFor={`player${player.id}`} className="font-medium">
        {`Player ${player.id}`}
      </label>
      <br />
      <input
        placeholder="Player name"
        value={player.name}
        onChange={(e) => onPlayer(e.target.value, player.id)}
        type="text"
        id={`player${player.id}`}
        className="w-[100%] p-2 bg-slate-200 rounded-md"
      />
    </div>
  );
}

export default Start;
