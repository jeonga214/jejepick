"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from '../../pages/main/main.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import ListItem from '../list/ListItem';
import axios from 'axios';
import { MyContext } from '../Context';
import LoadingComp from '../loading/LoadingComp';

function Mainswiper() {
	const {isStatus} = useContext(MyContext);
	const [dataFilt, setDataFilt] = useState();
	const [loading, setLoading] = useState(true);

	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data
		const filteredData = newData.filter(item => item.region2cd.label === '제주시내');
		
		const randomItem = [];
		for(let i=0; i<8; i++){
			let randomIndex = Math.floor(Math.random() * filteredData.length);
			const selectItem = filteredData[randomIndex];
			randomItem.push(selectItem);
		}
		setDataFilt(randomItem);
		setLoading(false);
	}

	useEffect(() => {
		getData();
		height();
	}, [])

	const height = () => {
		const totalItems = document.getElementsByClassName(`${style.contents_2_bestplacelist}`);
		
		for (let i = 0; i < totalItems.length; i++) {
			const item = totalItems[i];
			const children = item.children;

			if (children.length > 0) {
				const child = children[0].children[0].children;
				for (let i = 0; i < child.length; i++) {
					const childc = child[i].children[0];
					childc.classList.add('child')
				}
			}
		}
	}

	if (loading) {
		return <div><LoadingComp/></div>;
	}

	return (
		<>
			<div className={style.contents_2_bestplacelist}>
				<Swiper
					spaceBetween={20}
					slidesPerView={2.3}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					className="mySwiper"
				>
					{
						dataFilt.map((item, k)=>(
							<SwiperSlide key={k}><ListItem data={item} /></SwiperSlide>
						))
					}
				</Swiper>
			</div>
		</>
	)
}

export default Mainswiper