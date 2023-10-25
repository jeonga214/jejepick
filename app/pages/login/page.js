"use client"
import React, { useContext, useEffect } from 'react'
import Login from '@/app/components/Login'
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
    <main>
      <Login/>
    </main>
  )
}

export default page