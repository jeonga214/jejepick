"use client"
import testdb from "../../testdb/data.json"
import style from '../pages/personal-test/personalTest.module.scss'
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { MyContext } from "./Context";

export default function Test() {
	const router = useRouter();
	const [jsondata, setJsondata] = useState(testdb);
	const [num, setNum] = useState(0);
	const [option, setOption] = useState('')
	const { setTestResultValue } = useContext(MyContext);
	const { testResultValue } = useContext(MyContext);

	//다음 질문으로 이동
	const next = () => {
		if (option) {
			if (num < jsondata.length - 1) {
				setNum(num + 1);
				setTestResultValue([option, ...testResultValue]);
				setOption('')

			} else {
				setTestResultValue([option, ...testResultValue])
				setOption('')
				router.push('/pages/personal-result')
			}
		} else {
			alert('문항을 알맞게 선택해주세요')
		}
	};

	const word = (keyword) => {
		setOption(keyword.target.parentElement.getAttribute("data-keyword"));
		keyword.currentTarget.classList.toggle(`${style.active}`);
	}

	return (
		<>
			<div className={style.jejepick}>
				<div className={style.testbeforeback}></div>
				<div className={style.test}></div>
				<div className={style.testcon}>
					<div className={style.mar + ` inner`}>
						<div className={style.testcontop}>
							<div className={style.testque}>
								<div>
									<img src='/asset/image/test/testingmarker.svg'></img>
									<h2>{jsondata[num].questions}</h2>
								</div>
								<p>{num + 1}/5</p>
							</div>
							<div className={style.ing}>
								<svg xmlns="http://www.w3.org/2000/svg" width="602" height="14" viewBox="0 0 602 14" fill="none">
									<path d="M7 7L595 7.00005" stroke="#FFF8D9" strokeWidth="13" strokeLinecap="round" />
									<svg xmlns="http://www.w3.org/2000/svg" width={124 + (120 * num)} height="14" viewBox={`0 0 ${134 + (120 * num)} 14`} fill="none">
										<path d={`M7 7L${125 + (120 * num)} 7.00001`} stroke="#FFE668" strokeWidth="13" strokeLinecap="round" />
									</svg>
								</svg>
							</div>
						</div>
						<ul className={style.test_wrap}>
							{
								jsondata[num].options.map((info, k) => (
									<li className={style.test_option} key={k}>
										<figure 
											onClick={word} data-keyword={info[2]} className={option === info[2] ? style.active : ""}>
											<div className={style.option_img_wrap}>
												<img src={info[0]} />
											</div>
											<figcaption>{info[1]}</figcaption>
										</figure>
									</li>
								))
							}
						</ul>
						<div className={style.next_btn}>
							<button className={style.next} onClick={next}>다음</button>
						</div>
					</div>
					<div className={style.testbottom}></div>
				</div>
			</div>
		</>
	)
}