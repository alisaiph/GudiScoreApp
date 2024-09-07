import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayersContext } from "./PlayersContext";

function Gameplay() {
  const { allPlayers, handleResetCurr, handleReset } = usePlayersContext();
  const [numMatch, setNumMatch] = useState(1);
  const [isWinner, setIsWinner] = useState(false);
  const [modal, setModal] = useState(false);
  const activePlayers = allPlayers.filter((player) => player.lost === false);
  const navigate = useNavigate();

  function handleModal() {
    setModal((value) => !value);
  }

  function handleEndRound() {
    handleResetCurr();
    handleModal();
  }

  function handleWinner() {
    if (activePlayers.length === 1) setIsWinner(true);
  }

  function handleQuit() {
    handleReset();
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-[50rem] h-[50rem]">
      {modal && (
        <Modal handleModal={handleModal} activePlayers={activePlayers} onWinner={handleWinner} />
      )}

      <header className="w-[100%] flex items-center justify-between">
        <h1 className="text-3xl font-bold">♣ GUDI ♠</h1>
        <h2 className="text-xl font-medium">Match: {numMatch}</h2>
      </header>

      <section className="w-[100%] flex flex-col gap-5">
        {allPlayers.map((player) => (
          <PlayerCard player={player} key={player.id} />
        ))}

        {isWinner && <Winner>{activePlayers[0].name} won the game! 👏</Winner>}
      </section>

      <div className="flex gap-3">
        <button
          onClick={handleQuit}
          className="bg-slate-300 text-xl font-semibold px-5 py-5 rounded-lg"
        >
          Quit
        </button>

        {!isWinner && (
          <button
            onClick={handleEndRound}
            className="bg-green-500 text-xl font-semibold px-5 py-5 rounded-lg"
          >
            End round
          </button>
        )}
      </div>
    </div>
  );
}

function PlayerCard({ player }) {
  return (
    <div
      className={`${
        player.totalScore >= 200 ? "bg-red-500" : "bg-white"
      } flex items-center justify-around text-xl gap-5 p-5 rounded-lg`}
    >
      <h3 className="font-medium">
        {player.totalScore >= 200 ? "💩" : ""} {player.name}
      </h3>
      <p>score: {player.totalScore}</p>
      <p>wins: x</p>
      <progress value={player.totalScore} max={200}></progress>
    </div>
  );
}

function Modal({ handleModal, activePlayers, onWinner }) {
  const { handleCurrScore, handleTotalScore } = usePlayersContext();

  function handleNext() {
    handleTotalScore(); // add total scores
    onWinner(); // check if there is a winner
    handleModal();
  }

  return (
    <section className="bg-slate-700/80 absolute flex items-center justify-center w-[100%] h-lvh">
      <div className="bg-slate-100 w-[30rem] p-7 flex flex-col gap-2 items-center justify-center rounded-lg">
        <h2 className="font-medium text-2xl mb-3">Set the scores! 🎉</h2>

        {activePlayers.map((player) => (
          <PlayerScore player={player} key={player.name} onCurrScore={handleCurrScore} />
        ))}

        <button
          onClick={handleNext}
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
        onChange={(e) => onCurrScore(e.target.value, player.id)}
      />
    </div>
  );
}

function Winner({ children }) {
  return (
    <div className="bg-blue-500 h-[10rem] flex items-center justify-center rounded-lg">
      <h1 className="font-medium text-[3rem]">{children}</h1>
    </div>
  );
}

export default Gameplay;
