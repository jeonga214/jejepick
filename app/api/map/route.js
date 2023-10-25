import axios from 'axios';
export async function GET(req) {
	// 경로탐색 관련 맵
	const param = req.url.split('?')[1];

	const REST_API_KEY = '1a1a72ae4ec92dd8102d547704546bdc';
	const url = `https://apis-navi.kakaomobility.com/v1/directions?${param}`;
	const map = await axios(url, {
		headers: {
			Authorization: `KakaoAK ${REST_API_KEY}`
		}
	});

	return Response.json(map.data);
}

export async function POST(req) {
	const d = await req.json();

	const REST_API_KEY = '1a1a72ae4ec92dd8102d547704546bdc';
	const url = `https://apis-navi.kakaomobility.com/v1/waypoints/directions`;
	const map = await axios({
		method: 'post',
		url: url,
		headers: {
			"Content-Type": "application/json",
			"Authorization": `KakaoAK ${REST_API_KEY}`
		},
		data: d.loadMap
	});

	return Response.json(map.data);
}