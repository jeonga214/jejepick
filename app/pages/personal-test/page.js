"use client"
import React, { useContext, useEffect } from 'react'
import Test from '@/app/components/Test'
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
			<Test />
		</>
	)
}

export default page