import { urlFor } from '../lib/sanity';
export default function PageCategory({ posts, catSlug }) {




    return (
        <>
            {/* related articles */}
            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-4xl">
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Alte articole relevante</h2>
                        <p className="mt-2 text-lg/8 text-gray-600">Descoperă articole similare care te pot ajuta să înțelegi mai bine această temă.</p>
                        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                            {posts.map((post, j) => (
                                <article key={j} className="relative isolate flex flex-col gap-8 lg:flex-row">
                                    <div className="relative w-32 h-32 lg:w-40 lg:h-40 shrink-0">
                                        {post?.heroImage?.image && (
                                            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                                                <img
                                                    src={urlFor(post.heroImage.image).url()}
                                                    alt={post?.heroImage?.alt || post?.title || "Imagine articol"}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                                    </div>
                                    <div> <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={post?.publishedAt} className="text-gray-500">
                                            {new Date(post?.publishedAt).toLocaleDateString('ro-RO')}
                                        </time>
                                        <a
                                            href="#"
                                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                        >
                                            {post?.categories?.[0]?.title ? post.categories[0].title : "Fără categorie"}
                                        </a>

                                    </div>
                                        <div className="group relative max-w-xl">
                                            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                                <a href={`/${catSlug}/${post?.slug?.current}/`} aria-label={`Deschide articolul: ${post?.title}`}>
                                                    <span className="absolute inset-0" />
                                                    {post?.title}
                                                </a>
                                            </h3>
                                            <p className="mt-5 text-sm/6 text-gray-600">
                                                {post?.description ?? "Fără descriere"}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
