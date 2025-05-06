import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"
import PageArticle from "@/components/PageArticle"

import sanity from "../lib/sanity"; // folosește clientul

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const catSlug = "/relatii"


export async function getStaticProps() {
  const data = await sanity.fetch(
    `*[_type == "psrCategoryPage" && slug.current == "relatii"][0]`,
  );

  return {
    props: {
      data,
    },
  };
}


export default function Home({ data }) {
  return (
    <>
      <Header />
      <PageArticle data={data} catSlug={catSlug} />


      <div className="bg-gray-500 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">NEXT js 15 on CLoudfrare pages</h2>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat.
          </p>
        </div>
      </div>
    </>
  );
}
