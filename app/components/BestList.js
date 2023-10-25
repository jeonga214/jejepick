"use client"
import React, { useContext, useEffect, useState } from "react";
import style from "../pages/best-list/best.module.scss";
import List from "@/app/components/list/List";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MyContext } from "./Context";
import LoadingComp from "./loading/LoadingComp";

export default function BestList() {
	const router = useRouter();
	const [aaa, setAaa] = useState(null);
	const { testResultValue } = useContext(MyContext);

	//api 데이터
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [tags, setTags] = useState([]);

	let [myName, setMyname] = useState(null);
	let [tendency, setTendency] = useState(null);
	let [image, setImage] = useState(null);
	let [bestlist, setBestlist] = useState([]);


	async function getData() {
		const result = await axios.get('/api/visit2');
		const newData = result.data;

		setData(newData);
		setLoading(false);
	}

	let loginID;

	if (typeof window !== 'undefined') {
		loginID = localStorage.getItem('loginId')
	}

	useEffect(() => {
		getData();
	}, [])

	// 첫 번째 요청 (로그인내용)
	const aaaData = async () => {
		if (loginID) {
			const ja = await axios.get(`/server_api/ja?id=${loginID}`)
			const jaresult = await axios.get(`/server_api/jaresult?profile=${loginID}`)

			setAaa({ data1: ja.data, data2: jaresult.data });
		}
	}
	useEffect(() => {
		aaaData();
	}, [loginID]);

	useEffect(() => {
		if (aaa) {
			const parsedProfileData = JSON.parse(aaa.data2[0].contents);
			let parseBestList = JSON.parse(aaa.data2[0].keywords);

			//빈배열바꾸기
			for (let i = 0; i < parseBestList.length; i++) {
				if (parseBestList[i].includes("X")) {
					parseBestList[i] = "";
				}
			}

			if (Array.isArray(parsedProfileData.tag)) {
				console.log(parsedProfileData.tag.map(tag => tag.trim()), '=======================')
				setTags(parsedProfileData.tag.map(tag => tag.trim()));
			} else if (typeof parsedProfileData.tag === 'string') {
				setTags(parsedProfileData.tag.split(',').map(tag => tag.trim()));
			} else {
				console.error('Unexpected format for tags:', parsedProfileData.tag);
			}

			setBestlist(parseBestList);
			setMyname(aaa.data1[0].name)
			setTendency(parsedProfileData.tendency)
			setImage(parsedProfileData.image)
		}
	}, [aaa])

	const listmove = (e) => {
		router.push("/pages/list");
	}

	if (!data.length && !tags.length) {
		return <div><LoadingComp /></div>;
	}

	return (
		<>
			<div className={style.best}>
				<div className={style.contents_bestlist_back}>
					<div className={style.contents_profile + ` inner`}>
						<div className={style.contents_profile_img}>
							<div>
								<img src={image} />
							</div>
						</div>
						<ul className={style.contents_profile_txt}>
							<li>
								<p>{tendency}</p>
							</li>
							<li>
								<b>{myName}</b>
							</li>
							<li>
								{tags && tags[0] && <span>{tags[0]}</span>}
								{tags && tags[1] && <span>{tags[1]}</span>}
								{tags && tags[2] && <span>{tags[2]}</span>}
							</li>
						</ul>
					</div>
					<div className={style.contents_bestlist_txt + ` inner`}>
						<div>
							<p>제제픽의 맞춤 여행지!</p>
							<p>이런 여행지는 어떠신가요?</p>
						</div>
						<p onClick={listmove}>전체보기
							<img src="/asset/common/back_btn.svg" />
						</p>
					</div>
				</div>

				<div className={style.contents_bestlist_back2}>
					<div className={style.contents_bestlist + ` inner`}>
						<div className={style.list}>
							<div className={style.listcon}>
								<h2><img src="/asset/image/bestlist/marker1.svg" />숙소 추천</h2>
							</div>
							<List bestlist={[bestlist[2], bestlist[3]]} data={data[0]} />
						</div>
						<div className={style.list}>
							<div className={style.listcon}>
								<h2><img src="/asset/image/bestlist/marker2.svg" />맛집 추천</h2>
							</div>
							<List bestlist={[bestlist[0], bestlist[1]]} data={data[1]} />
						</div>
						<div className={style.list}>
							<div className={style.listcon}>
								<h2><img src="/asset/image/bestlist/marker3.svg" />명소 추천</h2>
							</div>
							<List bestlist={[bestlist[0], bestlist[4]]} data={data[2]} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

