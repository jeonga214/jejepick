import { queryExecute } from "../db";
export async function POST(req) {
	const { contentsid, profile } = await req.json();
	const data = await queryExecute(`insert into itemtable (contentsid,profile) values (?,?)`, [contentsid, profile]);
	//데이터를 넣는법
	const data2 = await queryExecute('SELECT * from itemtable where profile=?', [profile]);

	return Response.json(data2);
}


export async function GET(req) {
	const profile = req.nextUrl.searchParams.get('profile');
	const contentsId = req.nextUrl.searchParams.get('contentsId');

	let data;
	if (contentsId) {
		data = await queryExecute('SELECT * from itemtable where profile=? && contentsId=?', [profile, contentsId]);
	} else {
		data = await queryExecute('SELECT * from itemtable where profile=?', [profile]);
	}

	return Response.json(data);
}


export async function DELETE(req) {
	const { contentsid, profile } = await req.json();
	const data = await queryExecute('DELETE FROM itemtable where contentsid = ? AND profile = ?', [contentsid, profile]);
	const data2 = await queryExecute('SELECT * from itemtable where profile=?', [profile]);

	return Response.json(data2);
}
