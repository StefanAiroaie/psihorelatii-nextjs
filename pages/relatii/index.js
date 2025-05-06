import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header"
import PageArticle from "@/components/PageArticle"

import sanity from "../../lib/sanity"; // folosește clientul
import PageCategory from "@/components/PageCategory";

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
    const posts = await sanity.fetch(`*[_type == "psrArticlePage"]{
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    heroHeader,
    heroParagraph,
    description,
    heroImage {
      alt,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      title,
      slug
    }
  }`);
    const data = await sanity.fetch(
        `*[_type == "psrCategoryPage" && slug.current == "relatii"][0]`,
    );

    return {
        props: {
            data, posts
        },
    };
}


export default function Home({ data, posts }) {
    return (
        <>
            <Header />
            <PageArticle data={data} catSlug={catSlug} />
            <PageCategory posts={posts} catSlug={catSlug} />


        </>
    );
}
