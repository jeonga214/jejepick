"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import React from 'react'
import style from './courseMake.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { useRouter } from "next/navigation";
import commonfalse from "@/app/components/common/commonfalse";
import { MyContext } from "@/app/components/Context";
import Loading from "@/app/components/loading/Loading";
import '../../components/list/listitem.scss'


function page() {
	const [data, setData] = useState([]); // 숙박 관련 
	const [data2, setData2] = useState([]); // 관광지 관련
	const [data3, setData3] = useState([]); // 음식점 관련
	const [loading, setLoading] = useState(true); //api 불러올때
	const [selectedItems, setSelectedItems] = useState([]); // 선택 함수
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 
	const [selectedItemContent, setSelectedItemContent] = useState(''); //클릭한 아이템 내용들
	const router = useRouter();
	const [modalTitle, setModalTitle] = useState('');
	const [JejuData, setJejuData] = useState([]);
	const { setHeadStatus, setBtmStatus, isStatus, setIsStatus} = useContext(MyContext);

	let loginID;

	if (typeof window !== 'undefined') {
		loginID = localStorage.getItem('loginId')
	}

	function openModal() {
		setIsModalOpen(true);
		const bodyElement = document.body;
		bodyElement.classList.remove(style.close)
		bodyElement.classList.add(style.open)
	}
	
	function closeModal() {
		setIsModalOpen(false);
		const bodyElement = document.body;
		bodyElement.classList.remove(style.open)
		bodyElement.classList.add(style.close)
	}
	function closeModal2() {
		setIsModalOpen(false);
		const bodyElement = document.body;
		bodyElement.classList.remove(style.open);
		bodyElement.classList.add(style.close);
		router.push("/pages/course-list");
	}

	const insertFn = (e) => {
		e.preventDefault();
		const contentIds = selectedItems.map((item) => item.contentsid);
		const formdata = new FormData(e.target);
		const values = Object.fromEntries(formdata);

		// 코스 이름이 비어 있는지 확인
		if (!values.coursename) {
			alert('코스 이름을 입력하세요.');
		} else {
			axios.post(`/server_api/course`, { ...values, profile: loginID, item_id: contentIds })
				.then((response) => {
					router.push('/pages/course-list');
				})
				.catch((error) => {
					console.error('에러 발생:', error);
				});
		}
		const bodyElement = document.body;
		bodyElement.classList.remove(style.open);
		bodyElement.classList.add(style.close);
		router.push("/pages/course-list");
	}

	function ItemClick(item) {
		// 이미 선택된 항목인지 확인
		const isItemSelected = selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid);

		// 이미 선택된 항목이라면 제거, 아니라면 추가
		if (isItemSelected) {
			setSelectedItems((prevSelectedItems) =>
				prevSelectedItems.filter((selectedItem) => selectedItem.contentsid !== item.contentsid)
			);
		} else {
			if (selectedItems.length < 5) {
				const newItem = { ...item, order: selectedItems.length + 1 };
				setSelectedItems((prevSelectedItems) => [...prevSelectedItems, newItem]);
			}
		}
	}

	const filterData = (data) => {
		const filteredData1 = data.filter(item => item.contentscd.label === '숙박');
		const filteredData2 = data.filter(item => item.contentscd.label === '관광지');
		const filteredData3 = data.filter(item => item.contentscd.label === '음식점');

		setData(filteredData1); // 숙박 관련 데이터 저장
		setData2(filteredData2); // 관광지 관련 데이터 저장
		setData3(filteredData3); // 음식점 관련 데이터 저장
	};

	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data
		//filterData(newData);
		//setData(newData);
		setJejuData(newData);
		setLoading(false);
	}

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
		getData();
	}, [])

	/* --서버 데이터 요청-- */
	useEffect(() => {
		if (loginID && JejuData.length){
			axios.get(`/server_api/item?profile=${loginID}`)
			.then((response) => { 
				let localx = response.data.map(item => item.contentsid)
				const filtercontentsid = JejuData.filter((item) => localx.includes(item.contentsid))
				filterData(filtercontentsid);
			})
			.catch((error) => { console.log('Error:'.error) });
		}
	}, [loginID,isStatus,JejuData])

	/* ------------------------------- */

	const moveList = () => {
		router.push("/pages/list");
	}

	if (loading && !data.length && !data2.length && !data3.length) {
		return <div><Loading /></div>;
	}

	return (
		<div className={style.course_make + ` inner`}>
			<div className={style.mid_title}>
				<h2>내가 만든 여행코스로 더욱 즐겁게 여행해요!</h2>
				<a></a>
			</div>

			<div className={style.whole}>
				<div className={style.choose_wrap}>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_sleep_pin.svg" />
						<p>숙소 중 한곳을 선택해주세요</p>
					</div>

					<Swiper
						slidesPerView={3}
						spaceBetween={10}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className={style.api_pic_list}>

						{data.length ?
							data.map((item) => (
								<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`} key={item.contentsid}>
									<div className={style.item_wrap+' item_wrap'} onClick={() => ItemClick(item)}>
										<div className='img_wrap'>
											<img src={item?.repPhoto?.photoid?.thumbnailpath} alt="" />
										</div>
										<div className='text_wrap'>
											<p>{item.title}</p>
										</div>
									</div> {/* 여기는 API 불러온 데이터 부분 */}
								</SwiperSlide>
							)) :
							(
								<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
							)
						}
					</Swiper>
				</div>

				<div className={style.choose_wrap}>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_food_pin.svg" />
						<p>가고 싶은 맛집을 두 곳을 선택해 주세요</p>
					</div>
					<Swiper
						slidesPerView={3}
						spaceBetween={10}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}

						className={style.api_pic_list}>


						{data3.length ?
							data3.map((item) => (
								<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`} key={item.contentsid}>
									<div className={style.item_wrap+' item_wrap'} onClick={() => ItemClick(item)}>
										<div className='img_wrap'>
											<img src={item?.repPhoto?.photoid?.thumbnailpath} alt="" />
										</div>
										<div className='text_wrap'>
											<p>{item.title}</p>
										</div>
									</div> {/* 여기는 API 불러온 데이터 부분 */}
								</SwiperSlide>
							)) :
							(
								<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
							)}
					</Swiper>
				</div>

				<div className={style.choose_wrap}>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_tour_pin.svg" />
						<p>가고 싶은 명소를 두곳 선택해주세요</p>
					</div>

					<Swiper
						slidesPerView={3}
						spaceBetween={10}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className={style.api_pic_list}>
						{data2.length ?
							data2.map((item) => (
								<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`} key={item.contentsid}>
									<div className={style.item_wrap+' item_wrap'} onClick={() => ItemClick(item)}>
										<div className='img_wrap'>
											<img src={item?.repPhoto?.photoid?.thumbnailpath} alt="" />
										</div>
										<div className='text_wrap'>
											<p>{item.title}</p>
										</div>
									</div> {/* 여기는 API 불러온 데이터 부분 */}
								</SwiperSlide>
							)) :
							(
								<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
							)}
					</Swiper>
				</div>
			</div>
			<div className={style.course_navi}>
				<button className={style.course_btn}
					onClick={() => {
						setModalTitle('');
						setSelectedItemContent(selectedItems.map(item => item.title).join(', ')); openModal();
					}}>
					<p>코스 저장하기</p>
				</button>
			</div>
			{isModalOpen && (
				<div className={style.modal}>
					<div className={style.modal_content}>
						<div className={style.modal_title}>
							<h2>코스 이름을 입력해 주세요!</h2>
							<button onClick={closeModal} className={style.close_btn}>X</button>
						</div>
						<form onSubmit={insertFn}>
							<input
								type="text"
								name="coursename"
								placeholder="이름을 입력하세요"
								className={style.search}
								>
							</input>
							<div className={style.modal_allign}>
								{selectedItems.map((item, index) => (
									<React.Fragment key={item.contentsid}>
										<div className={style.modal_itemlist}>
											<p className="item_num">{index+1}</p>
											<p>{item.title}</p>
											{index !== selectedItems.length - 1 && <br />} {/* 마지막 항목이 아닌 경우에만 줄 바꿈 추가 */}
										</div>
									</React.Fragment>
								))}
								<div className={style.modal_btn_wrap}>
									<button className={style.modal_btn}>
										<p>저장</p>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}

export default page