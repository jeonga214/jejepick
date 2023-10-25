import React, { useEffect, useState } from "react";
import style from "../../pages/list/[id]/page.module.scss";
import { useParams } from "next/navigation";
import axios from "axios";
import Heart from "@/app/components/Heart";
import LoadingComp from "../loading/LoadingComp";

function Detail() {
	const [data, setData] = useState();
	const [tagData, setTagData] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();
	const paramId = params.id;

	async function getData(paramId) {
		const result = await axios.get(`/api/detail?detailId=${paramId}`);
		const newData = result.data;
		setData(newData);
		setTagData(newData.tag.split(","));
		setLoading(false);
	}

	useEffect(() => {
		getData(paramId);
	}, []);

	if (loading) {
		return <div><LoadingComp /></div>
	}

	return (
		<>
			<div className={style.back_bottom}>
				<div className={style.contents_1 + ` inner`}>
					<ul className={style.contents_1_text}>
						<li>{data.region1cd.label}<span>{data.contentscd.label}</span></li>
						<li>
							<p>
								{data.title}
							</p>
							<div>
								<p>찜하기</p>
								<Heart dataId={data.contentsid} />
							</div>
						</li>
					</ul>
					<div className={style.contents_1_detail_img}>
						<img src={data.repPhoto.photoid.imgpath} />
					</div>
				</div>
				<div className={style.contents_1_address_back}>
					<ul className={style.contents_1_address + ` inner`}>
						<li>
							<div>
								<div>
									<img src="/asset/image/list/ICON_list_address.svg" />
								</div>
								<p>주소</p>
							</div>
							<p>{data.roadaddress}</p>
						</li>
						<li>
							<div>
								<div>
									<img src="/asset/image/list/ICON_list_phone.svg" />
								</div>
								<p>전화번호</p>
							</div>
							<p>{data.phoneno}</p>
						</li>
						<li>
							<div>
								<div>
									<img src="/asset/image/list/ICON_list_desc.svg" />
								</div>
								<p>설명</p>
							</div>
							<p>“{data.introduction}”</p>
						</li>
						<li>
							{tagData.map((item) => (
								<span>{item}</span>
							))}
						</li>
					</ul>
				</div>
			</div>
			<div className={style.contents_2}>
				<div className={style.contents_2_map + ` inner`}>
					{/* <div id="maps" style={{ width: "100%", height: "370px" }}></div> */}
				</div>
			</div>
		</>
	);
}

export default Detail;
