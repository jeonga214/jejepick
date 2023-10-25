"use client"
import React, { useContext, useEffect } from 'react'
import style from './courseList.module.scss'
import CourseList from '@/app/components/course/CourseList'
import CourseBtn from '@/app/components/course/CourseBtn'
import { MyContext } from '@/app/components/Context'
import commonfalse from '@/app/components/common/commonfalse'

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);
	
	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
	}, [])
	
	return (
		<div className={style.main}>
			<div className={style.course_list + ` inner`}>
				<h2>내가 만든 제주도 제일 좋은 코스!</h2>
				<CourseList  />
				<CourseBtn route={"/pages/course-make"} />
			</div>
		</div>
	)
}

export default page