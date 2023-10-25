"use client";
import React, { useCallback, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import style from '../pages/signup/signup.module.scss';
function Memberform() {
	const [account, setAccount] = useState('');//아이디
	const [accountMessage, setAccountMessage] = useState('');//중복 확인 메시지
	const [accountMessageStyle, setAccountMessageStyle] = useState({ color: 'black' }); // 스타일 객체

	const onClickAccount = async () => {
		const response = await axios.get(`/server_api`, {
			params: { status: 'idcheck', id: account },
		});
		const userData = response.data;
		//존재하는 아이디들을 배열로 추출
		const user_id = userData.map(item => item.id);
		if (user_id.includes(account)) {
			setAccountMessage('중복된 아이디 입니다.');
			setAccountMessageStyle({ color: 'red' });
			return;
		}
		else {
			setAccountMessage('사용 가능한 아이디입니다.');
			setAccountMessageStyle({ color: 'green' });
		}
		if (account.length === 0) {
			setAccountMessage('아이디를 입력해주세요.')
			setAccountMessageStyle({ color: 'red' });
		}
	}
	// 아이디 입력 필드 값이 변경될 때 호출되는 함수
	const handleAccountChange = (e) => {
		const interId = e.target.value;
		setAccount(interId);
	};

	const [password, setPassword] = useState(''); // 비밀번호
	const [passwordCheck, setPasswordCheck] = useState('');//비밀번호 확인
	const [passwordError, setPasswordError] = useState('');//오류메시지 저장
	const [ispassword, setIsPassword] = useState(false);//유효성 검사
	const [isPasswordMatch, setIsPasswordMatch] = useState(true);//비밀번호 색깔 
	const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)//비밀번호 유효성 검사2
	const [passwordMessage, setPasswordMessage] = useState(''); // 비밀번호 유효성 메시지
	const [passwordConfirm, setPasswordConfirm] = useState(''); // 비밀번호 확인
	const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(''); // 비밀번호 확인 메시지

	//비밀번호 입력
	const onChangePassword = (e) => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,15}$/
		const passwordCurrent = e.target.value;
		setPasswordError(passwordConfirm !== passwordCurrent)
		setPasswordCheck(passwordCurrent)
		if (!passwordRegex.test(passwordCurrent)) { //입력값이 정규식이랑 다르면 
			setPasswordMessage('숫자+영문자+특수문자 조합으로 8-15자리로 입력해주세요.')
			setIsPassword(false)
		} else {
			setPasswordMessage('안전한 비밀번호 입니다.')
			setIsPassword(true)
		}
		setPassword(passwordCurrent); //비밀번호에 입력값을 넣음
	}

	// 비밀번호 확인
	const onChangePasswordConfirm = useCallback((e) => {
		const passwordConfirmCurrent = e.target.value;
		setPasswordConfirm(passwordConfirmCurrent);
		if (password === passwordConfirmCurrent) {
			setPasswordConfirmMessage('비밀번호가 일치합니다.');
			setIsPasswordConfirm(true);
			setIsPasswordMatch(true); // 일치할 때 true로 설정
		} else {
			setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
			setIsPasswordConfirm(false);
			setIsPasswordMatch(false); // 일치않알 때 false로 설정
		}
	}, [password]);

	//비밀번호 색깔
	const getPasswordConfirmStyle = () => {
		if (isPasswordConfirm) {
			return { color: ' green' }; // 일치할 때의 스타일
		} else {
			return { color: 'red' }; // 불일치할 때의 스타일
		}
	};
  
	const nv = useRouter();
	const insertFn = (e) => {
		e.preventDefault();
		const formdata = new FormData(e.target);
		const values = Object.fromEntries(formdata);
		axios.post('/server_api', values)
		if (accountMessageStyle.color === 'red') {
			alert('중복된 아이디입니다. 다른 아이디를 입력해주세요.');
			return;
		}
		// 비밀번호 제한 조건 확인
		if (!ispassword) {
			alert('비밀번호가 유효성 조건을 충족하지 않습니다. 비밀번호를 다시 입력해주세요.');
			return;
		}

		// 비밀번호 확인
		if (!isPasswordConfirm) {
			alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
			return;
		}
		nv.push('./login');
	}
	return (
		<div className={style.membershipform}>
			<div className={style.header}>
				<Link href="/pages/login">
					<img src="/asset/common/back_btn.svg" alt="설명" />
				</Link>
				<h2>회원가입</h2>
			</div>
			<div className={style.MScontents}>
				<img src="/asset/common/membershipJEJElogo.svg" alt="설명" />
				<p>가입을 통해 제제픽의 서비스를 만나보세요!</p>
			</div>
			<form onSubmit={insertFn}>
				<div className={style.Namecontents}>
					<b>이름</b>
					<input type='text'
						name='name'
						placeholder='성명을 입력하세요'
						className={style.nameEnter}
						required
					/>
				</div>
				<div className={style.IDcontents}>
					<div className={style.IDtxt}>
						<b>아이디</b><p>{accountMessage}</p>

					</div>
					<div className={style.IDifcont}>
						<input type='text'
							name='id'
							placeholder='아이디를 입력해주세요'
							onChange={handleAccountChange}
							className={style.IDEnter}
							required
						/>

						<input type='button'
							name='accountcheck'
							value='중복 확인'
							onClick={onClickAccount}
							className={style.IDduplication}
						/>
					</div>
				</div>
				<div className={style.PWcontents}>
					<div className={style.PWtxt}>
						<b>비밀번호</b>
						{/* {
								password.length>0 &&(
										<span>
												{passwordMessage}
										</span>
								)
						} */}
					</div>
					<input type='password'
					name='pw'
					placeholder='영어, 숫자, 특수문자 조합의 8-15자'
					defaultValue={passwordCheck}
					onChange={onChangePassword}
					id='pw1' className={style.PWEnter} required />
					{/* <p>{password.length}</p> */}
				</div>
				<div className={style.PWrecontents}>
					<div className={style.PWretxt}>
						<b>비밀번호 재확인</b>
						<p style={getPasswordConfirmStyle()}>{passwordConfirmMessage}{isPasswordConfirm}</p>
					</div>

					<input type='password'
					name='pw_rec'
					placeholder='비밀번호를 한번 더 입력해주세요'
					id='pw2'
					onChange={onChangePasswordConfirm}
					className={style.PWreEnter} required />
				</div>
				<div className={style.Numbercontents}>
					<b>휴대폰번호</b>
					<input type='number'
					name='number'
					placeholder='하이픈을 제외한 숫자만 입력해주세요'
					className={style.numberEnter} required />
				</div>
				<div className={style.Membershipbtn}>
					<p>제주도로 떠나볼까요?</p>
					<input type='submit'
					name='Login'
					className={style.membershipbtn}
					value='가입하기' />
				</div>
			</form>
		</div>
	)
}

export default Memberform