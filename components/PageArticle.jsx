import parse from 'html-react-parser';
import { globalSettings } from '../consts';
import ADS from "@/components/ADS";
import { urlFor } from '@/lib/sanity';

const PageArticle = ({ data, catSlug }) => {

    // Helper to extract TOC items from block content, including heading level
    const extractTOCItems = (content) => {
        if (!content || !Array.isArray(content)) return [];
        return content
            .filter(block =>
                ['h2', 'h3', 'blockquote'].includes(block.style) || block.listItem
            )
            .map(block => {
                const text = block?.children?.map(c => c.text).join(' ').slice(0, 80);
                const id = text?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || '';
                const level = block.style === 'h2' ? 2 : block.style === 'h3' ? 3 : block.listItem ? 4 : 5;
                return { text, id, level };
            });
    };

    const dynamicTOC = [
        ...extractTOCItems(data?.introContent),
        ...extractTOCItems(data?.mainContent)
    ];

    console.log("✅ data from Sanity:", data);

    const heroImgSrc = data?.heroImage?.image
        ? urlFor(data.heroImage.image).width(1280).auto('format').fit('max').url()
        : '/fallback.jpg';

    // Structured Data for ARTICLE
    const articleStructuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data?.title,
        "description": data?.description,
        "keywords": data?.keywords,
        "author": {
            "@type": "Organization",
            "name": globalSettings.organization?.name,
            "url": globalSettings.domainName,
        },
        "publisher": {
            "@type": "Organization",
            "name": globalSettings.organization?.name,
            "url": globalSettings.domainName,
            "logo": {
                "@type": "ImageObject",
                "url": `${globalSettings.domainName}/${globalSettings.organization?.logo}`,
            }
        },
        "datePublished": data?.createdDate || "2025-03-21T00:08:00+01:00",
        "dateModified": data?.modifiedDate || "2025-03-21T00:08:00+01:00",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${globalSettings?.domainName}/${catSlug}/${data?.slug?.current || ''}`,
        },
        "image": {
            "@type": "ImageObject",
            "url": `${globalSettings?.domainName}/${heroImgSrc}`,
        },
    };

    // Generate Structured Data for FAQ
    const FAQStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data?.faqData?.questions?.map((q) => ({
            "@type": "Question",
            "name": q?.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q?.answer
            }
        })) || []
    }

    // Structured Data for BreadcrumbList
    const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Acasă",
                "item": globalSettings.domainName
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Relații",
                "item": `${globalSettings.domainName}/${catSlug}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": data?.title || "Articol",
                "item": `${globalSettings.domainName}/${catSlug}/${data?.slug?.current || ''}`
            }
        ]
    };

    // Helper function to render blockContent for faqDescription and other sections
    const renderBlockContent = (blocks) => {
        if (!blocks || !Array.isArray(blocks)) return null;
        return blocks.map((block, index) => {
            if (!block || !block.children) return null;

            const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p'];
            const Tag = allowedTags.includes(block.style) ? block.style : 'p';

            const renderChildren = block.children.map((child, i) => {
                let content = child.text;

                if (child.marks?.includes('strong')) {
                    content = <strong key={i}>{content}</strong>;
                }
                if (child.marks?.includes('em')) {
                    content = <em key={i}>{content}</em>;
                }

                const linkMark = child.marks?.find((mark) =>
                    block.markDefs?.find((def) => def._key === mark && def._type === 'link')
                );

                if (linkMark) {
                    const linkDef = block.markDefs.find((def) => def._key === linkMark);
                    content = (
                        <a key={i} href={linkDef.href} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            {content}
                        </a>
                    );
                }

                return content;
            });

            // Compute id for TOC anchor
            const id =
                block.children?.map(c => c.text).join(' ').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

            return (
                <Tag
                    key={block._key || index}
                    id={id}
                    className={
                        Tag === 'h1' ? 'text-4xl font-bold my-6'
                            : Tag === 'h2' ? 'text-3xl font-bold tracking-tight text-primary sm:text-4xl'
                                : Tag === 'h3' ? 'text-2xl font-semibold my-4'
                                    : Tag === 'blockquote' ? 'm-4 border-l-4 border-gray-400 italic  p-8 text-accent text-2xl  '
                                        : Tag === 'p' ? 'text-base leading-7 my-4'
                                            : 'my-4'
                    }
                >
                    {renderChildren}
                </Tag>
            );
        });
    };

    return (
        <>
            <link
                rel="preload"
                as="image"
                href={heroImgSrc}
                type="image/webp"
            />
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleStructuredData),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(FAQStructuredData),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbStructuredData),
                }}
            />


            {/* Blog Article Content */}
            <article>

                {/* Hero Section */}
                <section className="w-full min-h-[400px]">
                    <div className="relative w-full max-w-screen-xl min-h-[400px] overflow-hidden shadow-lg mx-auto">
                        {heroImgSrc && (
                            <img
                                src={heroImgSrc}
                                alt={data?.heroImage?.alt || ''}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="eager"
                                fetchPriority="high"
                                width="1280"
                                height="720"
                                decoding="async"
                            />
                        )}
                        {/* Transparent overlay */}
                        <div className="absolute inset-0 bg-black opacity-80"></div>
                        {/* Hero Section Content */}
                        <div className="relative z-10 text-center p-6">
                            <div className="min-h-[400px] flex flex-col items-center justify-center gap-16 p-4 ">
                                <h1 className="max-w-[600px] text-4xl font-bold tracking-tight text-balance text-white lg:text-7xl">
                                    {data?.heroHeader}
                                </h1>
                                <div className="max-w-[600px] flex flex-col justify-center gap-2">
                                    <p className="text-white text-pretty text-xl md:text-2xl">{data?.heroParagraph}</p>
                                    <div className="flex justify-center flex-wrap sm:gap-16 md:gap-4 items-center mt-16 mb-16">
                                        {/* Optional buttons/links */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Breadcrumb */}
                <nav className="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
                        <li className="flex">
                            <div className="flex items-center">
                                <a href="/" className="text-gray-400 hover:text-gray-500">
                                    <svg className="size-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="sr-only">Acasă</span>
                                </a>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex items-center">
                                <svg className="h-full w-6 shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <a href={`/${catSlug}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    {catSlug?.charAt(0).toUpperCase() + catSlug?.slice(1)}
                                </a>
                            </div>
                        </li>
                        <li className="flex">
                            <div className="flex items-center">
                                <svg className="h-full w-6 shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
                                    <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                                </svg>
                                <a href={`/${catSlug}/${data?.slug?.current}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">
                                    {data?.title}
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* table o content */}
                <section className='w-full p-8' >
                    <nav
                        className="toc sticky top-20 bg-white shadow-md p-8 rounded-lg mb-8 max-w-3xl mx-auto"
                        role="navigation"
                        aria-label="Cuprins"
                    >
                        <h2 className="font-bold text-lg m-4">Cuprins</h2>
                        <ul className="space-y-2 text-muted p-4">
                            <li><a href="#intro">Introducere</a>
                                <ul className="space-y-1">
                                    {extractTOCItems(data?.introContent).map((item, index) => (
                                        <li key={`intro-${index}`} className={`ml-${item.level * 2}`}>
                                            <a href={`#${item.id}`}>{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li><a href="#main">Conținut principal</a>
                                <ul className="space-y-1">
                                    {extractTOCItems(data?.mainContent).map((item, index) => (
                                        <li key={`main-${index}`} className={`ml-${item.level * 2}`}>
                                            <a href={`#${item.id}`}>{item.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {data?.howItWorks && (
                                <li><a href="#how-it-works">Cum funcționează</a></li>
                            )}
                            {(data?.checklist?.length > 0 || data?.checklistImage) && (
                                <li><a href="#checklist">Checklist</a></li>
                            )}
                            {data?.videoData?.embedUrl && <li><a href="#video">Video explicativ</a></li>}
                            {data?.conclusions && <li><a href="#concluzii">Concluzii finale</a></li>}
                            {data?.faqData && <li><a href="#faq">Întrebări frecvente</a></li>}
                        </ul>
                    </nav>
                </section>

                {/* Intro Content */}
                {data?.introContent && (
                    <section id="intro" className="prose prose-lg max-w-3xl mx-auto my-16">
                        {renderBlockContent(data.introContent)}
                    </section>
                )}


                {/* MainContent */}
                {data?.mainContent && (
                    <section id="main" className="prose prose-lg max-w-3xl mx-auto my-16">
                        {renderBlockContent(data.mainContent)}
                    </section>
                )}


                {data?.howItWorks && (
                    <section id="how-it-works" className="bg-light py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{data?.howItWorks?.headLine}</h2>
                                    <p className="mt-6 text-lg leading-8 text-muted">{data?.howItWorks?.paragraph}</p>
                                </div>
                            </div>
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                    {data?.howItWorks?.list?.map((step, index) => (
                                        <div key={index} className="relative pl-16">
                                            <h3 className="text-xl font-semibold leading-7 text-primary">
                                                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                                    <span className="text-white">{index + 1}</span>
                                                </div>
                                                {step?.title}
                                            </h3>
                                            <p className="mt-2 text-base leading-7 text-muted">
                                                {step?.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <ADS />

                {/* checklist */}
                {(data?.checklist?.length > 0 || data?.checklistImage) && (
                    <section id="checklist" className="bg-light py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                                    Checklist
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-muted">
                                    Verifică următoarele puncte importante.
                                </p>
                            </div>
                            <div className="flex flex-col gap-8 mt-10 max-w-7xl lg:flex-row lg:items-stretch">
                                {data?.checklistImage?.image && (
                                    <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={urlFor(data.checklistImage.image).url()}
                                            alt={data?.checklistImage?.alt}
                                            width="600"
                                            height="600"
                                            className="object-cover w-full h-full"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                {data?.checklist?.length > 0 && (
                                    <div className="flex-1 flex flex-col justify-center bg-white rounded-lg p-8">
                                        <ul className="space-y-6">
                                            {data.checklist.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center space-x-4"
                                                >
                                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white flex-shrink-0">
                                                        <span className="text-lg font-bold">{index + 1}</span>
                                                    </div>
                                                    <p className="text-base leading-7 text-muted">
                                                        {item}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}



                {/* Video Section */}
                {data?.videoData?.embedUrl && (
                    <section id="video" className="bg-white py-16 sm:py-24">
                        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                            <h2 className="text-3xl font-bold text-primary">{data.videoData.title}</h2>
                            <p className="mt-4 text-lg text-muted">{data.videoData.description}</p>
                            <div className="mt-8 aspect-video">
                                <iframe
                                    src={data.videoData.embedUrl}
                                    title={data.videoData.title}
                                    allowFullScreen
                                    className="w-full h-full rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </section>
                )}


                <ADS />

                {/* conclusions */}
                {data?.conclusions && (
                    <section id="concluzii" className="prose prose-lg max-w-3xl mx-auto my-16">
                        {renderBlockContent(data.conclusions)}
                    </section>
                )}

                {/* faqData  */}
                {data?.faqData && (
                    <section id="faq" className="bg-light py-16 sm:py-24">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{parse(data?.faqData?.faqHeadline || '')}</h2>
                                <div className="mt-6 text-lg leading-8 text-muted">
                                    {renderBlockContent(data?.faqData?.faqDescription)}
                                </div>
                            </div>
                            <div className="mt-16 max-w-2xl mx-auto">
                                <div className="space-y-8">
                                    {data?.faqData?.questions?.map((q, index) => (
                                        <div key={index} className="border-b pb-6">
                                            <h3 className="text-xl font-semibold text-primary">{parse(q?.question || '')}</h3>
                                            <p className="mt-2 text-base text-muted">{parse(q?.answer || '')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </article>

            <ADS />








        </>
    );
};
export default PageArticle;