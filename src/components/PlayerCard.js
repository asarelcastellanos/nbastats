import React from "react";

// Material UI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(
  "https://nba-players.herokuapp.com/players/brooks/marshon",
  requestOptions
)
  .then((response) => response.text())
  .then((result) =>
    result == "Sorry, that player was not found. Please check the spelling."
      ? console.log("This works!")
      : console.log("This image doesnt exit")
  )
  .catch((error) => console.log("error", error));

export default function PlayerCard({ firstName, lastName, team, position }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body" gutterBottom>
          {team}
        </Typography>
        <Typography variant="h5">{firstName + " " + lastName}</Typography>
        <Typography variant="p">Position: {position}</Typography>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`}
          alt={firstName}
        />
      </CardContent>
    </Card>
  );
}
