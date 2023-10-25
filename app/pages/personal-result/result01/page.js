"use client"
import React, { useContext, useEffect } from 'react'
import style from '../result.module.scss'
import Result from '@/app/components/Result'
import { MyContext } from '@/app/components/Context';
import commontrue from '@/app/components/common/commontrue';

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);

	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(true);
		commontrue();
	}, [])
	return (
		<>
			<Result />
		</>
	)
}

export default page