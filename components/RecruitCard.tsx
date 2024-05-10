import React from 'react';
import { Card } from 'react-bootstrap';

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
    recruit: Recruit;
}

const RecruitCard: React.FC<Props> = ({ recruit }) => {
    console.log(recruit)
    return (
        <>
            {recruit && (
                <>
                <Card>
                    <Card.Body>
                        <Card.Title>{recruit.name}</Card.Title>
                        <Card.Text>
                            <p>Rank: {recruit.rank}</p>
                            <p>Position: {recruit.position}</p>
                            <p>Hometown: {recruit.homeTown}</p>
                            <p>Height: {recruit.height}</p>
                            <p>Weight: {recruit.weight}</p>
                            <p>Grade: {recruit.grade}</p>
                            <p>School: {recruit.school}</p>
                            Interested Teams:
                            {recruit.interestedTeams.map((team)=>(
                            <p key={recruit._id}>{team}</p>

                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </>
            )}
        </>
    );
};

export default RecruitCard;
