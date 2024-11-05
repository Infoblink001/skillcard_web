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

    const handleBack=()=>{
      let param = location.pathname
      let regex = /\/[A-Za-z]+\/([0-9]+(\/[0-9]+)+)/
      if(regex.test(param)){
        const confirmation = confirm("Your progress will be lost")
        if(confirmation){
          navigate(-1)
        }else{
          return
        }
      
      }else{
        navigate(-1)
      }
    }
  return (
    <>
       {
        location && (location.pathname == '/' || location.pathname == '/auth' || location.pathname == '/result')?"":
       
      (<div className='nav'>
          <button className='back-btn' onClick={handleBack} > <i className="fa-solid fa-arrow-left"></i> Back </button>
          <p className='username'>{username}</p>
          <button className='back-btn' onClick={handlelogout}  > Logout </button>
      </div>)
       }
    </>
  );
}

export default Navbar;
