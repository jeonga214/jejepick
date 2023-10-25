"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import style from '../../pages/course-list/courseList.module.scss';
import axios from 'axios'; // axios를 import

function CouseItem({ item, setData }) {
	const router = useRouter()

	const handleDelete = async (num, profile) => {
		try {
			const del = await axios.delete(`/server_api/course?num=${num}&profile=${profile}`);

			setData(del.data);
		} catch (error) {

		}
	};

	return (
		<div className={style.whole}>
			<button className={style.item_wrap} onClick={() => {
				router.push(`../../pages/course-list/detail?name=${item.coursename}&id=${item.item_id}`)
			}}>
				<img src='/asset/image/map/ICON_yellow_pin.svg' alt='yellow pin' />
				<p className={style.txt}>{item.coursename}</p>
			</button>

			<button className={style.del_btn} onClick={() => { handleDelete(item.num, item.profile) }}>
				삭제
			</button>
		</div>
	);
}

export default CouseItem;
