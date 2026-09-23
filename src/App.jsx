import React, {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Menu,
  X,
  Trash2
} from "lucide-react";

import Sidebar
  from "./components/Sidebar";

import Topbar
  from "./components/Topbar";

import Dashboard
  from "./pages/Dashboard";

import Pontuacao
  from "./pages/Pontuacao";

import Equipes
  from "./pages/Equipes";

import Ranking
  from "./pages/Ranking";

import {
  createTeams,
  calculateRanking
} from "./lib/scoring";


export default function App() {

  const [
    page,
    setPage
  ] = useState(
    "dashboard"
  );


  const [
    mobileMenu,
    setMobileMenu
  ] = useState(false);


  const [
    teams,
    setTeams
  ] = useState(() => {

    try {

      const saved =
        localStorage.getItem(
          "xtreino-teams"
        );


      if (saved) {

        return JSON.parse(
          saved
        );

      }

    } catch {

      console.log(
        "Não foi possível carregar os dados."
      );

    }


    return createTeams();

  });


  /* =========================
     SALVAR AUTOMATICAMENTE
  ========================= */

  useEffect(() => {

    localStorage.setItem(
      "xtreino-teams",
      JSON.stringify(
        teams
      )
    );

  }, [teams]);


  /* =========================
     LIMPAR CAMPEONATO
  ========================= */

  function clearChampionship() {

    const confirmed =
      window.confirm(
        "ATENÇÃO!\n\n" +
        "Isso vai apagar todas as equipes, " +
        "jogadores e pontuações do campeonato.\n\n" +
        "Deseja realmente limpar todos os dados?"
      );


    if (!confirmed) {

      return;

    }


    localStorage.removeItem(
      "xtreino-teams"
    );


    setTeams(
      createTeams()
    );


    setPage(
      "dashboard"
    );


    setMobileMenu(
      false
    );

  }


  /* =========================
     RANKING
  ========================= */

  const ranking =
    useMemo(

      () =>
        calculateRanking(
          teams
        ),

      [teams]

    );


  /* =========================
     CONFIGURAÇÃO DA PÁGINA
  ========================= */

  const pageInfo = {

    dashboard: {

      title:
        "Dashboard",

      description:
        "Visão geral do seu X-Treino"

    },


    pontuacao: {

      title:
        "Pontuação",

      description:
        "Lance os resultados das quedas"

    },


    equipes: {

      title:
        "Equipes",

      description:
        "Gerencie equipes e jogadores"

    },


    ranking: {

      title:
        "Ranking & Pódio",

      description:
        "Classificação atual do campeonato"

    }

  };


  const current =
    pageInfo[page];


  /* =========================
     CONTEÚDO
  ========================= */

  function renderPage() {

    switch (page) {

      case "pontuacao":

        return (

          <Pontuacao
            teams={
              teams
            }

            setTeams={
              setTeams
            }
          />

        );


      case "equipes":

        return (

          <Equipes
            teams={
              teams
            }

            setTeams={
              setTeams
            }
          />

        );


      case "ranking":

        return (

          <Ranking
            ranking={
              ranking
            }
          />

        );


      default:

        return (

          <Dashboard
            teams={
              teams
            }

            ranking={
              ranking
            }

            setPage={
              setPage
            }
          />

        );

    }

  }


  return (

    <div
      className="
        min-h-screen
        bg-zinc-950
        text-zinc-100
      "
    >

      {/* SIDEBAR DESKTOP */}

      <Sidebar
        page={
          page
        }

        setPage={
          setPage
        }
      />


      {/* MOBILE MENU */}

      {mobileMenu && (

        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() =>
            setMobileMenu(false)
          }
        >

          <div
            className="
              h-full
              w-[280px]
              bg-zinc-950
            "
            onClick={
              event =>
                event.stopPropagation()
            }
          >

            <div
              className="
                flex
                h-[82px]
                items-center
                justify-between
                border-b
                border-white/[0.07]
                px-5
              "
            >

              <div
                className="
                  font-black
                "
              >

                X-TREINO

              </div>


              <button
                onClick={() =>
                  setMobileMenu(
                    false
                  )
                }
                className="
                  text-zinc-500
                "
              >

                <X />

              </button>

            </div>


            <div
              className="
                p-4
              "
            >

              {[
                [
                  "dashboard",
                  "Dashboard"
                ],

                [
                  "pontuacao",
                  "Pontuação"
                ],

                [
                  "equipes",
                  "Equipes"
                ],

                [
                  "ranking",
                  "Ranking & Pódio"
                ]

              ].map(
                ([id, label]) => (

                  <button
                    key={id}
                    onClick={() => {

                      setPage(
                        id
                      );

                      setMobileMenu(
                        false
                      );

                    }}
                    className={`
                      mb-1
                      w-full
                      rounded-xl
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-bold

                      ${
                        page === id
                          ? "bg-orange-500/10 text-orange-400"
                          : "text-zinc-500"
                      }
                    `}
                  >

                    {label}

                  </button>

                )
              )}

            </div>

          </div>

        </div>

      )}


      {/* ÁREA PRINCIPAL */}

      <div
        className="
          min-h-screen
          lg:pl-[260px]
        "
      >

        {/* BOTÃO MOBILE */}

        <div
          className="
            lg:hidden
          "
        >

          <button
            onClick={() =>
              setMobileMenu(
                true
              )
            }
            className="
              fixed
              left-4
              top-5
              z-40
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-zinc-900
              text-zinc-300
            "
          >

            <Menu
              size={18}
            />

          </button>

        </div>


        {/* TOPBAR */}

        <Topbar
          title={
            current.title
          }

          description={
            current.description
          }
        />


        {/* AÇÕES */}

        <div
          className="
            px-4
            pt-4
            md:px-8
          "
        >

          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[1500px]
              justify-end
            "
          >

            <button
              onClick={
                clearChampionship
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-2.5
                text-xs
                font-black
                text-red-400
                transition
                hover:bg-red-500/20
                hover:text-red-300
              "
            >

              <Trash2
                size={15}
              />

              LIMPAR DADOS

            </button>

          </div>

        </div>


        {/* CONTEÚDO */}

        <main
          className="
            grid-background
            min-h-[calc(100vh-82px)]
            px-4
            py-6
            md:px-8
            md:py-8
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1500px]
            "
          >

            {renderPage()}

          </div>

        </main>

      </div>

    </div>

  );

}