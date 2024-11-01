// Navbar.js
import React,{useState,useEffect} from "react";
import { Link,useParams,useLocation,useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const  { topics } = useParams();
    const [username, setusername] = useState('')
    const n = localStorage.getItem('user')
    const navigate = useNavigate()
    // console.log(location)

    useEffect(() => {
      if (location.pathname != '/'){
        if(n){
          setusername(n)
        }else{
          navigate('/auth')
        }
      }
     
    }, [n])

    const handlelogout =()=>{
      localStorage.removeItem('user')
      navigate('/auth',{state:"You have been logged out"})
    }
  return (
    <>
       {
        location && (location.pathname == '/' || location.pathname == '/auth')?"":
       
      (<div className='nav'>
          <button className='back-btn' onClick={()=>navigate(-1)} > <i className="fa-solid fa-arrow-left"></i> Back </button>
          <p className='username'>{username}</p>
          <button className='back-btn' onClick={handlelogout}  > Logout </button>
      </div>)
       }
    </>
  );
}

export default Navbar;
