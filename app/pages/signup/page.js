"use client"
import { MyContext } from '@/app/components/Context';
import Memberform from '@/app/components/Memberform'
import commontrue from '@/app/components/common/commontrue';
import React, { useContext, useEffect } from 'react'

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);

  useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(true);
		commontrue();
	}, [])

  return (
    <main>
        <Memberform/>
    </main>
  )
}

export default page