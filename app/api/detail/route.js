import axios from "axios";

export async function GET(req) {
	const test = req.nextUrl.searchParams.get('detailId');

	const detailData = axios.create({
		baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchList',
		params: {
			apiKey: 'nn3u13ncqicdt5o0',
			locale: 'kr'
		}
	})
	const detailJeju = await detailData.get(`/`, {params:{cid : test}});
	const [detailPlz] = detailJeju.data.items;
	
	return Response.json(detailPlz);
}