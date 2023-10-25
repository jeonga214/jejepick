import { queryExecute } from "../db";

export async function POST(req) {
	const { profile, contents, keywords } = await req.json();
	await queryExecute(`insert into tendency_table (profile, contents, keywords) values (?, ?, ?)`, [profile, contents, keywords])

	return Response.json([]);
}

export async function GET(req) {
	const profile = req.nextUrl.searchParams.get('profile');
	const [data] = await queryExecute('SELECT * from tendency_table WHERE profile=?', [profile])
	if (!data) {
		return Response.json(100);
	} else {
		return Response.json(data);
	}
}

export async function DELETE(req) {
	// const {profile} = await req.json();
	const profile = req.nextUrl.searchParams.get('profile');
	const data = await queryExecute(`delete from tendency_table where profile=?`, [profile])

	return Response.json([]);
}

