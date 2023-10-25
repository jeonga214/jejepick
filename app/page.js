"use client"
import style from './page.module.scss'
import { useContext, useEffect } from 'react';
import { MyContext } from './components/Context';
import { useRouter } from 'next/navigation';

export default function Home() {
	const {setHeadStatus, setBtmStatus } = useContext(MyContext);
	const router = useRouter();
	
/* 	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(true);
	}, []); */

	setTimeout(() => router.push('/pages/login'), 2000);

	return (
		<>
			<div className={style.splash_bg}>
				<div className={style.splash_logo + ` inner`}>
					<div>
						<img src="/asset/common/logo_2.svg" />
					</div>
				</div>
				<ul className={style.splash_balloon + ` inner`}>
					<li className={style.splash_balloon1}>
						<div>
							<img src="/asset/image/splash/IMG_balloon1.png" />
						</div>
					</li>
					<li className={style.splash_balloon2 + ` inner`}>
						<div>
							<img src="/asset/image/splash/IMG_balloon2.png" />
						</div>
					</li>
				</ul>
			</div>
		</>
	)
}
