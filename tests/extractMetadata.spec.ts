import app from "../src/app";
import supertest from "supertest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {Metadata, MetadataResult} from "interfaces/metadata.interface";

const mock = new MockAdapter(axios);

describe("extractMetadata", () => {
	afterEach(() => {
		mock.reset();
	});

	it('should return metadata for a valid URL',async ()=>{
		const html = `
      <html lang="en-EN">
        <head>
          <title>Example Title</title>
          <meta name="description" content="Example Description">
          <meta property="og:image" content="https://example.com/image.jpg">
        </head>
      </html>
    `;
		mock.onGet('https://anthonyfink.dev').reply(200, html);

		const response = await supertest(app)
			.post("/")
			.send({
				urls: ["https://anthonyfink.dev"]
			})
		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual([
			{
				url: 'https://anthonyfink.dev',
				metadata: {
					title: 'Example Title',
					description: 'Example Description',
					image: 'https://example.com/image.jpg'
				}
			}
		]);
		expect(response.body.map((data:Metadata) => data)).toBeDefined();
		const res =  response.body.map((data:MetadataResult) => data.url)
		expect(res).toEqual(["https://anthonyfink.dev"])
		expect(response.body.metadata[0]).toHaveProperty('title', 'Example Title');
		expect(response.body.metadata[0]).toHaveProperty('description', 'Example Description');
		expect(response.body.metadata[0]).toHaveProperty('image', 'https://example.com/image.jpg');
	})
})


