import { queryExecute } from "./db";
export async function GET() {
	const data = await queryExecute('SELECT * from jejumembership') //데이터를 가져옴 , 스키마이름 ,테이블이름(jejumembership) 꼭확인!!! 제발!!!!
	return Response.json(data);
}

export async function POST(req) {
	const { id, pw, name, number } = await req.json();
	const data = await queryExecute(`insert into jejumembership (id,pw,name,number) values (?,?,?,?)`, [id, pw, name, number])//데이터를 넣는 법
	return Response.json([]);
}

export async function registerID() {
	const id = await queryExecute('SELECT id from jejumembership')
	return Response.json(id);
}