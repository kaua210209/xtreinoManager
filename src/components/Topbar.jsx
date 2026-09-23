import {

  Bell,

  Search

} from "lucide-react";


export default function Topbar({

  title,

  description

}) {

  return (

    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[82px]
        items-center
        justify-between
        border-b
        border-white/[0.07]
        bg-zinc-950/80
        px-5
        backdrop-blur-xl
        md:px-8
      "
    >

      <div>

        <h2
          className="
            text-xl
            font-black
            tracking-tight
            text-white
          "
        >

          {title}

        </h2>


        <p
          className="
            mt-0.5
            text-xs
            text-zinc-600
          "
        >

          {description}

        </p>

      </div>


      <div
        className="
          flex
          items-center
          gap-2
        "
      >

      </div>

    </header>

  );

}