import '../styles/global.css';
import { globalSettings } from '../consts';

const HeadMetaData = ({ pageData }) => {

    return (
        <head>

            {/* Title */}
            <title>{pageData?.metaData?.title}</title>

            {/* Meta Tags SEO */}
            <meta name="title" content={pageData?.metaData?.title} />
            {/* <meta name="description" content={pageData?.metaData?.description} /> */}
            {/* <meta name="keywords" content={pageData?.metaData?.keywords} /> */}
            {/* <meta name="author" content="" /> */}

            {/* Canonical URL */}
            {/* <link rel="canonical" href={`${globalSettings.domainName}${pageData.metaData.slug}`} /> */}

            {/* Open Graph Meta Tags */}
            {/* <meta property="og:title" content={pageData?.metaData?.title} />
            <meta property="og:description" content={pageData?.metaData?.description} />
            <meta property="og:image" content={`${globalSettings.domainName}${globalSettings.organization.image}`} />
            <meta property="og:url" href={`${globalSettings.domainName}${pageData.metaData.slug}`} />
            <meta property="og:type" content="website" /> */}

            {/* <link rel="icon" href={`${globalSettings.domainName}${globalSettings.organization.icon}`} type="image/x-icon" />
            <link rel="shortcut icon" href={`${globalSettings.domainName}${globalSettings.organization.icon}`} type="image/x-icon" /> */}
        </head>
    );
};

export default HeadMetaData;
