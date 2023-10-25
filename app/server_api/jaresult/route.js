import { queryExecute } from "../db";

export async function GET(req) {
	const profile = req.nextUrl.searchParams.get('profile');
	const data = await queryExecute('SELECT * from tendency_table where profile=?', [profile]);

	return Response.json(data);
}