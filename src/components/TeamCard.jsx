import {
  ChevronDown,
  ChevronUp,
  Users,
  Trash2
} from "lucide-react";

import {
  PLACEMENT_POINTS,
  TOTAL_ROUNDS
} from "../lib/scoring";


export default function TeamCard({

  team,

  stats,

  expanded,

  onToggle,

  onUpdate,

  onDelete

}) {


  function updatePlayer(
    index,
    value
  ) {

    const players = [
      ...team.players
    ];

    players[index] =
      value;

    onUpdate({

      ...team,

      players

    });

  }


  function updateRound(
    roundIndex,
    field,
    value
  ) {

    const rounds = [
      ...team.rounds
    ];


    rounds[roundIndex] = {

      ...rounds[roundIndex],

      [field]: value

    };


    onUpdate({

      ...team,

      rounds

    });

  }


  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-zinc-900/50
        transition
        hover:border-white/10
      "
    >

      {/* CABEÇALHO */}

      <div
        className="
          flex
          items-center
          gap-4
          p-4
          md:p-5
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-zinc-800
            text-xs
            font-black
            text-orange-400
          "
        >

          {String(
            team.slot
          ).padStart(2, "0")}

        </div>


        <div
          className="
            min-w-0
            flex-1
          "
        >

          <input
            value={team.name}
            onChange={event =>
              onUpdate({

                ...team,

                name:
                  event.target.value

              })
            }
            placeholder="Nome da equipe"
            className="
              w-full
              bg-transparent
              text-base
              font-black
              text-white
              outline-none
              placeholder:text-zinc-700
            "
          />


          <div
            className="
              mt-1
              flex
              items-center
              gap-1.5
              text-[11px]
              text-zinc-600
            "
          >

            <Users
              size={12}
            />

            {team.players.filter(
              Boolean
            ).length}

            /4 jogadores

          </div>

        </div>


        <div
          className="
            hidden
            text-right
            sm:block
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-widest
              text-zinc-600
            "
          >

            Abates

          </p>

          <strong
            className="
              text-lg
              font-black
              text-emerald-400
            "
          >

            {stats.kills}

          </strong>

        </div>


        <div
          className="
            text-right
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-widest
              text-zinc-600
            "
          >

            Total

          </p>

          <strong
            className="
              text-lg
              font-black
              text-orange-400
            "
          >

            {stats.total}

          </strong>

        </div>


        <button
          onClick={onToggle}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-zinc-600
            hover:bg-white/[0.05]
            hover:text-white
          "
        >

          {expanded

            ? <ChevronUp size={18} />

            : <ChevronDown size={18} />

          }

        </button>


        <button
          onClick={onDelete}
          className="
            hidden
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-zinc-700
            hover:bg-red-500/10
            hover:text-red-400
            sm:flex
          "
        >

          <Trash2
            size={16}
          />

        </button>

      </div>


      {expanded && (

        <div
          className="
            border-t
            border-white/[0.06]
            bg-black/10
            p-4
            md:p-5
          "
        >

          {/* JOGADORES */}

          <div
            className="
              mb-6
            "
          >

            <p
              className="
                mb-3
                text-[10px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-zinc-600
              "
            >

              Jogadores

            </p>


            <div
              className="
                grid
                gap-2
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {team.players.map(
                (player, index) => (

                  <input
                    key={index}
                    value={player}
                    onChange={event =>
                      updatePlayer(
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Jogador ${
                      index + 1
                    }`}
                    className="
                      rounded-xl
                      border
                      border-white/[0.07]
                      bg-zinc-950
                      px-3
                      py-2.5
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-zinc-700
                      focus:border-orange-500/50
                    "
                  />

                )
              )}

            </div>

          </div>


          {/* QUEDAS */}

          <div>

            <div
              className="
                mb-3
                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-zinc-600
                "
              >

                Resultados das quedas

              </p>


              <p
                className="
                  text-[10px]
                  text-zinc-700
                "
              >

                1 abate = 1 ponto

              </p>

            </div>


            <div
              className="
                space-y-2
              "
            >

              {Array.from(
                {
                  length:
                    TOTAL_ROUNDS
                },
                (_, index) => {

                  const round =
                    team.rounds[index];


                  const placement =
                    Number(
                      round.placement
                    );


                  const placementPoints =
                    PLACEMENT_POINTS[
                      placement
                    ] || 0;


                  const killPoints =
                    Number(
                      round.kills
                    ) || 0;


                  return (

                    <div
                      key={index}
                      className="
                        grid
                        grid-cols-[70px_1fr_1fr_80px]
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/[0.05]
                        bg-zinc-950/70
                        p-2
                        md:grid-cols-[90px_1fr_1fr_100px]
                      "
                    >

                      <div
                        className="
                          px-2
                          text-xs
                          font-black
                          text-zinc-500
                        "
                      >

                        Queda{" "}

                        {index + 1}

                      </div>


                      <select
                        value={
                          round.placement
                        }
                        onChange={event =>
                          updateRound(
                            index,
                            "placement",
                            event.target.value
                          )
                        }
                        className="
                          min-w-0
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-zinc-900
                          px-2
                          py-2
                          text-xs
                          text-zinc-300
                          outline-none
                          focus:border-orange-500/50
                        "
                      >

                        <option value="">
                          Colocação
                        </option>

                        {Object.entries(
                          PLACEMENT_POINTS
                        ).map(
                          ([position, points]) => (

                            <option
                              key={position}
                              value={position}
                            >

                              {position}º lugar
                              {" "}
                              — {points} pts

                            </option>

                          )
                        )}

                      </select>


                      <input
                        type="number"
                        min="0"
                        value={
                          round.kills
                        }
                        onChange={event =>
                          updateRound(
                            index,
                            "kills",
                            event.target.value
                          )
                        }
                        placeholder="Abates"
                        className="
                          min-w-0
                          rounded-lg
                          border
                          border-white/[0.06]
                          bg-zinc-900
                          px-3
                          py-2
                          text-xs
                          text-white
                          outline-none
                          placeholder:text-zinc-700
                          focus:border-orange-500/50
                        "
                      />


                      <div
                        className="
                          text-right
                        "
                      >

                        <span
                          className="
                            text-xs
                            font-black
                            text-orange-400
                          "
                        >

                          {placementPoints +
                            killPoints}

                        </span>

                        <span
                          className="
                            ml-1
                            text-[9px]
                            text-zinc-700
                          "
                        >
                          pts
                        </span>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>


          {/* RESUMO */}

          <div
            className="
              mt-5
              grid
              grid-cols-3
              gap-2
            "
          >

            <Summary
              label="Abates"
              value={
                stats.kills
              }
              color="green"
            />


            <Summary
              label="Colocação"
              value={
                stats.placementPoints
              }
              color="blue"
            />


            <Summary
              label="Total"
              value={
                stats.total
              }
              color="orange"
            />

          </div>

        </div>

      )}

    </div>

  );

}


function Summary({

  label,

  value,

  color

}) {


  const colors = {

    green:
      "text-emerald-400",

    blue:
      "text-blue-400",

    orange:
      "text-orange-400"

  };


  return (

    <div
      className="
        rounded-xl
        border
        border-white/[0.05]
        bg-zinc-950
        p-3
      "
    >

      <p
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-widest
          text-zinc-700
        "
      >

        {label}

      </p>


      <strong
        className={`
          mt-1
          block
          text-xl
          font-black
          ${colors[color]}
        `}
      >

        {value}

      </strong>

    </div>

  );

}