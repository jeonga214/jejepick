import { queryExecute } from "../db";
export async function POST(req) {
	const { coursename, item_id, profile } = await req.json();
	const data = await queryExecute(`insert into coursetable (coursename,item_id,profile) values (?,?,?)`, [coursename,
		JSON.stringify(item_id), profile]);
	//데이터를 넣는법 
	return Response.json([]);
}

export async function GET(req) {
	const profile = req.nextUrl.searchParams.get('profile');
	const data = await queryExecute('SELECT * from coursetable where profile=?', [profile]);

	return Response.json(data);
}


export async function DELETE(req) {
	const num = req.nextUrl.searchParams.get('num');
	const profile = req.nextUrl.searchParams.get('profile');
	const data = await queryExecute('DELETE from coursetable where  num=? ', [num]);
	const getData = await queryExecute('select * from coursetable where profile=?', [profile]);

	return Response.json(getData);
}
