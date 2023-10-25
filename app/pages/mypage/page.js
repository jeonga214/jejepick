"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './mypage.module.scss'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MyContext } from '@/app/components/Context';
import ListItem from '@/app/components/list/ListItem';
import CourseList from '@/app/components/course/CourseList';
import CourseBtn from '@/app/components/course/CourseBtn';
import commontrue from '@/app/components/common/commontrue';

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);
	const [data, setData] = useState([]);
	const router = useRouter();
	const [localx, setLocalx] = useState(null);
	const [JejuData, setJejuData] = useState([]);
	const [wow, setWOW] = useState([]);
	//로컬아이디
	//성향,이름 데이터
	const [aaa, setAaa] = useState({ data1: null, data2: null });
	
	let loginID;

	if(typeof window !== 'undefined'){
		loginID = localStorage.getItem('loginId')
	}
	
	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(false);
		commontrue();
	}, []);

	const logOut = () => {
		localStorage.removeItem('loginId');
		router.push("/pages/login");
	}

	const moveResult = () => {
		router.push("/pages/personal-result");
	}

	const moveTest = () => {
		router.push("/pages/personal-start");
	}

	// 첫 번째 요청 (로그인내용)
	useEffect(() => {
		if (loginID) {
			loginID&&
			axios.get(`/server_api/ja?id=${loginID}`)
				.then((response) => {
					setAaa((prevData) => ({
						...prevData,
						data1: response.data,
					}));
				})
				.catch((error) => {
					console.log('Error:', error);
				});
		}
	}, [loginID]);

	// 두 번째 요청(성향테스트결과)
	useEffect(() => {
		if (loginID) {
			loginID&&
			axios.get(`/server_api/jaresult?profile=${loginID}`)
				.then((response) => {
					setAaa((prevData) => ({
						...prevData,
						data2: response.data,
					}));
				})
				.catch((error) => {
					console.log('Error:', error);
				});
		}
	}, [loginID]);

	let myName = null;
	let tendency = null;
	let image = null;
	let tags = null;

	if (aaa.data1 && aaa.data1.length > 0) {
		myName = aaa.data1[0].name;
	}

	if (aaa.data2 && aaa.data2.length > 0) {
		const parsedProfileData = JSON.parse(aaa.data2[0].contents);
		tendency = parsedProfileData.tendency;
		image = parsedProfileData.image;


		if (Array.isArray(parsedProfileData.tag)) {
			tags = parsedProfileData.tag.map(tag => tag.trim());
		} else if (typeof parsedProfileData.tag === 'string') {
			tags = parsedProfileData.tag.split(',').map(tag => tag.trim());
		} else {
			console.error('Unexpected format for tags:', parsedProfileData.tag);
		}
	}

	/* --비짓제주 api데이터 요청-- */
	useEffect(() => {
		axios.get('/api/visit')
			.then((response) => {
				// 비짓제주에서 가져온 데이터를 setJejuData에 저장
				setJejuData(response.data);
			})
	}, [])

	/* --서버 데이터 요청-- */
	useEffect(() => {
		loginID&&
		axios.get(`/server_api/item?profile=${loginID}`)
			.then((response) => { setLocalx(response.data); })
			.catch((error) => { console.log('Error:'.error) });
	}, [loginID])

	useEffect(() => {
		if (JejuData && localx) { //전체데이터와 찜한데이터가 있다면
			const localxContentsIds = localx.map(item => item.contentsid); //찜한데이터에서 contentsid가 있는걸 가져옴
			const filtercontentsid = JejuData.filter((item) => localxContentsIds.includes(item.contentsid))

			setWOW(filtercontentsid);
		}
	}, [JejuData, localx])
	/* ------------------------------- */

	const limitWow = wow.slice(0, 3);

	const moveFavorite = () => {
		router.push("/pages/favorite");
	}

	const moveList = () => {
		router.push("/pages/list");
	}

	const moveCourseList = () => {
		router.push("/pages/course-list");
	}

	return (
		<>
			<div className={style.profile + ` inner`}>
				<div className={style.proback}></div>
				<div className={style.mytop}>
					<div>마이페이지</div>
				</div>
				<div className={style.procon}>
					<div className={style.procontop}>
						<div className={style.myprofileimg}>
							<img src={image} />
						</div>
						<div>
							<p>{tendency}</p>
							<h3>{myName}</h3>
						</div>
					</div>
					<div className={style.proconbottom}>
						{tags && tags[0] && <span>{tags[0]}</span>}
						{tags && tags[1] && <span>{tags[1]}</span>}
						{tags && tags[2] && <span>{tags[2]}</span>}
					</div>
				</div>
			</div>
			<div className={style.prolist + ` inner`}>
				<div className={style.mypagecon1}>
					<div onClick={moveTest} className={style.myevent}>
						<div className={style.recom}>
							<h4>추천 여행지가 아쉬우신가요?</h4>
							<p>테스트 다시하기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
					<div onClick={moveResult} className={style.myevent}>
						<div className={style.recom}>
							<h4>제제픽이 말아주는 성향 테스트 결과</h4>
							<p>결과 다시보기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
				</div>
				<div className={style.mycontopnav}>
					<h2>나의 찜 목록</h2>
					<p onClick={moveFavorite}>더보기</p>
				</div>
				<div className={style.mypagecon2}>
					<ul className={style.cont2_wrap}>
						{wow.length ? 
							limitWow.map((item,k) => (
								<li className={style.con2_item} key={k}>
									<ListItem data={item}  />
								</li>
							))
						: (
							<li onClick={moveList} className={style.heartlistnone}>찜하러 가기</li>
						)}
					</ul>

				</div>
				<div className={style.mycontopnav}>
					<h2>나의 여행코스</h2>
					<p onClick={moveCourseList}>더보기</p>
				</div>
				<div className={style.mypagecon3}>
					<CourseList />
					<CourseBtn route={"/pages/course-make"}/>
				</div>
			</div>
			<div onClick={logOut} className={style.logout}>로그아웃</div>
		</>
	)
}

export default page