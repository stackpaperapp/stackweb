import { SessionProvider } from "next-auth/react";
import "./styles.css";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            refreshWhenHidden: false,
            revalidateOnMount: true,
            revalidateIfStale: false,
            dedupingInterval: 10000000,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </SessionProvider>
  );
}
