'use client';
import { Box, Button } from "@mui/material";
import PromptBox from "@/components/PromptBox";
import TeamCard from "@/components/TeamCard";
import { useState } from "react";

import { parser, balancer, parseToShare } from "@/utils";

export default function Home() {
  const [prompted, setPrompted] = useState(false);
  const [playersList, setPlayersList] = useState('');
  const [teams, setTeams] = useState(null);

  const handlePrompt = () => {
    const parsedData = parser(playersList);
    setTeams(balancer(parsedData));
    setPrompted(true);
  }

  const handleCreateNew = () => {
    setPrompted(false);
    setPlayersList('');
  }

  const handleShare = () => {
    const shareString = parseToShare(teams);
    navigator.clipboard.writeText(shareString)
      .then(() => { }).catch(err => {
        console.error('Error al copiar el texto: ', err);
      });
  }

  return (

    prompted ?
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-evenly",
          width: "90vw",
          marginBottom: 10,
        }}
      >
        <TeamCard teamColor='black' team={teams['Color']} teamName='color' />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button variant="contained" onClick={handleCreateNew} sx={{ height: 'fit-content', bgcolor: '#962626' }} >Crear nuevos equipos</Button>
          <Button variant="contained" onClick={handleShare} sx={{ height: 'fit-content', marginTop: 2 }}>Copiar al porta papeles</Button>
        </Box>
        <TeamCard teamColor='white' team={teams['Blanco']} teamName='blanco' />
      </Box >
      :
      <PromptBox handlePrompt={handlePrompt} playersList={playersList} setPlayersList={setPlayersList} />

  );
}
