import { Metadata } from "../interfaces/metadata.interface";

export const addProtocolIfMissing = (url: string): string => {
	const cleanUrl = url.replace(/^https?:\/\//i, '');
	return `https://${cleanUrl}`;
};

export const extractMetadata = (html: string): Metadata => {

	const metadata: Metadata = { title:'', description:'', image:'' };

	const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
	metadata.title = titleMatch ? titleMatch[1] : 'No title found';

	const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i);
	metadata.description = descriptionMatch ? descriptionMatch[1] : 'No description found';

	const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']\s*\/?>/);
	metadata.image = imageMatch ? imageMatch[1] : 'No image found';

	return metadata;
};

