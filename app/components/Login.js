"use client";
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import style from '../pages/login/login.module.scss';
function Login() {
	const [id, setidInput] = useState('');
	const [password, setPasswordInput] = useState('');
	const nv = useRouter(); //<==로그인 누르면 들어가야 하는 페이지로 이어줌 

	const onClickLogin = async (e) => {
		//로그인 버튼 클릭시 다음페이지로 넘어갈떄 로컬스토리지에 데이터를 저장 (타 페이지에서 정보를 가져오고 싶으면 loaclStorage.getItem('loginInfo')하면 가져오기 가능)
		e.preventDefault();

		if (!id || !password) {
			alert('아이디와 비밀번호를 입력하세요.');
			return;
		}
		try {
			// 로그인 요청 보내기
			const response = await axios.get(`/server_api?id=${id}&pw=${password}`);
			console.log(response.data);

			if (response.data.success) {
				// 로그인 성공
				// localStorage.setItem('loginId', id);
				typeof window !== 'undefined' ? window.localStorage.setItem('loginId', id) : null;

				const res = await axios.get(`/server_api/personal_result?profile=${id}`)
				console.log(res);
				if (res.data == 100) {
					nv.push('/pages/personal-start');
				}
				else {
					nv.push('/pages/main');
				}
			} else {
				// 로그인 실패 처리
				alert(response.data.message);
			}
		} catch (error) {
			console.error('로그인 요청 실패', error);
		}
	}

	return (
		<div className={style.LoginContents}>
			<div className={style.mainimage} >
				<img src='/asset/common/JEJEPicklogin.svg' />
			</div>
			<form onSubmit={onClickLogin} className={style.loginform}>
				<div className={style.loginInput}>
					<div className={style.idInputContents}>
						<img src='/asset/common/icon_id.svg'></img>
						<input
							type='text'
							name='id'
							placeholder='아이디를 입력해주세요'
							value={id}
							//아이디가 입력되면 값이 나옴
							onChange={(e) => setidInput(e.target.value)}
							className={style.idInput}
							required
						/>
					</div>
					<div className={style.pwInputContents}>
						<img src='/asset/common/icon_pw.svg'></img>
						<input
							type='password'
							name='password'
							placeholder='비밀번호를 입력해주세요'
							value={password}
							onChange={(e) => setPasswordInput(e.target.value)}
							className={style.pwInput}
							required
						/>
					</div>
					<input
						type='submit'
						name='Login'
						value='로그인'
						className={style.Loginbtn}
					/>
				</div>
				<div className={style.registertxt}>
					<p>회원이 아니신가요? <a href='./signup'> 회원가입</a></p>
				</div>
			</form>
			<img src='/asset/common//loginfooterimg.svg'></img>
		</div>
	)
}

export default Login

