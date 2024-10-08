import app from "../src/app";
import supertest from "supertest";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {Metadata, MetadataResult} from "interfaces/metadata.interface";

const mock = new MockAdapter(axios);
let server: any;

beforeAll((done) => {
	server = app.listen(0, () => {
		console.log('server run')
		done();
	});
});

afterAll((done) => {
	server.close(done);
});

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

		const firstItem = response.body[0];
		expect(firstItem).toHaveProperty('url', 'https://anthonyfink.dev');
		expect(firstItem.metadata).toHaveProperty('title', 'Example Title');
		expect(firstItem.metadata).toHaveProperty('description', 'Example Description');
		expect(firstItem.metadata).toHaveProperty('image', 'https://example.com/image.jpg');
	})
})


