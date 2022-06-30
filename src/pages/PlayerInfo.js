import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PlayerInfo() {
  const { id } = useParams();

  const [year, setYear] = useState("2017");

  const [seasonAverage, setSeasonAverage] = useState([]);
  const [player, setPlayer] = useState({})

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  let image = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${id}`
    )
      .then((response) => response.json())
      .then((result) => {
        setSeasonAverage(result.data[0]);
      })
      .catch((error) => console.log(error));

      fetch(
        `https://www.balldontlie.io/api/v1/players/${id}`
      )
        .then((response) => response.json())
        .then((result) => {
          setPlayer(result)
        })
        .catch((error) => console.log(error));
  }, [year]);

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={handleChange}>
            <MenuItem value={"2016"}>2016</MenuItem>
            <MenuItem value={"2017"}>2017</MenuItem>
            <MenuItem value={"2018"}>2018</MenuItem>
            <MenuItem value={"2019"}>2019</MenuItem>
            <MenuItem value={"2020"}>2020</MenuItem>
            <MenuItem value={"2021"}>2021</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div>
        { image ? <img src={image} />  : null}
        <h1>{player.first_name + " " + player.last_name}</h1>
        <h5>Height: {player.height_feet + "" + player.height_inches}</h5>
        <h5>Weight: {player.weight_pounds + "lbs"}</h5>
        <h6>Position: {player.position}</h6>
      </div>
      <div>
        <h1>Season Average of {year}</h1>
        <p>
          Total Games Played:{" "}
          {seasonAverage?.games_played == null
            ? "No Data Available"
            : seasonAverage.games_played}
        </p>
        <p>
          Average Minutes Played:{" "}
          {seasonAverage?.min == null ? "No Data Available" : seasonAverage.min}
        </p>
        <p>
          Average Points Per Game:{" "}
          {seasonAverage?.pts == null ? "No Data Available" : seasonAverage.pts}
        </p>
        <p>
          Average Assists Per Game:{" "}
          {seasonAverage?.ast == null ? "No Data Available" : seasonAverage.ast}
        </p>
        <p>
          Average Rebounds Per Game:{" "}
          {seasonAverage?.reb == null
            ? "No Data Available"
            : seasonAverage.reb}
        </p>
        <p>
          Average Steals Per Game:{" "}
          {seasonAverage?.stl == null ? "No Data Available" : seasonAverage.stl}
        </p>
        <p>
          Average Blocks Per Game:{" "}
          {seasonAverage?.blk == null ? "No Data Available" : seasonAverage.blk}
        </p>
        <p>
          Average Turnovers Per Game:{" "}
          {seasonAverage?.turnover == null
            ? "No Data Available"
            : seasonAverage.turnover}
        </p>
      </div>
    </>
  );
}
