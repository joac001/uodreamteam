'use client';
import { Box, Button } from "@mui/material";
import PromptBox from "@/components/PromptBox";
import TeamCard from "@/components/TeamCard";
import { useState } from "react";

import { parser, balancer } from "@/utils";

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

  return (
    <>
      <Box>
        {prompted ?
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90vw",
            }}
          >
            <TeamCard teamColor='black' team={teams['Color']} />
            <Button variant="contained" onClick={handleCreateNew} sx={{ height: '100%' }} >Crear nuevos equipos</Button>
            <TeamCard teamColor='white' team={teams['Blanco']} />
          </Box>
          :
          <PromptBox handlePrompt={handlePrompt} playersList={playersList} setPlayersList={setPlayersList} />
        }
      </Box >
    </>
  );
}
