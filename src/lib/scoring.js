export const MAX_TEAMS = 12;

export const MAX_PLAYERS = 4;

export const TOTAL_ROUNDS = 5;


export const PLACEMENT_POINTS = {

  1: 12,

  2: 9,

  3: 8,

  4: 7,

  5: 6,

  6: 5,

  7: 4,

  8: 3,

  9: 2,

  10: 1,

  11: 0,

  12: 0

};


export function createRound() {

  return {

    placement: "",

    kills: ""

  };

}


export function createTeam(slot) {

  return {

    id:
      crypto.randomUUID(),

    slot,

    name: "",

    players: [
      "",
      "",
      "",
      ""
    ],

    rounds:
      Array.from(
        {
          length: TOTAL_ROUNDS
        },
        createRound
      )

  };

}


export function createTeams() {

  return Array.from(

    {
      length: MAX_TEAMS
    },

    (_, index) =>
      createTeam(index + 1)

  );

}


export function calculateTeam(team) {

  let kills = 0;

  let placementPoints = 0;


  team.rounds.forEach(
    round => {

      kills +=
        Number(
          round.kills
        ) || 0;


      placementPoints +=
        PLACEMENT_POINTS[
          Number(
            round.placement
          )
        ] || 0;

    }
  );


  return {

    ...team,

    kills,

    placementPoints,

    total:
      kills +
      placementPoints

  };

}


export function calculateRanking(
  teams
) {

  return teams

    .map(calculateTeam)

    .filter(
      team =>
        team.name.trim()
    )

    .sort(
      (a, b) => {

        if (
          b.total !==
          a.total
        ) {

          return (
            b.total -
            a.total
          );

        }


        if (
          b.kills !==
          a.kills
        ) {

          return (
            b.kills -
            a.kills
          );

        }


        return (
          a.slot -
          b.slot
        );

      }
    )

    .map(
      (team, index) => ({

        ...team,

        rank:
          index + 1

      })
    );

}