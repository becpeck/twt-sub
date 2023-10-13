import { z, literal } from 'zod';

export const MetadataSchema = z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.object({
        name: z.string(),
    })),
    openGraph: z.object({
        type: z.union([literal('article'), literal('website')]),
        url: z.string().url(),
        title: z.string(),
        description: z.string(),
        images: z.string().url(),
    }),
    twitter: z.object({
        title: z.string(),
        description: z.string(),
        images: z.string().url(),
        card: z.union([literal('summary_large_image'), literal('summary')]),
    }),
})

export type ValidMetadata = z.infer<typeof MetadataSchema>;
