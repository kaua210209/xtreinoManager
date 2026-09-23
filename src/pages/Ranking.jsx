import {

  Trophy,

  Medal,

  Crosshair

} from "lucide-react";


import Podium
  from "../components/Podium";


export default function Ranking({

  ranking

}) {


  return (

    <div
      className="
        animate-fade
        space-y-6
      "
    >

      <div>

        <h1
          className="
            text-2xl
            font-black
          "
        >

          Ranking & Pódio

        </h1>


        <p
          className="
            mt-1
            text-xs
            text-zinc-600
          "
        >

          Classificação automática
          das equipes.

        </p>

      </div>


      <Podium
        teams={ranking}
      />


      {/* TABELA */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-white/[0.07]
          bg-zinc-900/50
        "
      >

        <div
          className="
            border-b
            border-white/[0.06]
            px-5
            py-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Trophy
              size={17}
              className="
                text-orange-400
              "
            />

            <h2
              className="
                font-black
              "
            >

              Classificação completa

            </h2>

          </div>

        </div>


        <div
          className="
            overflow-x-auto
          "
        >

          <table
            className="
              w-full
              min-w-[700px]
            "
          >

            <thead>

              <tr
                className="
                  border-b
                  border-white/[0.05]
                  text-left
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-widest
                  text-zinc-700
                "
              >

                <th
                  className="
                    px-5
                    py-3
                  "
                >

                  Pos.

                </th>


                <th
                  className="
                    px-5
                    py-3
                  "
                >

                  Equipe

                </th>


                <th
                  className="
                    px-5
                    py-3
                    text-center
                  "
                >

                  Abates

                </th>


                <th
                  className="
                    px-5
                    py-3
                    text-center
                  "
                >

                  Colocação

                </th>


                <th
                  className="
                    px-5
                    py-3
                    text-right
                  "
                >

                  Total

                </th>

              </tr>

            </thead>


            <tbody>

              {ranking.map(
                team => (

                  <tr
                    key={team.id}
                    className="
                      border-b
                      border-white/[0.04]
                      transition
                      hover:bg-white/[0.02]
                    "
                  >

                    <td
                      className="
                        px-5
                        py-4
                      "
                    >

                      <span
                        className={`
                          inline-flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          text-xs
                          font-black

                          ${
                            team.rank === 1
                              ? "bg-orange-500/10 text-orange-400"
                              : team.rank === 2
                              ? "bg-zinc-300/10 text-zinc-300"
                              : team.rank === 3
                              ? "bg-amber-700/10 text-amber-500"
                              : "bg-zinc-800 text-zinc-500"
                          }
                        `}
                      >

                        {team.rank}

                      </span>

                    </td>


                    <td
                      className="
                        px-5
                        py-4
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
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-zinc-800
                            text-[10px]
                            font-black
                            text-orange-400
                          "
                        >

                          {String(
                            team.slot
                          ).padStart(
                            2,
                            "0"
                          )}

                        </div>


                        <div>

                          <p
                            className="
                              text-sm
                              font-black
                            "
                          >

                            {team.name}

                          </p>


                          <p
                            className="
                              text-[10px]
                              text-zinc-700
                            "
                          >

                            {team.players
                              .filter(
                                Boolean
                              )
                              .length}

                            {" "}
                            jogadores

                          </p>

                        </div>

                      </div>

                    </td>


                    <td
                      className="
                        px-5
                        py-4
                        text-center
                      "
                    >

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          font-bold
                          text-emerald-400
                        "
                      >

                        <Crosshair
                          size={14}
                        />

                        {team.kills}

                      </div>

                    </td>


                    <td
                      className="
                        px-5
                        py-4
                        text-center
                        text-sm
                        font-bold
                        text-blue-400
                      "
                    >

                      {team.placementPoints}

                    </td>


                    <td
                      className="
                        px-5
                        py-4
                        text-right
                      "
                    >

                      <strong
                        className="
                          text-lg
                          font-black
                          text-orange-400
                        "
                      >

                        {team.total}

                      </strong>

                      <span
                        className="
                          ml-1
                          text-[9px]
                          text-zinc-700
                        "
                      >

                        pts

                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}