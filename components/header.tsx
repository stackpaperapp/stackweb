import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import { useTheme } from "next-themes";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const { resolvedTheme } = useTheme();
  const loading = status === "loading";

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div>
        <div
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    style={{ backgroundImage: `url('${session.user.image}')` }}
                    className={styles.avatar}
                  />
                  <span>
                    <strong>{session.user.name ?? session.user.email}</strong>
                  </span>
                </div>
                <div>
                  <a
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-between my-4">
          <li>
            <Link href="/">
              <Image
                src={`/logo-256-${resolvedTheme}.png`}
                width={64}
                height={64}
                alt="Stack Paper"
              />
            </Link>
          </li>
          {session?.user && (
            <li className="mr-4">
              <Link href="/budgets">Budgets</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
