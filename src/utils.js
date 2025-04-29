import playersData from "@/../public/players.json";

export function parser(playersList) {
    // Convertir la lista de nombres en un array
    const names = playersList
        .split("\n") // Dividir por líneas
        .map((line) => line.replace(/^\d+\.\s*/, "").trim()) // Remover números y espacios
        .filter((name) => name.length > 0); // Filtrar líneas vacías

    // Crear el JSON con los jugadores
    const result = names.map((name) => {
        if (playersData[name.toLowerCase()]) {
            // Si el jugador está en players.json, usar sus estadísticas
            return {
                name: playersData[name.toLowerCase()].name,
                ...playersData[name.toLowerCase()],
            };
        } else {
            // Si no está, asignar valores por defecto
            return {
                name: name,
                speed: 5.0,
                shoot: 5.0,
                pass: 5.0,
                dribble: 5.0,
                defense: 5.0,
            };
        }
    });

    return result;
}

export function balancer(players) {
    // Calcular el puntaje total de cada jugador sumando sus habilidades
    const playersWithScores = players.map(player => ({
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