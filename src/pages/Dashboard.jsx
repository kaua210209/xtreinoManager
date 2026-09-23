import {

  Users,

  Target,

  Trophy,

  Crosshair,

  ArrowRight

} from "lucide-react";


import StatCard
  from "../components/StatCard";


export default function Dashboard({

  teams,

  ranking,

  setPage

}) {


  const totalKills =
    ranking.reduce(
      (sum, team) =>
        sum + team.kills,
      0
    );


  const totalPoints =
    ranking.reduce(
      (sum, team) =>
        sum + team.total,
      0
    );


  return (

    <div
      className="
        animate-fade
        space-y-6
      "
    >

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-orange-500/10
          bg-gradient-to-br
          from-orange-500/[0.09]
          via-zinc-900/70
          to-zinc-950
          p-6
          md:p-8
        "
      >

        <div
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-orange-500/10
            blur-3xl
          "
        />


        <div
          className="
            relative
            max-w-2xl
          "
        >

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/20
              bg-orange-500/5
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-orange-400
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-orange-400
              "
            />

            Campeonato em andamento

          </div>


          <h1
            className="
              text-3xl
              font-black
              tracking-tight
              text-white
              md:text-4xl
            "
          >

            Organize seu{" "}

            <span
              className="
                text-orange-400
              "
            >
              X-Treino.
            </span>

          </h1>


          <p
            className="
              mt-3
              max-w-xl
              text-sm
              leading-6
              text-zinc-500
            "
          >

            Cadastre as equipes,
            lance os resultados das
            cinco quedas e deixe o
            sistema calcular
            automaticamente toda a
            pontuação.

          </p>


          <button
            onClick={() =>
              setPage(
                "pontuacao"
              )
            }
            className="
              mt-6
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
              shadow-lg
              shadow-orange-500/10
              transition
              hover:bg-orange-400
            "
          >

            Lançar pontuação

            <ArrowRight
              size={15}
            />

          </button>

        </div>

      </section>


      {/* ESTATÍSTICAS */}

      <div
        className="
          grid
          gap-3
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        <StatCard
          icon={Users}
          label="Equipes"
          value={`${ranking.length}/12`}
          description="Equipes cadastradas"
          accent="orange"
        />


        <StatCard
          icon={Crosshair}
          label="Abates"
          value={totalKills}
          description="Abates registrados"
          accent="green"
        />


        <StatCard
          icon={Target}
          label="Pontos"
          value={totalPoints}
          description="Pontuação acumulada"
          accent="blue"
        />


        <StatCard
          icon={Trophy}
          label="Líder"
          value={
            ranking[0]?.name ||
            "—"
          }
          description={
            ranking[0]
              ? `${ranking[0].total} pontos`
              : "Aguardando resultados"
          }
          accent="yellow"
        />

      </div>


      {/* CONTEÚDO */}

      <div
        className="
          grid
          gap-4
          xl:grid-cols-[1.5fr_1fr]
        "
      >

        {/* RANKING */}

        <div
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

            <div>

              <h2
                className="
                  font-black
                "
              >
                Classificação
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-zinc-600
                "
              >
                Ranking atual
              </p>

            </div>


            <button
              onClick={() =>
                setPage(
                  "ranking"
                )
              }
              className="
                text-xs
                font-bold
                text-orange-400
                hover:text-orange-300
              "
            >

              Ver ranking

            </button>

          </div>


          <div
            className="
              space-y-2
            "
          >

            {ranking
              .slice(0, 6)
              .map(team => (

                <div
                  key={team.id}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-black/20
                    p-3
                  "
                >

                  <span
                    className="
                      w-6
                      text-center
                      text-xs
                      font-black
                      text-zinc-600
                    "
                  >

                    {team.rank}º

                  </span>


                  <div
                    className="
                      flex-1
                    "
                  >

                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
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

                      {team.kills}
                      {" "}
                      abates

                    </p>

                  </div>


                  <strong
                    className="
                      text-sm
                      font-black
                      text-orange-400
                    "
                  >

                    {team.total}

                  </strong>

                </div>

              ))}


            {ranking.length === 0 && (

              <p
                className="
                  py-8
                  text-center
                  text-xs
                  text-zinc-700
                "
              >

                Nenhuma equipe
                cadastrada.

              </p>

            )}

          </div>

        </div>


        {/* REGRAS */}

        <div
          className="
            rounded-2xl
            border
            border-white/[0.07]
            bg-zinc-900/50
            p-5
          "
        >

          <h2
            className="
              font-black
            "
          >

            Tabela de pontuação

          </h2>


          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >

            Pontos por colocação

          </p>


          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-3
            "
          >

            {Object.entries({

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

            }).map(
              ([position, points]) => (

                <div
                  key={position}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-lg
                    bg-black/20
                    px-3
                    py-2
                  "
                >

                  <span
                    className="
                      text-xs
                      font-bold
                      text-zinc-500
                    "
                  >

                    {position}º

                  </span>


                  <strong
                    className="
                      text-xs
                      text-orange-400
                    "
                  >

                    {points} pts

                  </strong>

                </div>

              )
            )}

          </div>


          <div
            className="
              mt-4
              rounded-xl
              border
              border-emerald-500/10
              bg-emerald-500/[0.04]
              p-3
            "
          >

            <p
              className="
                text-xs
                text-zinc-500
              "
            >

              <strong
                className="
                  text-emerald-400
                "
              >
                Abates:
              </strong>{" "}

              cada abate vale
              1 ponto.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}