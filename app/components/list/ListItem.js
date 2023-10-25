import React from 'react'
import './listitem.scss'
import Link from 'next/link'
import Heart from '../Heart';

function ListItem({ data }) {

	return (
		<>
			<Link href={`/pages/list/${data.contentsid}`} className='item_wrap'>
				<div className='img_wrap'>
					<img src={data?.repPhoto?.photoid?.thumbnailpath} alt={data.title} />
				</div>
				<div className='text_wrap'>
					<p>{data?.title}</p>
					<Heart dataId={data?.contentsid} />
				</div>
			</Link>
			
		</>
	)
}

export default ListItem