import React from "react";

// Material UI Components
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PlayerCard({ firstName, lastName, team, position }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body" gutterBottom>
          Current Team: {team}
        </Typography>
        <Typography variant="h5">{firstName + " " + lastName}</Typography>
        <Typography variant="p">Position: {position}</Typography>
      </CardContent>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`https://nba-players.herokuapp.com/players/${lastName}/${firstName}`}
        alt={firstName}
      /> */}
    </Card>
  );
}
