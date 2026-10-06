import React, {useEffect, useMemo, useState} from "react";
import {Menu, X, Trash2} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Pontuacao from "./pages/Pontuacao";
import Equipes from "./pages/Equipes";
import Ranking from "./pages/Ranking";
import {createTeams, calculateRanking} from "./lib/scoring";
import Login from "./pages/Login";
import { supabase } from "./lib/supabase";


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


  /* =========================
     AUTENTICAÇÃO
  ========================= */

  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);

  const [
    teams,
    setTeams
  ] = useState([]);


  useEffect(() => {

    let active = true;

    async function loadSession() {

      const { data } =
        await supabase.auth.getSession();

      if (!active) return;

      setSession(
        data.session ?? null
      );

      setAuthReady(true);

    }

    loadSession();

    const {
      data: {
        subscription
      }
    } =
      supabase.auth.onAuthStateChange(
        (_event, nextSession) => {

          setSession(
            nextSession ?? null
          );

        }
      );

    return () => {

      active = false;

      subscription.unsubscribe();

    };

  }, []);


  /* =========================
     CARREGAR XTREINO DA CONTA
  ========================= */

  useEffect(() => {

    if (!session?.user?.id) {

      setTeams([]);

      setDataReady(false);

      return;

    }

    let active = true;

    setDataReady(false);

    async function loadXtReino() {

      const {
        data,
        error
      } =
        await supabase
          .from("xtreino_data")
          .select("teams")
          .eq(
            "user_id",
            session.user.id
          )
          .maybeSingle();

      if (!active) return;

      if (error) {

        console.error(
          "Erro ao carregar o XTREINO:",
          error
        );

        setTeams([]);

      } else if (
        Array.isArray(data?.teams)
      ) {

        setTeams(
          data.teams
        );

      } else {

        setTeams([]);

      }

      setDataReady(true);

    }

    loadXtReino();

    return () => {

      active = false;

    };

  }, [session?.user?.id]);


  /* =========================
     SALVAR AUTOMATICAMENTE NO SUPABASE
  ========================= */

  useEffect(() => {

    if (
      !session?.user?.id ||
      !dataReady
    ) {
      return;
    }

    const timer =
      setTimeout(
        async () => {

          const {
            error
          } =
            await supabase
              .from("xtreino_data")
              .upsert(
                {
                  user_id:
                    session.user.id,

                  teams,

                  updated_at:
                    new Date().toISOString()

                },
                {
                  onConflict:
                    "user_id"
                }
              );

          if (error) {

            console.error(
              "Erro ao salvar o XTREINO:",
              error
            );

          }

        },
        500
      );

    return () =>
      clearTimeout(timer);

  }, [
    teams,
    session?.user?.id,
    dataReady
  ]);


  /* =========================
     LIMPAR CAMPEONATO
  ========================= */

  async function clearChampionship() {

    const confirmed =
      window.confirm(
        "ATENÇÃO!\\n\\n" +
        "Isso vai apagar todas as equipes, " +
        "jogadores e pontuações do seu XTREINO.\\n\\n" +
        "Deseja realmente limpar todos os dados?"
      );

    if (
      !confirmed ||
      !session?.user?.id
    ) {
      return;
    }

    const { error } =
      await supabase
        .from("xtreino_data")
        .delete()
        .eq(
          "user_id",
          session.user.id
        );

    if (error) {

      alert(
        "Não foi possível limpar os dados."
      );

      console.error(
        "Erro ao limpar o XTREINO:",
        error
      );

      return;

    }

    setTeams([]);

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


  /* =========================
     ACESSO
  ========================= */

  if (!authReady) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">

        <div className="text-sm font-bold text-zinc-500">
          Verificando acesso...
        </div>

      </div>
    );

  }

  if (!session) {

    return <Login />;

  }

  if (!dataReady) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">

        <div className="text-sm font-bold text-zinc-500">
          Carregando seu XTREINO...
        </div>

      </div>
    );

  }

  return (
    <div className="
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
              onClick={async () => {

                await supabase.auth.signOut();

              }}
              className="
                mr-2
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-zinc-900
                px-4
                py-2.5
                text-xs
                font-black
                text-zinc-300
                transition
                hover:bg-zinc-800
              "
            >
              SAIR
            </button>

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