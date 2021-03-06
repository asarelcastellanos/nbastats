import React from "react";
import { useEffect, useState } from "react";

// Components
import PlayerCard from "../components/PlayerCard";

// Material UI Components
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useNavigate } from "react-router-dom";

import logo from "../assets/nbaLogo.png";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/players?search=${searchTerm.replace(
        " ",
        "_"
      )}&season=2017&page=${1}`,
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setPlayers(result.data);
      })
      .catch((error) => console.log(error));
  }, [searchTerm]);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <img src={logo} width="100px" height="200px" />
        <Typography variant="h2">Welcome to NBA Stats!</Typography>
      </Stack>
      <TextField
        sx={{
          mt: "25px",
        }}
        fullWidth
        id="outlined-basic"
        label="Ex: Stephen Curry"
        variant="outlined"
        onChange={(e) => {
          let value = e.target.value;
          value.toLowerCase();
          setSearchTerm(value);
        }}
        value={searchTerm}
      />
      <Grid
        container
        spacing={5}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          my: "10px",
        }}
      >
        {players?.map((player) => (
          <Grid
            onClick={() => {
              console.log(player.id);
              navigate(`/playerinfo/${player.id}`);
            }}
            key={player.id}
            item
            xs={7}
            md={4}
            lg={3}
          >
            <PlayerCard
              firstName={player.first_name}
              lastName={player.last_name}
              team={player.team.full_name}
              position={
                player.position === "" ? "No Data Available" : player.position
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
