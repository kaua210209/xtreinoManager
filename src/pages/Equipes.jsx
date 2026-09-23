import React from "react";

import {
  Users,
  UserRound,
  Plus,
  Trash2
} from "lucide-react";

import {
  createTeam,
  MAX_TEAMS
} from "../lib/scoring";


export default function Equipes({

  teams,

  setTeams

}) {


  function addTeam() {

    if (
      teams.length >=
      MAX_TEAMS
    ) {

      alert(
        "Você já possui 12 equipes."
      );

      return;

    }


    setTeams([
      ...teams,
      createTeam(
        teams.length + 1
      )
    ]);

  }


  function updateTeam(
    id,
    field,
    value
  ) {

    setTeams(

      teams.map(
        team =>
          team.id === id

            ? {
                ...team,
                [field]:
                  value
              }

            : team
      )

    );

  }


  function updatePlayer(
    id,
    index,
    value
  ) {

    setTeams(

      teams.map(team => {

        if (
          team.id !== id
        ) {

          return team;

        }


        const players = [
          ...team.players
        ];


        players[index] =
          value;


        return {

          ...team,

          players

        };

      })

    );

  }


  function removeTeam(
    id
  ) {

    if (
      !confirm(
        "Excluir esta equipe?"
      )
    ) {

      return;

    }


    setTeams(

      teams
        .filter(
          team =>
            team.id !== id
        )
        .map(
          (team, index) => ({
            ...team,
            slot:
              index + 1
          })
        )

    );

  }


  return (

    <div
      className="
        animate-fade
      "
    >

      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-black
            "
          >

            Equipes

          </h1>


          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >

            Cadastre as equipes
            e seus jogadores.

          </p>

        </div>


        <button
          onClick={addTeam}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-orange-500
            px-4
            py-3
            text-xs
            font-black
            text-zinc-950
          "
        >

          <Plus size={16} />

          Nova equipe

        </button>

      </div>


      <div
        className="
          grid
          gap-3
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {teams.map(
          team => (

            <div
              key={team.id}
              className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-zinc-900/50
                p-5
              "
            >

              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-500/10
                      text-xs
                      font-black
                      text-orange-400
                    "
                  >

                    {String(
                      team.slot
                    ).padStart(2, "0")}

                  </div>


                  <div>

                    <p
                      className="
                        text-xs
                        font-bold
                        text-zinc-600
                      "
                    >

                      SLOT {team.slot}

                    </p>

                    <p
                      className="
                        font-black
                      "
                    >

                      {team.name ||
                        "Nova equipe"}

                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    removeTeam(
                      team.id
                    )
                  }
                  className="
                    text-zinc-700
                    hover:text-red-400
                  "
                >

                  <Trash2
                    size={16}
                  />

                </button>

              </div>


              <label
                className="
                  mb-4
                  block
                "
              >

                <span
                  className="
                    mb-2
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-widest
                    text-zinc-600
                  "
                >

                  Nome da equipe

                </span>


                <input
                  value={team.name}
                  onChange={event =>
                    updateTeam(
                      team.id,
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Ex: SHADOW"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-zinc-950
                    px-3
                    py-3
                    text-sm
                    font-semibold
                    outline-none
                    placeholder:text-zinc-700
                    focus:border-orange-500/50
                  "
                />

              </label>


              <div>

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    gap-2
                  "
                >

                  <UserRound
                    size={13}
                    className="
                      text-zinc-600
                    "
                  />

                  <span
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-zinc-600
                    "
                  >

                    Jogadores

                  </span>

                </div>


                <div
                  className="
                    space-y-2
                  "
                >

                  {team.players.map(
                    (
                      player,
                      index
                    ) => (

                      <input
                        key={index}
                        value={player}
                        onChange={event =>
                          updatePlayer(
                            team.id,
                            index,
                            event.target.value
                          )
                        }
                        placeholder={`Jogador ${
                          index + 1
                        }`}
                        className="
                          w-full
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-zinc-950
                          px-3
                          py-2
                          text-xs
                          outline-none
                          placeholder:text-zinc-700
                          focus:border-orange-500/50
                        "
                      />

                    )
                  )}

                </div>

              </div>

            </div>

          )
        )}

      </div>


      {teams.length === 0 && (

        <div
          className="
            py-20
            text-center
          "
        >

          <Users
            size={40}
            className="
              mx-auto
              text-zinc-800
            "
          />


          <p
            className="
              mt-4
              text-sm
              font-bold
              text-zinc-600
            "
          >

            Nenhuma equipe cadastrada.

          </p>

        </div>

      )}

    </div>

  );

}