"use client";

import { AuthContextProvider } from "@/context/auth-context";

function Providers({ children }: React.PropsWithChildren) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default Providers;
