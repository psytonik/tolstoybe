export interface Metadata {
	title: string,
	description: string,
	image: string,
}

export interface MetadataResult {
	url: string;
	metadata?: Metadata;
	error?: string;
}
