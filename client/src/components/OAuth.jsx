import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../../firebase.js';
import { useDispatch } from 'react-redux';
import { logInSuccess } from '../redux/User/userSlice.js';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth,provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName, email: result.user.email, photo: result.user.photoURL
                }),
            })
            const data = await res.json();
            dispatch(logInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <button 
        onClick={handleGoogleClick}
        type='button'
        className='mt-6 w-full px-4 py-2 border rounded-lg bg-white font-semibold text-black'>Continue with Google</button>
  );
};
