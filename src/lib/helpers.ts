import { Metadata } from "../interfaces/metadata.interface";

export const addProtocolIfMissing = (url: string): string => {
	const cleanUrl = url.replace(/^https?:\/\//i, '');
	return `https://${cleanUrl}`;
};

export const extractMetadata = (html: string): Metadata => {
	console.log(html);
	const metadata: Metadata = { title:'', description:'', image:'' };

	const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
	metadata.title = titleMatch ? titleMatch[1] : 'No title found';

	const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i);
	metadata.description = descriptionMatch ? descriptionMatch[1] : 'No description found';

	const imageMatch = html.match(/<meta\s+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
	metadata.image = imageMatch ? imageMatch[1] : 'No image found';
	return metadata;
};

export const completeImageUrl = (baseUrl: string, imageUrl: string): string => {
	if (/^https?:\/\//i.test(imageUrl)) {
		return imageUrl;
	}

	if (imageUrl.startsWith('/')) {
		const url: URL = new URL(baseUrl);
		return `${url.origin}${imageUrl}`;
	}
	return `${baseUrl}/${imageUrl}`;
};
