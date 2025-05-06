export function balancer(players) {
    // Convertir el objeto recibido en un array de jugadores
    const playersArray = Object.values(players);

    const playersWithScores = playersArray.map(player => ({
        ...player,
        totalScore: player.speed + player.shoot + player.pass + player.dribble + player.defense
    }));

    // Ordenar jugadores por puntaje total de mayor a menor
    playersWithScores.sort((a, b) => b.totalScore - a.totalScore);

    // Inicializar los equipos
    const teamBlanco = [];
    const teamColor = [];
    let scoreBlanco = 0;
    let scoreColor = 0;

    // Asignar jugadores alternando para equilibrar los equipos
    playersWithScores.forEach(player => {
        if (scoreBlanco <= scoreColor) {
            teamBlanco.push(player);
            scoreBlanco += player.totalScore;
        } else {
            teamColor.push(player);
            scoreColor += player.totalScore;
        }
    });

    // Devolver los equipos en un JSON
    return {
        Blanco: teamBlanco,
        Color: teamColor
    };
}

export function teamStats(team) {
    // Calcular las estadísticas generales del equipo
    const totalStats = team.reduce(
        (totals, player) => {
            totals.speed += player.speed;
            totals.shoot += player.shoot;
            totals.pass += player.pass;
            totals.dribble += player.dribble;
            totals.defense += player.defense;
            return totals;
        },
        { speed: 0, shoot: 0, pass: 0, dribble: 0, defense: 0 }
    );

    // Calcular el promedio de las estadísticas
    const averageStats = {
        speed: totalStats.speed / team.length,
        shoot: totalStats.shoot / team.length,
        pass: totalStats.pass / team.length,
        dribble: totalStats.dribble / team.length,
        defense: totalStats.defense / team.length
    };

    return averageStats;
}

export function parseToShare(teams) {
    const blancoPlayers = teams.Blanco.map(player => player.name).join("\n");
    const colorPlayers = teams.Color.map(player => player.name).join("\n");

    return `Blanco:\n${blancoPlayers}\n\nColor:\n${colorPlayers}`;
}