import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import useLetterCaseState from "@/hooks/useLetterCaseState";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

const interVariable = Inter();

const App: AppType = ({ Component, pageProps }) => {
  const { letterCase } = useLetterCaseState();

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <TooltipProvider delayDuration={150}>
        <style jsx global>
          {`
            html {
              font-family: ${interVariable.style.fontFamily};
              text-transform: ${letterCase};
            }
            button {
              text-transform: ${letterCase};
            }
          `}
        </style>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
