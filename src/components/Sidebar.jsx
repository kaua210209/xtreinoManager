import {

  LayoutDashboard,

  Trophy,

  Users,

  Target,

  Settings,

  CircleHelp,

  Gamepad2

} from "lucide-react";


export default function Sidebar({

  page,

  setPage

}) {


  const menu = [

    {

      id: "dashboard",

      label: "Dashboard",

      icon:
        LayoutDashboard

    },

    {

      id: "pontuacao",

      label: "Pontuação",

      icon: Target

    },

    {

      id: "equipes",

      label: "Equipes",

      icon: Users

    },

    {

      id: "ranking",

      label: "Ranking & Pódio",

      icon: Trophy

    }

  ];


  return (

    <aside
      className="
        fixed
        left-0
        top-0
        z-40
        hidden
        h-screen
        w-[260px]
        flex-col
        border-r
        border-white/[0.07]
        bg-zinc-950
        lg:flex
      "
    >

      {/* LOGO */}

      <div
        className="
          flex
          h-[82px]
          items-center
          gap-3
          border-b
          border-white/[0.07]
          px-6
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
            bg-orange-500
            text-zinc-950
            shadow-lg
            shadow-orange-500/20
          "
        >

          <Gamepad2
            size={21}
            strokeWidth={2.5}
          />

        </div>


        <div>

          <h1
            className="
              text-[15px]
              font-black
              tracking-tight
            "
          >

            X-TREINO

          </h1>


          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-orange-400
            "
          >

            Manager

          </p>

        </div>

      </div>


      {/* MENU */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-4
          py-6
        "
      >

        <p
          className="
            mb-3
            px-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-zinc-600
          "
        >

          Competição

        </p>


        <nav
          className="
            space-y-1
          "
        >

          {menu.map(item => {

            const Icon =
              item.icon;

            const active =
              page === item.id;


            return (

              <button

                key={item.id}

                onClick={() =>
                  setPage(
                    item.id
                  )
                }

                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    active

                      ? `
                        bg-orange-500/10
                        text-orange-400
                      `

                      : `
                        text-zinc-500
                        hover:bg-white/[0.035]
                        hover:text-zinc-200
                      `
                  }
                `}
              >

                <Icon
                  size={18}
                  strokeWidth={
                    active
                      ? 2.5
                      : 2
                  }
                />


                {item.label}

              </button>

            );

          })}

        </nav>


        {/* CONFIG */}

        <div
          className="
            mt-auto
            rounded-2xl
            border
            border-white/[0.07]
            bg-white/[0.025]
            p-4
          "
        >

          <div
            className="
              mb-3
              flex
              items-center
              gap-2
            "
          >

            <Settings
              size={15}
              className="
                text-zinc-500
              "
            />

            <span
              className="
                text-xs
                font-bold
                text-zinc-300
              "
            >

              Configuração

            </span>

          </div>


          <div
            className="
              space-y-2
              text-xs
            "
          >

            <div
              className="
                flex
                justify-between
              "
            >

              <span
                className="
                  text-zinc-600
                "
              >
                Quedas
              </span>

              <strong>
                5
              </strong>

            </div>


            <div
              className="
                flex
                justify-between
              "
            >

              <span
                className="
                  text-zinc-600
                "
              >
                Equipes
              </span>

              <strong>
                12
              </strong>

            </div>


            <div
              className="
                flex
                justify-between
              "
            >

              <span
                className="
                  text-zinc-600
                "
              >
                Abate
              </span>

              <strong>
                1 pt
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div
        className="
          border-t
          border-white/[0.07]
          p-4
        "
      >

      </div>

    </aside>

  );

}