"use client";
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context';
import style from './common.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

function BtmNavi() {
	const {btmStatus, setBtmStatus} = useContext(MyContext);
	const router = useRouter();

	const listLoad = ()=>{
		const reload = location.pathname;
		if(reload == "/pages/list"){
			window.location.reload();
		}else{
			router.push('/pages/list')
		}
	}

	return (
		<footer className={`${style.footer} ${btmStatus ? 'hidden':''}`+` bottom`}>
			<ul className={style.footer_wrap}>
				<li className={style.footer_item}>
					<Link href='/pages/favorite'>
						<img src='/asset/common/Icon_favorite.svg' />
						<p>찜</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/pages/course-list'>
						<img src='/asset/common/Icon_course-list.svg' />
						<p>여행 코스</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/pages/main'>
						<img src='/asset/common/Icon_home.svg' />
						<p>홈</p>
					</Link>
				</li>
				<li onClick={listLoad} className={style.footer_item}>
					<Link href={`/pages/list`}>
						<img src='/asset/common/Icon_list.svg' />
						<p>전체리스트</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/pages/mypage'>
						<img src='/asset/common/Icon_mypage.svg' />
						<p>마이페이지</p>
					</Link>
				</li>
			</ul>
		</footer>
	)
}

export default BtmNavi