import {Metadata} from "../interfaces/metadata.interface";
import * as cheerio from 'cheerio';

export const addProtocolIfMissing = (url: string): string => {
	const cleanUrl = url.replace(/^https?:\/\//i, '');
	return `https://${cleanUrl}`;
};

export const extractMetadata = (html: string): Metadata => {
	const $ = cheerio.load(html);
	// const metadata: Metadata = { title:'', description:'', image:'' };
	// const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
	// metadata.title = titleMatch ? titleMatch[1] : 'No title found';
	//
	// const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["'][^>]*>/i);
	//
	// metadata.description = descriptionMatch ? descriptionMatch[1] : 'No description found';
	//
	// const imageMatch = html.match(/<meta\s+property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
	// metadata.image = imageMatch ? imageMatch[1] : 'No image found';
	return {
		title: $('title').text() || 'No title found',
		description: $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || 'No description found',
		image: $('meta[property="og:image"]').attr('content') || 'No image found'
	};
};

export const completeImageUrl = (baseUrl: string, imageUrl: string): string => {
	if (/^https?:\/\//i.test(imageUrl)) {
		return imageUrl;
	}
	if(imageUrl === 'No image found'){
		return imageUrl;
	}
	if (imageUrl.startsWith('/')) {
		const url: URL = new URL(baseUrl);
		return `${url.origin}${imageUrl}`;
	}
	return `${baseUrl}/${imageUrl}`;
};
