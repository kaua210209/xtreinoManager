import React from "react";

import {
  Plus
} from "lucide-react";

import TeamCard
  from "../components/TeamCard";

import {
  calculateTeam,
  MAX_TEAMS,
  createTeam
} from "../lib/scoring";


export default function Pontuacao({

  teams,

  setTeams

}) {


  const [
    expanded,
    setExpanded
  ] = React.useState(null);


  /* =========================
     ADICIONAR EQUIPE
  ========================= */

  function addTeam() {

    if (
      teams.length >=
      MAX_TEAMS
    ) {

      alert(
        "O limite é de 12 equipes."
      );

      return;

    }


    const newTeam =
      createTeam(
        teams.length + 1
      );


    setTeams([
      ...teams,
      newTeam
    ]);

  }


  /* =========================
     ATUALIZAR EQUIPE
  ========================= */

  function updateTeam(
    updated
  ) {

    setTeams(

      teams.map(
        team =>
          team.id ===
          updated.id

            ? updated

            : team
      )

    );

  }


  /* =========================
     EXCLUIR EQUIPE
  ========================= */

  function deleteTeam(
    id
  ) {

    if (
      !window.confirm(
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

      {/* =====================
          TOPO
      ===================== */}

      <div
        className="
          mb-5
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-black
            "
          >

            Pontuação

          </h1>


          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >

            Lance os resultados
            de cada equipe.

          </p>

        </div>


        <button
          onClick={
            addTeam
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-orange-500
            px-4
            py-3
            text-xs
            font-black
            text-zinc-950
            transition
            hover:bg-orange-400
          "
        >

          <Plus
            size={16}
          />

          Adicionar equipe

        </button>

      </div>


      {/* =====================
          AVISO
      ===================== */}

      <div
        className="
          mb-4
          rounded-xl
          border
          border-orange-500/10
          bg-orange-500/[0.04]
          px-4
          py-3
          text-xs
          text-zinc-500
        "
      >

        <strong
          className="
            text-orange-400
          "
        >
          Dica:
        </strong>{" "}

        abra cada equipe,
        informe os jogadores
        e preencha a colocação
        e os abates das 5 quedas.
        O total é calculado
        automaticamente.

      </div>


      {/* =====================
          EQUIPES
      ===================== */}

      <div
        className="
          space-y-3
        "
      >

        {teams.map(
          team => (

            <TeamCard

              key={
                team.id
              }

              team={
                team
              }

              stats={
                calculateTeam(
                  team
                )
              }

              expanded={
                expanded ===
                team.id
              }

              onToggle={() =>
                setExpanded(
                  expanded ===
                    team.id
                    ? null
                    : team.id
                )
              }

              onUpdate={
                updateTeam
              }

              onDelete={() =>
                deleteTeam(
                  team.id
                )
              }

            />

          )
        )}

      </div>


      {/* =====================
          SEM EQUIPES
      ===================== */}

      {teams.length === 0 && (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-white/10
            p-12
            text-center
          "
        >

          <p
            className="
              text-sm
              font-bold
              text-zinc-500
            "
          >

            Nenhuma equipe cadastrada.

          </p>


          <button
            onClick={
              addTeam
            }
            className="
              mt-4
              text-xs
              font-bold
              text-orange-400
              transition
              hover:text-orange-300
            "
          >

            + Adicionar primeira equipe

          </button>

        </div>

      )}

    </div>

  );

}