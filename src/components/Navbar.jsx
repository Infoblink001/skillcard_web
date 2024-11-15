// Navbar.js
import React,{useState,useEffect} from "react";
import { Link,useParams,useLocation,useNavigate } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const  { topics } = useParams();
    
    const [username, setusername] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

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
      let regex = /flashcards\/([0-9]+(\/[0-9]+)+)/
      if(regex.test(param) == true){
        openModal()
      }else{
        navigate(-1)
      }
    }


    const openModal = () => {
      // setModalImageSrc(src);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);       
      // setModalImageSrc("");
    };

    const closeQuiz =()=>{
      setIsModalOpen(false)
      navigate(-1)
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

       {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <h3>Your Progress will be lost</h3>
              <button onClick={closeQuiz} >Ok</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
