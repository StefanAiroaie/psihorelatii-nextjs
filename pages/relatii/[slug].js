import sanity from "@/lib/sanity";
import Header from "@/components/Header";
import PageArticle from "@/components/PageArticle";

export async function getStaticPaths() {
    const posts = await sanity.fetch(`*[_type == "psrArticlePage"]{ slug }`);

    const paths = posts.map((post) => ({
        params: { slug: post.slug.current },
    }));

    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params }) {
    const data = await sanity.fetch(
        `*[_type == "psrArticlePage" && slug.current == $slug][0]`,
        { slug: params.slug }
    );

    return {
        props: {
            data,
        },
    };
}
const catSlug = "paths.slug"

export default function ArticlePage({ data, catSlug }) {



    return (
        <>
            <Header />
            <PageArticle data={data} catSlug={catSlug} />
        </>
    );
}