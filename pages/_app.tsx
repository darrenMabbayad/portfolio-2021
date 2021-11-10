import "../styles/globals.css";
import "../styles/components/typing-game/TypingGameBase.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
