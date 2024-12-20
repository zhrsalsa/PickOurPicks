// src/app/_app.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
