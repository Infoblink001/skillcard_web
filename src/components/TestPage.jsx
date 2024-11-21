import React, { useEffect, useState } from 'react'
import {getFirestore} from 'firebase/firestore'
import { collection,getDocs } from 'firebase/firestore'
import app from '../firebaseConfig'

function TestPage() {
    const db = getFirestore(app)
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const querySnapshot = await getDocs(collection(db, 'topics')); 
                const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), })); 
                setData(items); setLoading(false); 
            } 
            catch (error) {
                 console.error("Error fetching data: ", error); 
            }
        }
        fetchData()       
    }, [])

    if (loading) { return <div>Loading...</div>; }
    


  return (
    <div> 
        <h1>Data List</h1> 
        <ul> 
            {data.map(item => (
                <li key={item.id}>{item.name}</li> // adjust this line to match your data structure 
                ))
            } 
        </ul> 
    </div>
  )
}

export default TestPage