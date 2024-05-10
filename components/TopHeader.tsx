import React, {useContext} from 'react'
import { UserContext } from '@/context/userContext'
import { Container } from 'react-bootstrap'
import '@/app/app.css'

const TopHeader = () => {
    const {user} = useContext(UserContext)
  return (
    <Container className='topHeader'>
        {user && 
        <div className='topHeaderText'>
            <h2>{user.name}</h2>
            <h2>{user.isCoach == true ? `Coach of ${user.team}` : `Fan of ${user.team}`}</h2>
        </div>
        }
    </Container>
  )
}

export default TopHeader