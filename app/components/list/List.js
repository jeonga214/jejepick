import React, { useState, useEffect } from 'react';
import style from '../../pages/list/list.module.scss'
import './listitem.scss'
import Link from 'next/link'
import Heart from '../Heart';
import LoadingComp from '../loading/LoadingComp';

function List({bestlist,data}) {

// const [randomItems,setRandomItems] = useState([]);

let [ddd,setDdd] = useState([]);

	function filter(e) {
		let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes(bestlist[0]) && obj.alltag.includes(bestlist[1])) : [];

		setDdd(filteredData.slice(0, 3))
	}

	// 무작위로 3개의 요소 선택
	/* function getRandomItems(arr, numItems) {
		const shuffled = arr.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, numItems);
	} */

	useEffect(()=>{
		filter();
	},[data,bestlist])

	// 랜덤
	/* useEffect(()=>{
		setRandomItems(getRandomItems(ddd, 3));
	},[ddd]) */

	if (!ddd.length) {
		return <div><LoadingComp /></div>;
	}

	return (
		<>
			<ul className={style.list}>
				{ddd.map((item, k) => (
					<li className={style.list_item} key={k}>
						<Link href={`/pages/list/${item.contentsid}`} className='item_wrap'>
							<div className='img_wrap'>
								<img src={item.repPhoto.photoid.imgpath}></img>
							</div>
							<div className='text_wrap'>
								<p id='overflow'>{item.title}</p>
								<Heart dataId={item.contentsid}/>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default List