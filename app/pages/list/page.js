"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './list.module.scss'
import List from '@/app/components/list/List';
import TotalList from '@/app/components/list/TotalList';
import { MyContext } from '@/app/components/Context';
import commonfalse from '@/app/components/common/commonfalse';
import axios from 'axios';
import SearchList from '@/app/components/list/SearchList';


function Page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);
	const [tabTxt, setTabTxt] = useState("숙소");
	const [totalData, setTotalData] = useState([]);
	const [searchedData, setSearchedlData] = useState([]);
	const [state, setState] = useState(true);

	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data;
		setTotalData(newData);
	}

	// 검색 창
	async function searchBox(e) {
		e.preventDefault();
		let sText = e.target.children[0].value;
		e.target.children[0].value = '';
		let searchData = totalData.filter(data=>data.title.includes(sText));
		
		if (searchData.length){
			setSearchedlData(searchData);
			const tab = document.getElementById('tabMenu');
			tab.classList.add('hidden')
			setState(false);
		
		}else{
			alert('검색결과가 없습니다.')
			
		}
	}

	// 탭 메뉴
	function tab_click() {
		// const tabItem = document.querySelectorAll('.tab_list .tab_item')
		const tabItem = document.getElementsByClassName(`${style.tab_list}`);
		const tabtab = [...tabItem[0].children];
		const hadActive = document.getElementsByClassName(`${style.active}`);

		let num = 0, txt = '';
		tabtab.forEach(function (v, k) {
			v.addEventListener('click', function () {
				tabtab[num].classList.remove(`${style.active}`);
				this.classList.add(`${style.active}`);
				txt = this.children[1].innerText;
				setTabTxt(txt);
				num = k;
			})
		});
	}

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
		tab_click();
		setTabTxt("숙소");
		getData();
	}, []);

	return (
		<>
			<div className={`inner ` + style.list_contwrap}>
				<h2>내가 만든 제주도 제일 좋은 코스!</h2>
				<form className={style.search_wrap} onSubmit={(e) => { searchBox(e) }}>
					<input type='text' placeholder='검색어를 입력하세요.' className={style.search_box}>
					</input>
					<button className={style.search_btn}>
						<img src='/asset/image/list/ICON_search.svg' />
					</button>
				</form>
				<div className={style.tab_wrap} id='tabMenu'>
					<ul className={style.tab_list}>
						<li className={`${style.tab_item} ${style.active}`}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>숙소</p>
						</li>
						<li className={style.tab_item}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>맛집</p>
						</li>
						<li className={style.tab_item}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>관광</p>
						</li>
					</ul>
				</div>
				<div className={style.totallist_wrap}>
					<h2>전체 여행 정보</h2>
					{state ?
						<TotalList tabTxt={tabTxt} totalData={totalData} searchedData={searchedData} />
						:
						<SearchList searchedData={searchedData} />
					}
				</div>
			</div>
		</>
	)
}

export default Page