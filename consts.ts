// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.



// Navigation
export const navigation = {
    header: [
        { name: 'Intrebari Frecvente', href: '/faq' },
        { name: 'Glosar de termeni', href: '/glosar' },
        // { name: 'Blog', href: '/blog' },

    ],

    legal: [
        { name: 'Termeni și condiții', href: '/legal/termeni-conditii' },
        { name: 'Politica de confidențialitate', href: '/legal/politica-confidentialitate' },
        { name: 'Politica de cookie-uri', href: '/legal/politica-cookie' },
        { name: 'Declinarea responsabilității', href: '/legal/disclaimer' },
        { name: 'Despre noi', href: '/legal/despre-noi' },
        { name: 'Contact', href: '/contact' },
    ],

    categories: [
        { name: 'Relații', href: '/relatii', articles: 5 },
        //     { name: 'Despărțiri', href: '/despartiri', articles: 5 },
        //     { name: 'Comunicare', href: '/comunicare', articles: 5 },
        //     { name: 'Iubire Conștientă', href: '/iubire-constienta', articles: 5 },
        //     { name: 'Narcisism', href: '/narcisism', articles: 5 },
        //     { name: 'Atașament', href: '/atasament', articles: 5 },
        //     { name: 'Emoții și limite', href: '/emotii-si-limite', articles: 5 },
        //     { name: 'Încredere', href: '/incredere', articles: 5 },
        //     { name: 'Vindecare personală', href: '/vindecare-personala', articles: 5 },
        //     { name: 'Red Flags', href: '/red-flags', articles: 5 },
    ],
};



export const globalSettings = {
    modalIdFlow: "",
    defaultFlowId: "",
    domainName: "https://pshihorelatii.ro",
    organization: {
        name: "pshihorelatii.ro",
        logo: "/logo",
        icon: "/favicon.ico",
        image: "/og-image.webp",
        email: "",
        telephone: "",
        address: {
            streetAddress: "",
            addressLocality: "",
            addressRegion: "",
            postalCode: "",
            addressCountry: ""
        },
        representative: ""
    }
};


