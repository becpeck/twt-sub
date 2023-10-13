import { parse } from 'node-html-parser';
import { MetadataSchema } from './zod/metadataSchema';
import type { Metadata } from 'next';

function parseMetadata(html: string) {
    const doc = parse(html);

    const data = {
        title: doc.querySelector("title")?.textContent,
        description: doc.querySelector("meta[name='description']")?.getAttribute('content'),
        authors: doc.querySelectorAll("meta[name='author']").map(elem => ({ name: elem.getAttribute('content') })),
        openGraph: {
            type: doc.querySelector("meta[property='og:type']")?.getAttribute('content'),
            url: doc.querySelector("meta[property='og:url']")?.getAttribute('content'),
            title: doc.querySelector("meta[property='og:title']")?.getAttribute('content'),
            description: doc.querySelector("meta[property='og:description']")?.getAttribute('content'),
            images: doc.querySelector("meta[property='og:image']")?.getAttribute('content'),
        },
        twitter: {
            title: doc.querySelector("meta[name='twitter:title']")?.getAttribute('content'),
            description: doc.querySelector("meta[name='twitter:description']")?.getAttribute('content'),
            images: doc.querySelector("meta[name='twitter:image']")?.getAttribute('content'),
            card: doc.querySelector("meta[name='twitter:card']")?.getAttribute('content'),
        },
    }

    return data;
}

function normalizeMetadata(data: ReturnType<typeof parseMetadata>) {
    return {
        title: data.title || data.openGraph.title || data.twitter.title || '',
        description: data.description || data.openGraph.description || data.twitter.description || '',
        authors: data.authors,
        openGraph: {
            type: data.openGraph.type || 'article',
            url: data.openGraph.url || '',
            title: data.openGraph.title || data.title || data.twitter.title || '',
            description: data.openGraph.description || data.description || data.twitter.description || '',
            images: data.openGraph.images || data.twitter.images,
        },
        twitter: {
            title: data.twitter.title || data.title || data.openGraph.title,
            description: data.twitter.description || data.description || data.openGraph.description,
            images: data.twitter.images || data.openGraph.images,
            card: data.twitter.card || 'summary_large_image',
        }
    }
}

export function validatedMetadata(html: string): Metadata {
    return MetadataSchema.parse(normalizeMetadata(parseMetadata(html)));
}
