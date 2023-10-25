"use client";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./courseList_id.module.scss";
import { useSearchParams } from "next/navigation";
import { MyContext } from "@/app/components/Context";
import commonfalse from "@/app/components/common/commonfalse";
import Loading from "@/app/components/loading/Loading";

export default function Home() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);
	//======================전 페이지에서 코스 가져오기==================
	// course-list에서 데이터 가져오기
	const param = useSearchParams();
	const idString = param.get("id");
	const nameString = param.get("name");
	const idArray = JSON.parse(idString);
	const [finaldata, setFinaldata] = useState([]);
	const [apiData, setApiData] = useState();
	const [loading, setLoading] = useState(true);

	//return 값 함수
	const courseName = nameString; // 코스 이름
	const getNandL = () => {
		return finaldata.map((data, i) => ({
			title: data.title,
			label: data.contentscd.label,
		}));
	}; //각 이름과 라벨 나오게 하기

	// 제주 리스트 api에서 데이터 가져오기
	useEffect(() => {
		axios.get("/api/visit").then((response) => {
			setApiData(response.data);
		});
		
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
	}, []);

	useEffect(() => {
		if (apiData && idString) {
			const filterdata = apiData.filter((item) =>
				idArray.includes(item.contentsid)
			);
			setFinaldata(filterdata);
		}
	}, [apiData, idString]);

	//===================전 페이지에서 코스 가져오기===========

	//======================경유지 관련 코드 =========================

	useEffect(() => {
		const kakaoMapScript = document.createElement("script");
		kakaoMapScript.async = false;
		kakaoMapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=558707a6f749efbb09700579aafb3c02&autoload=false`;
		document.head.appendChild(kakaoMapScript);

		let loadMap, _map;
		if (finaldata.length) {
			let waypointArry = [];
			finaldata.forEach((obj, k) => {
				if (k != 0 || finaldata.length - 1 != k) {
					waypointArry.push({
						name: "name0",
						x: obj.longitude.toString(),
						y: obj.latitude.toString(),
					});
				}
			});

			loadMap = {
				origin: {
					x: finaldata[0].longitude.toString(),
					y: finaldata[0].latitude.toString(),
				},
				destination: {
					x: finaldata[finaldata.length - 1].longitude.toString(),
					y: finaldata[finaldata.length - 1].latitude.toString(),
				},
				waypoints: waypointArry,
				priority: "RECOMMEND",
				car_fuel: "GASOLINE",
				car_hipass: false,
				alternatives: false,
				road_details: false,
			};

			const onLoadKakaoAPI = () => {
				window.kakao.maps.load(() => {
					const container = document.getElementById("map");
					const options = {
						center: new window.kakao.maps.LatLng(33.3846, 126.5535),
						level: 10,
					};
					_map = new window.kakao.maps.Map(container, options);
				});
				postfn();
			};

			kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
		}

		function postfn() {
			axios.post("/api/map", { loadMap }).then((arg) => {
				console.log(arg);
				setTimeout(() => {
					let { result_code, summary, sections } = arg?.data?.routes[0];
					if (sections) {
						let allRoads = [],
							allGuides = [],
							allMarker = [],
							allDuration = 0,
							allDistance = 0;
						sections.forEach((obj) => {
							let { distance, duration, guides, roads } = obj;
							allRoads = allRoads.concat(roads);
							allGuides = allGuides.concat(guides);
							allDuration += duration;
							allDistance += distance;
						});
						allMarker = allGuides.filter((obj) => {
							if (
								(obj.name == "출발지") |
								(obj.name == "목적지") |
								(obj.name == "경유지")
							) {
								return true;
							}
						});

						let detailRoads = [];
						for (let i = 0; i < allRoads.length; i++) {
							let arg = allRoads[i];
							let mini = arg.vertexes;
							let cursor = 0;
							while (cursor < mini.length) {
								let obj = new kakao.maps.LatLng(mini[cursor + 1], mini[cursor]);
								detailRoads.push(obj);
								cursor = cursor + 2;
								if (cursor >= 1000000) break;
							}
						}

						allGuides = allGuides.map((arg, idx) => {
							let { x, y } = arg;
							if (x && y) {
								arg.position = new kakao.maps.LatLng(arg.y, arg.x);
							}
							return arg;
						});

						let markerImg = [
							"/asset/image/map/ICON_starting_pin.svg",
							"/asset/image/map/ICON_way_pin.svg",
							"/asset/image/map/ICON_final_pin.svg",
						];
						let imageSize = new kakao.maps.Size(40, 51);
						function marker(title, position, n) {
							console.log(n);
							let image = new kakao.maps.MarkerImage(markerImg[n], imageSize);
							let marker1 = new kakao.maps.Marker({
								map: _map, // 마커를 표시할 지도
								position,
								title: title ? title : "", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
								image, // 마커 이미지
							});
						}
						allMarker.forEach((obj, k) => {
							let num = 0;
							obj.name == "출발지"
								? (num = 0)
								: obj.name == "목적지"
									? (num = 2)
									: (num = 1);
							if (k != 1 && k != 2) marker(obj.title, obj.position, num);
						});

						// 지도에 표시할 선을 생성합니다
						let polyline = new kakao.maps.Polyline({
							//path: arrays.map( arg=> arg.position), // 선을 구성하는 좌표배열 입니다
							path: detailRoads,
							strokeWeight: 5, // 선의 두께 입니다
							strokeColor: "red", // 선의 색깔입니다
							strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
							strokeStyle: "solid", // 선의 스타일입니다
						});
						polyline.setMap(_map);

						let customOverlay = new kakao.maps.CustomOverlay({
							position: new kakao.maps.LatLng(
								allGuides[allGuides.length - 1].y + 0.0012,
								allGuides[allGuides.length - 1].x
							),
							content: `<div class ="label">거리, 시간 : ${allDistance}mm, ${allDuration}초</div>`,
						});

						customOverlay.setMap(_map);
					}
				}, 1000);
			}, []);
		}
		setLoading(false);
	}, [finaldata]);

	//======================경유지 관련 코드 =========================

	if (loading) {
		return <div><Loading /></div>;
	}

	return (
		<div className={style.main}>
			<div id="map" style={{ width: "100%", height: "370px" }}></div>
			<div className={style.frame}>
				<p>내가만든 제일 좋은 여행 코스!</p>
				<div className={style.title}>
					<img src='/asset/image/map/ICON_yellow_pin.svg'></img>
					<h1>회원님의 {courseName} 여행 코스</h1>
				</div>
				<div className={style.sec1}>
					{getNandL().map((data, i) => (
						<div className={style.sec2} key={i}>
							<p>{data.title}</p>
							<span></span>
							<p>{data.label}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
