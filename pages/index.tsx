import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import RecruitTable from "@/components/RecruitTable";
import { UserContext } from "@/context/userContext";
import TopHeader from "@/components/TopHeader";
import LeftNavbar from "@/components/LeftNavbar";


export default function Home() {
  const [recruits, setRecruits] = useState([])
  const {user} = useContext(UserContext)
  useEffect(()=>{
    axios.get('http://localhost:8000/players')
      .then(response =>{
        console.log(response.data)
        setRecruits(response.data)
      })
  },[])

  console.log(user)
  return (
    <div>
      <LeftNavbar/>
      <TopHeader/>
      <h1>Top 100 Recruits 2025</h1>
      {recruits.length > 0 &&
      <RecruitTable recruits={recruits}/>
      }
    </div>
  );
}
