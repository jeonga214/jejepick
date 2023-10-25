"use client"
import React, { useContext, useEffect } from "react";
import style from "./page.module.scss";
import { MyContext } from "@/app/components/Context";
import Detail from "@/app/components/list/Detail";
import commonfalse from "@/app/components/common/commonfalse";

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
	}, [])

	return (
		<>
			<Detail />
		</>
	);
}

export default page;
