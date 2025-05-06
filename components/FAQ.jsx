import parse from 'html-react-parser';

const FAQ = ({ post }) => {

    // Generate Structured Data for FAQ
    const FAQStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post?.faqData?.questions.map((q) => ({
            "@type": "Question",
            "name": q?.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q?.answer
            }
        }))
    }

    return (
        <>

            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(FAQStructuredData),
                    }}
                />
            </head>

            {/* FAQ Section */}
            <section className="bg-light py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{parse(post?.faqData?.headLine || '')}</h2>
                        <p className="mt-6 text-lg leading-8 text-muted">{parse(post?.faqData?.paragraph || '')}</p>
                    </div>
                    <div className="mt-16 max-w-2xl mx-auto">
                        <div className="space-y-8">
                            {post?.faqData?.questions.map((q, index) => (
                                <div key={index} className="border-b pb-6">
                                    <h3 className="text-xl font-semibold text-primary">{parse(q?.question || '')}</h3>
                                    <p className="mt-2 text-base text-muted">{parse(q?.answer || '')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>


    );
}
export default FAQ