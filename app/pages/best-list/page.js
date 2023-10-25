"use client"
import React, { useContext, useEffect } from "react";
import BestList from "@/app/components/BestList";
import commonfalse from "@/app/components/common/commonfalse";
import { MyContext } from "@/app/components/Context";

function page() {
	const { setHeadStatus, setBtmStatus } = useContext(MyContext);
  useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		commonfalse();
	}, []);

  return (
    <>
      <BestList/>
    </>
  );
}

export default page;