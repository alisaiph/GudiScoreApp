import { createContext, useContext, useState } from "react";

const PlayersContext = createContext();

function PlayersProvider({ children }) {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");

  function handleAddPlayers(e) {
    e.preventDefault();
    if (players.length > 5 || !playerName) return; // max num of players = 6

    const newPlayer = {
      name: playerName,
      currScore: "",
      totalScore: 0,
      wins: 0,
      lost: false,
    };

    setPlayers((players) => [...players, newPlayer]);
    setPlayerName("");
  }

  function handleCurrScore(currScore, name) {
    // update curr score
    setPlayers((players) =>
      players.map((player) => {
        if (player.name === name) {
          return {
            ...player,
            currScore: Number(currScore),
          }; // return updated object if matches player name
        } else {
          return player; // if not player name, leave it as it is
        }
      })
    );
  }

  function handleTotalScore() {
    // update total score
    setPlayers((players) =>
      players.map((player) => {
        return {
          ...player,
          totalScore: player.totalScore + player.currScore, // update totalScore of all objects
        };
      })
    );
  }

  function handleResetCurr() {
    // reset curr score
    setPlayers((players) =>
      players.map((player) => {
        return {
          ...player,
          currScore: "",
        };
      })
    );
  }

  function handleLost() {
    // check if lost
    setPlayers((players) =>
      players.map((player) => {
        return {
          ...player,
          lost: player.totalScore >= 200 ? true : false,
        };
      })
    );
  }

  function handleReset() {
    setPlayers([]);
  }

  return (
    <PlayersContext.Provider
      value={{
        playerName,
        setPlayerName,
        players,
        setPlayers,
        handleAddPlayers,
        handleCurrScore,
        handleTotalScore,
        handleResetCurr,
        handleLost,
        handleReset,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

function usePlayersContext() {
  const context = useContext(PlayersContext);
  if (context === undefined) throw new Error("PlayersContext was used outside the PlayersProvider");
  return context;
}

export { PlayersProvider, usePlayersContext };
