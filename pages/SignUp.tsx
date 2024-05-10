import React, { useState, ChangeEvent, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/server/firebase/fireBase.config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import { UserContext } from '@/context/userContext';
import Link from 'next/link';

function SignUp() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');
    const [isCoach, setIsCoach] = useState<boolean | null>(null); // Nullable boolean type
    const [coachedTeam, setCoachedTeam] = useState<string>(''); // State for coached team
    const [fanTeam, setFanTeam] = useState<string>(''); // State for fan team
    const {user, setUser} = useContext(UserContext)
    const router = useRouter();
  
	const handleSignup = async () => {
		let user
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			user = userCredential.user;
	
			const requestData = {
				uid: user.uid,
				name: name,
				email: email,
				isCoach: isCoach,
				team: isCoach ? coachedTeam : fanTeam
			};
			const response = await axios.post(
				`http://localhost:8000/createUser`,
				JSON.stringify(requestData),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			console.log('Response status:', response.status);
			console.log('Response data:', response.data);
				const responseData = response.data;
				setUser(responseData);
				localStorage.setItem('user', JSON.stringify(responseData));
				toast.success("User Successfully Created, Sign in to Continue!");
				router.push('/');
		} catch (error: any) {
			if (error.code === "auth/email-already-in-use") {
				toast.error("Email already in use");
			} else if (error.code === "auth/weak-password") {
				toast.error("Password should be at least 6 characters");
			} else if(error.response.data.message === "There is already a coach signed up for this team"){
				toast.error("There is already a coach signed up for this team")
				await user!.delete()
			} 
			else {
				toast.error("Error signing up. Please try again later.");
			}
		}
	};
	

	const handleIsCoachChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setIsCoach(e.target.value === 'true' ? true : false); // Parse string value to boolean
	};
console.log("user", user)
	return (
		<div className='signup'>
		  <ToastContainer />
		  <h2>Sign Up</h2>
		  <div>
			<input
			  type="name"
			  placeholder="name"
			  value={name}
			  onChange={(e) => setName(e.target.value)}
			/>
			<input
			  type="email"
			  placeholder="Email"
			  value={email}
			  onChange={(e) => setEmail(e.target.value)}
			/>
			<input
			  type="password"
			  placeholder="Password"
			  value={password}
			  onChange={(e) => setPassword(e.target.value)}
			/>
            <select onChange={handleIsCoachChange} defaultValue="">
                <option value="" disabled>Select Role</option>
                <option value="false">Fan</option>
                <option value="true">Coach</option>
            </select>
            {isCoach === true ? (
                <input
                    type='text'
                    placeholder='What team do you coach?'
                    value={coachedTeam}
                    onChange={(e) => setCoachedTeam(e.target.value)}
                />
            ) : isCoach === false ? (
                <input
                    type='text'
                    placeholder='What team are you a fan of?'
                    value={fanTeam}
                    onChange={(e) => setFanTeam(e.target.value)}
                />
            ) : null}
		  </div>
		  <button onClick={handleSignup}>Sign Up</button>
          <p>Already have an account? <Link href="/SignIn">Sign in Here</Link></p>
		</div>
	  );			  
}

export default SignUp;
