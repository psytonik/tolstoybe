import {Router,Request,Response} from 'express'
import axios from "axios";
import {addProtocolIfMissing, completeImageUrl, extractMetadata} from "../lib/helpers";
import {Metadata, MetadataResult} from "../interfaces/metadata.interface";


const router: Router = Router();

router.post('/', async (req:Request,res: Response) => {
	const { urls }: { urls:string[] } = req.body;
	if(!urls || !Array.isArray(urls)){
		return res.status(400).json({error:"must be a valid URLs"});
	}

	const metadataPromise = urls.map(async (url: string): Promise<MetadataResult> => {

		const normalizedUrl: string = addProtocolIfMissing(url);
		try {
			const response = await axios.get(normalizedUrl,{
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
				}});
			const html = await response.data;
			let metadata: Metadata = extractMetadata(html);
			metadata.image = completeImageUrl(normalizedUrl,metadata.image)
			return { url: normalizedUrl, metadata };

		}catch(err){
			return { url: normalizedUrl, error: 'Failed to fetch metadata.' };
		}
	})
	const results: MetadataResult[] = await Promise.all(metadataPromise);
	return res.json(results);
})
export default router;
