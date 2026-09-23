export default function StatCard({

  icon: Icon,

  label,

  value,

  description,

  accent = "orange"

}) {


  const colors = {

    orange:
      "text-orange-400 bg-orange-500/10",

    green:
      "text-emerald-400 bg-emerald-500/10",

    blue:
      "text-blue-400 bg-blue-500/10",

    yellow:
      "text-yellow-400 bg-yellow-500/10"

  };


  return (

    <div
      className="
        group
        rounded-2xl
        border
        border-white/[0.07]
        bg-zinc-900/50
        p-5
        transition
        hover:-translate-y-0.5
        hover:border-white/10
        hover:bg-zinc-900
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div>

          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-zinc-600
            "
          >

            {label}

          </p>


          <p
            className="
              mt-2
              text-2xl
              font-black
              tracking-tight
              text-white
            "
          >

            {value}

          </p>


          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >

            {description}

          </p>

        </div>


        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl

            ${colors[accent]}
          `}
        >

          <Icon
            size={18}
          />

        </div>

      </div>

    </div>

  );

}