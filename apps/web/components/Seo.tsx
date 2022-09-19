import Head from "next/head";
import { FunctionComponent } from "react";
export interface SeoProps {
    title: string;
}
const Seo: FunctionComponent<SeoProps> = ({ title }) => {
    return (
        <Head>
            <title>{title} | Demo Market</title>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
            <meta
                name="description"
                content="Demo Market. A place for listings all your useless stuff"
            />
            <meta name="keywords" content="Demo Market" />
        </Head>
    );
};

export default Seo;
