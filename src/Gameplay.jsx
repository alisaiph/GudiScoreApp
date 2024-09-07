import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayersContext } from "./PlayersContext";

function Gameplay() {
  const { players, setPlayers, handleResetCurr, handleReset } = usePlayersContext();
  const [numMatch, setNumMatch] = useState(1);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const activePlayers = players.filter((player) => player.lost === false); // losers removed
  const winner = activePlayers.length === 1 ? activePlayers[0] : ""; // set winner

  function handleModal() {
    setModal((value) => !value);
  }

  function handleEndRound() {
    handleResetCurr();
    handleModal();
  }

  function handleAddWin() {
    if (activePlayers.length > 1) return; // if no winner, dont execute
    console.log(`${winner.name} won!`);

    // setPlayers((players) =>
    //   players.map((player) => {
    //     if (player.name === winner.name) {
    //       return {
    //         ...player,
    //         wins: player.wins + 1,
    //       };
    //     } else {
    //       return player;
    //     }
    //   })
    // );
  }

  function handleNextGame() {
    setNumMatch((num) => num + 1);

    // reset all players back (activePlayers reset too, meaning no winner as well)
    setPlayers((players) =>
      players.map((player) => {
        return {
          ...player,
          lost: false,
          totalScore: 0,
        };
      })
    );
  }

  function handleQuit() {
    handleReset();
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[50rem] h-[50rem]">
      {modal && (
        <Modal handleModal={handleModal} activePlayers={activePlayers} onAddWin={handleAddWin} />
      )}

      <header className="w-[100%] flex items-center justify-between px-8">
        <h1 className="text-3xl font-bold">♣ GUDI ♠</h1>
        <h2 className="text-xl font-medium">Match: {numMatch}</h2>
      </header>

      <section className="w-[90%] flex flex-col gap-5">
        {players.map((player) => (
          <PlayerCard player={player} key={player.name} winner={winner} />
        ))}

        {winner && <Winner>{winner.name} won the game! 👏</Winner>}
      </section>

      <div className="flex gap-3">
        <button
          onClick={handleQuit}
          className="bg-slate-300 text-xl font-semibold px-5 py-5 rounded-lg"
        >
          Quit
        </button>

        {!winner && (
          <button
            onClick={handleEndRound}
            className="bg-green-500 text-xl font-semibold px-5 py-5 rounded-lg"
          >
            End round
          </button>
        )}

        {winner && (
          <button
            onClick={handleNextGame}
            className="bg-green-500 text-xl font-semibold px-5 py-5 rounded-lg"
          >
            Next game
          </button>
        )}
      </div>
    </div>
  );
}

function PlayerCard({ player, winner }) {
  return (
    <div
      className={`${
        player.totalScore >= 200 ? "bg-red-500" : "bg-white"
      } flex items-center justify-around text-xl gap-5 p-5 rounded-lg`}
    >
      <h3 className="font-medium">
        {player.name} {player.totalScore >= 200 ? "💩" : ""}{" "}
        {player.name === winner.name ? "🥇" : ""}
      </h3>
      <p>score: {player.totalScore}</p>
      <p>wins: {player.wins}</p>
      <progress value={player.totalScore} max={200}></progress>
    </div>
  );
}

function Modal({ handleModal, activePlayers, onAddWin }) {
  const { handleCurrScore, handleTotalScore, handleLost } = usePlayersContext();

  function handleNextRound() {
    handleTotalScore(); // add total scores
    handleLost(); // check for losers
    onAddWin(); // add the wins to the player won
    handleModal();
  }

  return (
    <section className="bg-slate-700/80 absolute flex items-center justify-center w-[100%] h-lvh">
      <div className="bg-slate-100 w-[30rem] p-7 flex flex-col gap-2 items-center justify-center rounded-lg">
        <h2 className="font-medium text-2xl mb-3">Set the scores! 🎉</h2>

        {activePlayers.map((player) => (
          <PlayerScore player={player} key={`K${player.name}`} onCurrScore={handleCurrScore} />
        ))}

        <button
          onClick={handleNextRound}
          className="bg-green-500 text-xl font-semibold px-[5rem] py-5 mt-3 rounded-lg"
        >
          Next
        </button>
      </div>
    </section>
  );
}

function PlayerScore({ player, onCurrScore }) {
  return (
    <div className="bg-white w-[100%] flex items-center justify-around text-xl gap-5 p-5 rounded-lg">
      <h3 className="font-medium">{player.name}</h3>
      <input
        type="number"
        placeholder="New score"
        value={player.currScore}
        onChange={(e) => onCurrScore(e.target.value, player.name)}
      />
    </div>
  );
}

function Winner({ children }) {
  return (
    <div className="bg-blue-500 h-[10rem] flex items-center justify-center text-center rounded-lg">
      <h1 className="font-medium text-[2rem]">{children}</h1>
    </div>
  );
}

export default Gameplay;

// MISTAKES WHILE DOING THIS PROJECT:
// - Using too much states, even when I could have used derived states, which resulted in some states not being updated/not in sync.
// - Handler functions are a little spagetti, make it clear and concise
