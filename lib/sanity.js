import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const sanity = createClient({
    projectId: '9xeyfiyg',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source) => builder.image(source);

export default sanity;

