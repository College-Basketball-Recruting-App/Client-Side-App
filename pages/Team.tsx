import React, {useEffect, useContext, useState} from 'react'
import { UserContext } from '@/context/userContext'
import axios from 'axios'
import RecruitCard from '@/components/RecruitCard'
import LeftNavbar from '@/components/LeftNavbar'

interface Player {
    _id: string;
	rank: number;
	name: string;
	position: string;
	homeTown: string;
	height: string;
	weight: string;
	grade: number;
	school: string;
	interestedTeams: string[];
}

const Team = () => {
const {user} = useContext(UserContext)
const [playersToDisplay, setPlayersToDisplay] = useState<Player[]>([])

useEffect(() => {
    console.log("first hit");
    console.log("user", user);
    if(user && user.isCoach){
        const players = user ? user.players : [];
        console.log("players", players);
        if (players.length > 0) {
            console.log("second hit");
            const promises = players.map((player: string) =>
                axios.get(`http://localhost:8000/getPlayer/${player}`).then(response => response.data)
            );
            Promise.all(promises)
                .then(playersData => {
                    console.log(playersData);
                    setPlayersToDisplay(playersData);
                })
                .catch(error => {
                    console.error('Error fetching player:', error);
                });
        }
    }else if(user && !user.isCoach){
        axios.get(`http://localhost:8000/findTeamsPlayers/${user.team}`)
            .then((response)=>{
                console.log(response.data)
                setPlayersToDisplay(response.data)
            })
    }
}, [user]);


console.log("players to display", playersToDisplay)
console.log(user)

  return (
    <div>
        <LeftNavbar/>
        {user && (
            <>
            <h1 style={{textAlign:'center'}}>{user.team} Recruits:</h1>
        <div style={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center', width:'70%', margin:'auto'}}>
            {playersToDisplay.map((player: Player, index: number)=>(
                <RecruitCard key={index} recruit={player}/>
            ))}
        </div>
            </>
        )
        }
    </div>
  )
}

export default Team