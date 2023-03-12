import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useGenresState from "@/hooks/useGenresState";

type LayoutProps = {
  children?: React.ReactNode;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { genreIdList } = useGenresState();
  const genresParsed = useMemo(() => genreIdList.join("|"), [genreIdList]);

  const { data, mutate } = useSWR(
    `/api/randomId?genresId=${genresParsed}`,
    fetcher,
    { revalidateOnMount: true }
  );

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    await mutate(`/api/randomId?genresId=${genresParsed}`);
    setIsLoading(false);
  }, [genresParsed, mutate]);

  return (
    <>
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between p-4">
        <Header />
        <div className="my-6 self-center">
          <Link
            href={`/movie/${data?.id}`}
            onClick={handleClick}
            className={clsx(
              isLoading && "pointer-events-none opacity-80",
              "flex h-8 items-center px-3 text-sm",
              "rounded-lg border border-slate-7 bg-slate-4 shadow",
              "hover:border-slate-8 hover:bg-slate-5",
              "motion-safe:duration-200 motion-safe:ease-productive-standard"
            )}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p>Pick random movie</p>
            )}
          </Link>
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
