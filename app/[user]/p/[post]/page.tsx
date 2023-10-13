import type { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

import { fetchHTML } from '@/utils/html';
import { validatedMetadata } from '@/utils/metadata';

type Props = {
    params: {
        user: string,
        post: string,
    },
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { user, post } = params;
    const url = `https://${user}.substack.com/p/${post}`;

    const html = await fetchHTML(url);
    if (html) {
        return validatedMetadata(html);
    } else {
        console.error(`Error fetching data from '${url}'`);
        return {};
    }
}

export default function Page({ params }: Props) {
    const { user, post } = params;
    redirect(`https://${user}.substack.com/p/${post}`);
}
