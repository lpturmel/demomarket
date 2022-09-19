import { useState } from "react";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import Layout from "../components/layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout user={pageProps.user}>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    );
}
