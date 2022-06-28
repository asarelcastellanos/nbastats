import { useEffect, useState } from "react";
import "./App.css";

function App() {

  let placeholder = ""; 

  const [players, setPlayers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`https://www.balldontlie.io/api/v1/players?search=${searchTerm.replace(' ', '_')}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setPlayers(result.data))
      .catch((error) => console.log("error", error));
  }, [searchTerm]);

  return (
    <div>
      <form>
        <label>Find Player</label>
        <input onChange={(e) => {
          let value = e.target.value;
          value.toLowerCase()
          setSearchTerm(value);
        }} value={searchTerm} type="text" name="searchTerm" placeholder="Ex: Lebron James"/>
      </form>
      {players?.map((player) => (
        <div key={player.id}>
          <h1>
            {player.last_name}, {player.first_name}
          </h1>
          <p>{player.team.full_name}</p>
          <p>{player.position === "" ? "No Player Position Avaliable": player.position}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export default App;
