import { queryExecute } from "./db";

/*  로그인,회원가입 전용  */

export async function GET(req) {
	const status = req.nextUrl.searchParams.get('status');

	if (status === 'idcheck') {
		//idcheck =회원가입 시 아이디 중복확인 체크
		const id = req.nextUrl.searchParams.get('id');
		// 아이디 파라미터를 가져옴
		const existingUsers = await queryExecute('SELECT * from jejumembership where id=?', [id])
		return Response.json(existingUsers);
	} else {
		// 그게 아니라면 로그인 할때 아이디와 패스워드 값을 가져와야함

		const id = req.nextUrl.searchParams.get('id');
		// 아이디 파라미터를 가져옴

		const pw = req.nextUrl.searchParams.get('pw');
		// 패스워드 파라미터를 가져옴
		const user = await queryExecute('SELECT * FROM jejumembership WHERE id = ? AND pw = ?', [id, pw]);

		if (user.length > 0) {
			//0보다 크면 하나의 정보가 담기므로 로그인 성공을 뜻함
			// 로그인 성공
			return Response.json({ success: true, user: user[0] });
		} else {
			// 로그인 실패
			return Response.json({ success: false, message: '로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.' });
		}
	}
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