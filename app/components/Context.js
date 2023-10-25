"use client"

import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({ children }) {
	const [headStatus, setHeadStatus] = useState(true);
	const [btmStatus, setBtmStatus] = useState(true);
	const [testResultValue, setTestResultValue] = useState([]);

	const [jim, setJim] = useState([]);
	const [isStatus,setIsStatus] =useState(false);

	//찜에서 데이터 가져오기
	const favorite = async ()=>{
		const loginID = window.localStorage.getItem('loginId'); 
		if(loginID){
			const  response =await axios.get(`/server_api/item?profile=${loginID}`);
			setJim(response.data);
			console.log(response.data);
		}
	}
	
	useEffect(() => {
		favorite();
	},[isStatus])

	const value ={ 
    headStatus,setHeadStatus,
    btmStatus, setBtmStatus,
    testResultValue,setTestResultValue,
		jim,setJim,
		isStatus,setIsStatus
	}

	return (
		<MyContext.Provider value={value}>
			{children}
		</MyContext.Provider>
	)
}

export default Context