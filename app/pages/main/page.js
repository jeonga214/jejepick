"use client"
import React, { useContext, useEffect, useState } from "react";
import style from "./main.module.scss";
import { MyContext } from "@/app/components/Context";
import Weather from "@/app/components/weather/Weather";
import CourseList from "@/app/components/course/CourseList";
import Mainswiper from "@/app/components/mainswiper/Mainswiper";
import commonfalse from "@/app/components/common/commonfalse";
import axios from "axios";
import CourseBtn from "@/app/components/course/CourseBtn";

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);

	let loginID;

	if (typeof window !== 'undefined') {
		loginID = localStorage.getItem('loginId')
	}

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
	}, []);

	//로컬아이디
	//성향,이름 데이터
	const [aaa, setAaa] = useState({ data1: null, data2: null });

	// 첫 번째 요청 (로그인내용)
	useEffect(() => {
		if (loginID) {
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

	if (aaa.data1 && aaa.data1.length > 0) {
		myName = aaa.data1[0].name;
	}

	if (aaa.data2 && aaa.data2.length > 0) {
		const parsedProfileData = JSON.parse(aaa.data2[0].contents);
		tendency = parsedProfileData.tendency;
	}

	return (
		<>
			<div className={style.back}>
				<div className={style.contents_1 + ` inner`}>
					<div>
						<div className={style.contents_1_text_1}>
							<div className={style.contents_1_text_div}>
								{tendency}
							</div>
							<p>{myName}님을 위한 제주도 여행정보</p>
						</div>
						<div className={style.weather}>
							<div>
								<div className={style.weather_img}>
									<img src="/asset/image/map/ICON_yellow_pin.svg" />
								</div>
								<div className={style.weather_text_wrap}>
									<p>제주특별자치도</p>
									<p className={style.weather_text}><Weather /></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={style.contents_2_3_bg}>
				<div className={style.contents_2 + ` inner`}>
					<div className={style.contents_2_text_2}>
						<p>이런 곳도 있어요!</p>
						<p>지금 뜨고 있는 HOT🔥한 장소들!</p>
						<div>
							<span>#서귀포시</span>
							<span>#애월읍</span>
							<span>#제주시</span>
							<span>#성산읍</span>
						</div>
					</div>
					<div className={style.contents_2_bestplacelist}>
						<Mainswiper />
					</div>
				</div>
				<div className={style.contents_3 + ` inner`}>
					<div className={style.text_wrap}>
						<h2>나의 여행코스</h2>
						<p>더보기</p>
					</div>
					<div className={style.course_wrap}>
						<CourseList />
						<CourseBtn route={"/pages/course-make"} />
					</div>
				</div>
			</div>
		</>
	);
}

export default page;
