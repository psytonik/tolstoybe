import {Router,Request,Response} from 'express'
import axios from "axios";
import {addProtocolIfMissing, extractMetadata} from "../lib/helpers";

interface Metadata {
	title: string;
	description: string;
	image: string;
}
interface MetadataResult {
	url: string;
	metadata?: Metadata;
	error?: string;
}

const router: Router = Router();

router.post('/', async (req:Request,res: Response) => {
	const { urls }: { urls:string[] } = req.body;
	if(!urls || !Array.isArray(urls)){
		return res.status(400).json({error:"must be a valid URLs"});
	}

	const metadataPromise = urls.map(async (url: string): Promise<MetadataResult> => {
		const normalizedUrl: string = addProtocolIfMissing(url);
		try {
			const response = await axios.get(normalizedUrl);
			const html = await response.data;
			const metadata: Metadata = extractMetadata(html);
			return { url: normalizedUrl, metadata };

		}catch(err){
			return { url: normalizedUrl, error: 'Failed to fetch metadata.' };
		}
	})
	const results: MetadataResult[] = await Promise.all(metadataPromise);
	return res.json(results);
})
export default router;
