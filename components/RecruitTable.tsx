import React, { useContext, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Recruit {
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

interface Props {
	recruits: Recruit[];
}

const RecruitTable: React.FC<Props> = ({ recruits: initialRecruits }) => {
	const { user, setUser } = useContext(UserContext);
	const [recruits, setRecruits] = useState<Recruit[]>(initialRecruits);

	const fetchRecruits = () => {
		axios
			.get('http://localhost:8000/players')
			.then((response) => {
				setRecruits(response.data);
			})
			.catch((error) => {
				console.error('Error fetching recruits:', error);
			});
	};

	useEffect(() => {
		fetchRecruits();
	}, [user]);

	const handleAddToWatchList = (recruitID: string) => {
		axios
			.post(`http://localhost:8000/AddPlayer/${recruitID}/${user.uid}`)
			.then((response) => {
				// Check if the player was added successfully
				if (response.status === 200) {
					// Update the local storage user object
					const updatedUser = { ...user };
					updatedUser.players.push(recruitID); // Assuming recruitID is the player's name

					// Update the local storage
					localStorage.setItem('user', JSON.stringify(updatedUser));
					setUser(updatedUser);
					// Log the updated user object
					console.log('Updated User:', updatedUser);
				}
			})
			.catch((error) => {
				// Handle errors if any
				console.error('Error adding player to watchlist:', error);
			});
	};

	const handleRemoveFromWatchList = (recruitID: string) => {
		axios
			.delete(`http://localhost:8000/RemovePlayer/${recruitID}/${user.uid}`)
			.then((response) => {
				// Check if the player was removed successfully
				if (response.status === 200) {
					// Update the local storage user object
					const updatedUser = { ...user };
					// Remove recruitID from the list of players
					updatedUser.players = updatedUser.players.filter(
						(id: string) => id !== recruitID
					);
					// Update the local storage
					localStorage.setItem('user', JSON.stringify(updatedUser));
					// Update the state
					setUser(updatedUser);
					// Log the updated user object
					console.log('Updated User:', updatedUser);
				}
			})
			.catch((error) => {
				// Handle errors if any
				console.error('Error removing player from watchlist:', error);
			});
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<td>Rank</td>
					<td>Player</td>
					<td>Position</td>
					<td>Hometown</td>
					<td>Height</td>
					<td>Weight</td>
					<td>Grade</td>
					<td>School</td>
					{user && user.isCoach ? (
						<td>Add to watchlist</td>
					) : (
						<td>Track Player&apos;s Recruitment</td>
					)}
					<td>Interested Teams</td>
				</tr>
			</thead>
			<tbody>
  {recruits &&
    recruits.map((recruit) => (
      <tr key={recruit.rank}>
        <td>{recruit.rank}</td>
        <td>{recruit.name}</td>
        <td>{recruit.position}</td>
        <td>{recruit.homeTown}</td>
        <td>{recruit.weight}</td>
        <td>{recruit.height}</td>
        <td>{recruit.grade}</td>
        <td>{recruit.school}</td>
        {recruit.school === "Uncommitted" ? (
          user && user.isCoach ? (
            <td style={{ textAlign: 'center' }}>
              {user && recruit.interestedTeams.includes(user.team) ? (
                <input
                  className='checkBox'
                  type='checkbox'
                  checked={true}
                  onChange={() => handleRemoveFromWatchList(recruit._id)}
                />
              ) : (
                <input
                  className='checkBox'
                  type='checkbox'
                  checked={false}
                  onChange={() => handleAddToWatchList(recruit._id)}
                />
              )}
            </td>
          ) : user && user.players && user.players.includes(recruit._id) ? (
            <td style={{ textAlign: 'center' }}>
              <input
                className='checkBox'
                type='checkbox'
                checked={true}
                onChange={() => handleRemoveFromWatchList(recruit._id)}
              />
            </td>
          ) : (
            <td style={{ textAlign: 'center' }}>
              <input
                className='checkBox'
                type='checkbox'
                checked={false}
                onChange={() => handleAddToWatchList(recruit._id)}
              />
            </td>
          )
        ) : (
          <td>Player Committed to {recruit.school}</td>
        )}

        <td style={{ textAlign: 'center' }}>
          {recruit.school === "Uncommitted" ? (
            recruit.interestedTeams.length > 0 ? (
              <ul>
                {recruit.interestedTeams.map((school, index) => (
                  <li key={index}>{school}</li>
                ))}
              </ul>
            ) : (
              <p>No Interested Teams Yet</p>
            )
          ):(
            <p>Player Committed to {recruit.school}</p>
          )}
        </td>
      </tr>
    ))}
</tbody>

		</Table>
	);
};

export default RecruitTable;
