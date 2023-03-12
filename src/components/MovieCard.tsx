import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clapperboard, Clock, Twitter } from "lucide-react";
import type { MovieResponse } from "moviedb-promise";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

interface MovieCardProps extends MovieResponse {
  movieTrailer: string;
  overview: string;
}

const MovieCard = ({
  poster_path,
  title,
  overview,
  genres,
  release_date,
  runtime,
  movieTrailer,
}: MovieCardProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const genresArr = genres
    ?.map((item) => {
      return item.name;
    })
    .slice(0, 3)
    .join(", ");

  const shortOverview = overview?.slice(0, 500) + "...";

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
          }}
        >
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-6 bg-slate-3 p-2 shadow-md md:flex-row md:items-stretch">
            <div className="aspect-[2/3]">
              <Image
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`Poster for the movie ${title}`}
                width={400}
                height={550}
                className={clsx(
                  isLoading ? "blur-sm grayscale" : "blur-none grayscale-0",
                  "overflow-hidden rounded-md shadow-md motion-safe:duration-200 motion-safe:ease-productive-standard"
                )}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            <div className="flex max-w-sm flex-col gap-4">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="-mt-1 text-sm text-slate-11">{genresArr}</p>
                {overview.length > 500 ? (
                  <p className="mt-2 text-sm text-slate-11">
                    {!showMore ? shortOverview : overview}
                    <button
                      className="ml-1 font-semibold text-slate-12 hover:opacity-80 motion-safe:duration-200 motion-safe:ease-productive-standard"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? "show less" : "show more"}
                    </button>
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-slate-11 ">{overview}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-slate-11">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-6 bg-slate-4 py-1.5 px-3 text-xs shadow">
                  <Calendar size={15} />
                  <p>{release_date?.slice(0, 4)}</p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-6 bg-slate-4 py-1.5 px-3 text-xs shadow">
                  <Clock size={15} />
                  <p>{runtime} min</p>
                </div>
              </div>
              <div className="mt-8 flex items-end justify-between gap-2 md:mt-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.youtube.com/watch?v=${movieTrailer}`}
                  className={clsx(
                    "inline-flex h-7 items-center gap-1 px-3 text-sm text-slate-11",
                    "rounded-lg border border-slate-7 bg-slate-4 shadow",
                    "hover:border-slate-8 hover:bg-slate-5 hover:text-slate-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
                  )}
                >
                  <Clapperboard size={16} />
                  trailer
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet?text=${title}%20%0A%0A&url=https://moviexyz.vercel.app${router.asPath}`}
                  className={clsx(
                    "inline-flex h-7 items-center gap-1 px-3 text-sm text-slate-11",
                    "rounded-lg border border-slate-7 bg-slate-4 shadow",
                    "hover:border-slate-8 hover:bg-slate-5 hover:text-slate-12 motion-safe:duration-200 motion-safe:ease-productive-standard"
                  )}
                >
                  <Twitter size={16} />
                  share
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default MovieCard;
