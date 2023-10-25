"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './personalStart.module.scss'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { MyContext } from "../../components/Context";
import commontrue from '@/app/components/common/commontrue';

function page() {
	const [data, setData] = useState([]);
	const { setTestResultValue, setHeadStatus, setBtmStatus } = useContext(MyContext);

	let loginID;

	if (typeof window !== 'undefined') {
		loginID = localStorage.getItem('loginId')
	}

	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(true);
		commontrue();
	}, []);

	const router = useRouter();

	const delData = () => {
		axios.delete(`/server_api/personal_result?profile=${loginID}`)
			.then(res => {
				setData(res.data);
			})
	}

	function next() {
		delData();
		setTestResultValue([]);
		router.push('/pages/personal-test')
	}

	return (
		<>
			<div className={style.testbefore}>
				<div className={style.content + ` inner`}>
					<div className={style.contentbox}>
						<div className={style.contentbox_logo}>
							<div className={style.contentbox_logo_img}>
								<img src="/asset/common/logo_2.svg" />
							</div>
							<div className={style.contentbox_txt}>
								<p>
									<span>나</span>에게 맞는 <span>여행지</span>는 어디일까?
								</p>
								<p>
									제제픽에서 성향 테스트 진단 결과로
									<br />
									맞춤 여행지를 추천해드려요!
								</p>
							</div>
						</div>
						<div className={style.contentbox_img}>
							<div>
								<img src="/asset/image/IMG_jejudo_bg.png" />
							</div>
						</div>
					</div>
					<div className={style.startbtn} onClick={next}>
						<p>테스트 시작하기</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default page;
