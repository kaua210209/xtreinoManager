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
        min-h-[82px]
        w-full
        items-center
        justify-between
        border-b
        border-white/[0.07]
        bg-zinc-950/80
        pl-16
        pr-4
        py-3
        backdrop-blur-xl
        sm:pl-16
        sm:pr-5
        md:h-[82px]
        md:min-h-0
        md:px-8
        md:py-0
      "
    >
      <div className="min-w-0 flex-1">
        <h2
          className="
            truncate
            text-base
            font-black
            tracking-tight
            text-white
            sm:text-xl
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-0.5
              max-w-[240px]
              truncate
              text-[10px]
              text-zinc-600
              sm:max-w-none
              sm:text-xs
            "
          >
            {description}
          </p>
        )}
      </div>

      <div
        className="
          ml-3
          flex
          shrink-0
          items-center
          gap-2
        "
      >
      </div>
    </header>
  );
}
