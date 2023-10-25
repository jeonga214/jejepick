import React from "react";
import style from "./loading.module.scss";
function Loading() {
	return (
		<>
			<div className={style.bg}>
				<div className={style.logo}>
					<div>
						<img src="/asset/common/logo_2.svg" />
					</div>
					<p>맞춤 여행지 추천 서비스</p>
				</div>
				<div className={style.loding}>
					<img src="/asset/image/test/loding.gif" />
				</div>
			</div>
		</>
	);
}

export default Loading;
