import {
  Trophy
} from "lucide-react";


export default function Podium({

  teams

}) {


  const first =
    teams[0];

  const second =
    teams[1];

  const third =
    teams[2];


  if (!first) {

    return (

      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-white/10
          p-10
          text-center
          text-zinc-600
        "
      >

        Nenhuma equipe
        cadastrada ainda.

      </div>

    );

  }


  const PodiumCard = ({
    team,
    position
  }) => {

    if (!team) {
      return null;
    }


    const isFirst =
      position === 1;


    return (

      <div
        className={`
          relative
          flex
          flex-col
          items-center
          rounded-3xl
          border
          p-6
          text-center

          ${
            isFirst

              ? `
                border-orange-500/30
                bg-orange-500/[0.06]
                shadow-2xl
                shadow-orange-500/10
                md:-translate-y-6
              `

              : `
                border-white/[0.07]
                bg-zinc-900/50
              `
          }
        `}
      >

        {isFirst && (

          <div
            className="
              absolute
              -top-3
              rounded-full
              bg-orange-500
              px-3
              py-1
              text-[9px]
              font-black
              uppercase
              tracking-widest
              text-zinc-950
            "
          >

            Campeão

          </div>

        )}


        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            text-xl
            font-black

            ${
              position === 1
                ? "bg-orange-500 text-zinc-950"
                : position === 2
                ? "bg-zinc-300 text-zinc-950"
                : "bg-amber-700 text-white"
            }
          `}
        >

          {position}º

        </div>


        <h3
          className="
            mt-5
            max-w-full
            truncate
            text-lg
            font-black
            text-white
          "
        >

          {team.name}

        </h3>


        <p
          className="
            mt-1
            text-xs
            text-zinc-600
          "
        >

          Slot {team.slot}

        </p>


        <div
          className="
            mt-5
            text-4xl
            font-black
            tracking-tight
            text-orange-400
          "
        >

          {team.total}

        </div>


        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-widest
            text-zinc-600
          "
        >

          pontos

        </p>


        <div
          className="
            mt-5
            flex
            w-full
            justify-center
            gap-6
            border-t
            border-white/[0.06]
            pt-4
          "
        >

          <div>

            <p
              className="
                text-[10px]
                uppercase
                text-zinc-600
              "
            >

              Abates

            </p>

            <strong
              className="
                text-sm
                text-emerald-400
              "
            >

              {team.kills}

            </strong>

          </div>


          <div>

            <p
              className="
                text-[10px]
                uppercase
                text-zinc-600
              "
            >

              Colocação

            </p>

            <strong
              className="
                text-sm
                text-blue-400
              "
            >

              {team.placementPoints}

            </strong>

          </div>

        </div>

      </div>

    );

  };


  return (

    <div
      className="
        grid
        items-end
        gap-4
        md:grid-cols-3
      "
    >

      <PodiumCard
        team={second}
        position={2}
      />


      <PodiumCard
        team={first}
        position={1}
      />


      <PodiumCard
        team={third}
        position={3}
      />

    </div>

  );

}