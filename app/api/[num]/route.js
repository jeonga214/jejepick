import { queryExecute } from "../db";

export async function DELETE(req, { params }) {

	await queryExecute(`delete from jejumembership where num=?`, [params.num]) //데이터를 삭제함
	const getData = await queryExecute(`SELECT * from jejumembership`, [])
	return Response.json(getData);
}

export async function PUT(req, { params }) {
	const data = await req.json();
	const q = await queryExecute(`update jejumembership set name=? where num=?`, [data.name, params.num])

	const getData = await queryExecute('SELECT * from jejumembership')

	return Response.json(getData);
}

export async function GET(req, { params }) {
	const id = await queryExecute('SELECT id from jejumembership where id=?', [params.num])
	return Response.json(id);
}


/* 
	const id= await queryExecute ('SELECT id from jejumembership where id=?',[params.num])
	const data = await req.json();
	const isDuplicate = checkIfAccountIsDuplicate(account);
	if(id.length>0){
			return Response.json({ isDuplicate: true });
	}else{
			return Response.json({ isDuplicate: false });
	}
*/