import { useNavigate } from "react-router-dom";
import { usePlayersContext } from "./PlayersContext";

function Start() {
  const { handleAddPlayers, players, setPlayers } = usePlayersContext();
  const navigate = useNavigate();

  function handleStart(e) {
    e.preventDefault();
    if (players.length < 2) return; // min num player = 2
    navigate("game");
  }

  function handleBack(e) {
    e.preventDefault();
    setPlayers([]);
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[22rem] h-[25rem]">
      <h1 className="text-[2.5rem] font-bold">Add Players 🎮</h1>

      {/* FORM */}
      <form className="flex flex-col gap-3 w-[100%]">
        <PlayerForm />

        <div className="flex gap-3">
          {players.map((player) => (
            <PlayerNames playerName={player.name} key={player.name} />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col gap-2 mt-5">
          <button
            onClick={(e) => handleAddPlayers(e)}
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

          <button
            onClick={handleBack}
            className="bg-slate-300 w-[100%] text-xl font-semibold px-3 py-5 rounded-lg"
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

function PlayerForm() {
  const { playerName, setPlayerName } = usePlayersContext();

  return (
    <div>
      <label htmlFor="playerName" className="font-medium">
        Player Name:
      </label>
      <br />
      <input
        placeholder="Player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        type="text"
        id="playerName"
        className="w-[100%] p-2 bg-slate-200 rounded-md"
      />
    </div>
  );
}

function PlayerNames({ playerName }) {
  return <span className="bg-blue-500 font-medium p-2 mb-5 rounded-md">{playerName}</span>;
}

export default Start;
