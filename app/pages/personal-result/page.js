"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './personalResult.module.scss'
import { useRouter } from 'next/navigation'
import { MyContext } from "../../components/Context";
import resultdb from "../../../testdb/result.json"
import axios from 'axios';
import commontrue from '@/app/components/common/commontrue';

function page() {
	const [num, setNum] = useState(0);
	const [state,setState] = useState(false);
	const router = useRouter();
	const {testResultValue, setHeadStatus, setBtmStatus} = useContext(MyContext);
	const [jsondata, setJsondata] = useState(resultdb);
	let loginID;

	if(typeof window !== 'undefined'){
	// if(window){
		loginID = localStorage.getItem('loginId')
	}

	const keywords1 = ["체험", "휴식"];
	const keywords2 = ["체험", "휴식X"];
	const keywords3 = ["힐링", "휴식"];
	const keywords4 = ["힐링", "휴식X"];
	const keywords5 = ["맑음", "휴식"];
	const keywords6 = ["맑음", "휴식X"];
	const keywords7 = ["문화유적지", "휴식"];
	const keywords8 = ["문화유적지", "휴식X"]


	//키워드 5개중에 위의 각각 키워드 2개가 포함되면 true(나머지7개는 false)
	const include1 = keywords1.every(keyword => testResultValue.includes(keyword));
	const include2 = keywords2.every(keyword => testResultValue.includes(keyword));
	const include3 = keywords3.every(keyword => testResultValue.includes(keyword));
	const include4 = keywords4.every(keyword => testResultValue.includes(keyword));
	const include5 = keywords5.every(keyword => testResultValue.includes(keyword));
	const include6 = keywords6.every(keyword => testResultValue.includes(keyword));
	const include7 = keywords7.every(keyword => testResultValue.includes(keyword));
	const include8 = keywords8.every(keyword => testResultValue.includes(keyword));

	//include가 true인 경우가 있으면 num값 입력, 동시에 state라는 변수를 true로 만들어서 
	//num값이 들어온 이후에 num값에 맞는 데이터가 DB에 들어가도록 조건생성
	useEffect (()=>{
		if (include1) {
			setNum(0)
			setState(true)
		} else if(include2) {
			setNum(1)
			setState(true)
		}else if(include3) {
			setNum(2)
			setState(true)
		}else if(include4) {
			setNum(3)
			setState(true)
		}else if(include5) {
			setNum(4)
			setState(true)
		}else if(include6) {
			setNum(5)
			setState(true)
		}else if(include7) {
			setNum(6)
			setState(true)
		}else if(include8) {
			setNum(7)
			setState(true)
		}
		
		setHeadStatus(true);
		setBtmStatus(true);
		commontrue();
	},[])

	//로컬스토리지 id, json 결과의 num번째 내용, 키워드 5개를 DB에 입력
	const inputData=()=>{
		const testData = jsondata[num];
		const json = JSON.stringify(testData);
		const value =  JSON.stringify(testResultValue);
		axios.post('/server_api/personal_result', {profile:loginID,contents:json, keywords:value})
	}

	//state가 true인 경우에만(num이 들어온경우) DB입력
	useEffect(()=>{
		if(state == true){
			inputData();
		}
	},[state])

	//2초 딜레이 후 페이지 이동
	setTimeout(() => router.push('./personal-result/result01'), 2500);

	console.log(num);
	
	return (
		<>
			<div className={style.testbefore}>
				<div className={style.testbeforeback}></div>
				<div className={style.testbottom}></div>
				<div className={style.test + ` inner`}></div>
				<div className={style.loding}>
					<div className={style.lodingjeje}></div>
					<div className={style.lodingimg}></div>
					<div className={style.lodingcon}>
						제주도에서 제일 좋은 여행지를<br/>맞춤 여행지를 찾고 있어요!
					</div>
				</div>
			</div>
		</>
	)
}

export default page