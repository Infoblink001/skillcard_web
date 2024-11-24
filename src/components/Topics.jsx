import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';



const Topics = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [topics,setTopics] = useState([])
  const [loading,setLoading] = useState(true)

  let colors = [
    "bg-blue-100","bg-green-100","bg-purple-100","bg-yellow-100","bg-pink-100","bg-orange-100"
  ]

  const database = db

  useEffect(() => {
     topicsData()
  }, [])
  
  const topicsData = async()=>{
    try { 
      // let selectNum = Math.floor((Math.random() * 10)/2 );
      const querySnapshot = await getDocs(collection(database, 'topics')); 
      const items = querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        color:colors[Math.floor((Math.random()*10)/2)],
        ...doc.data(),  
      })); 
        setTopics(items)
        setLoading(false); 
      } 
      catch (error) {
          console.error("Error fetching data: ", error); 
      }
  }
  
  // const topics = [
  //   {
  //     id: 1,
  //     title: "Web Development",
  //     description: "Learn modern web development techniques and best practices",
  //     color: "bg-blue-100"
  //   },
  //   {
  //     id: 2,
  //     title: "Machine Learning",
  //     description: "Explore AI and machine learning fundamentals",
  //     color: "bg-green-100"
  //   },
  //   {
  //     id: 3,
  //     title: "Data Science",
  //     description: "Master data analysis and visualization",
  //     color: "bg-purple-100"
  //   },
  //   {
  //     id: 4,
  //     title: "Mobile Development",
  //     description: "Build native and cross-platform mobile apps",
  //     color: "bg-yellow-100"
  //   },
  //   {
  //     id: 5,
  //     title: "Cloud Computing",
  //     description: "Learn cloud infrastructure and deployment",
  //     color: "bg-pink-100"
  //   },
  //   {
  //     id: 6,
  //     title: "DevOps",
  //     description: "Understand continuous integration and deployment",
  //     color: "bg-orange-100"
  //   }
  // ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Topics</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setIsGridView(false)}
            className={`px-3 py-1 rounded ${!isGridView ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            aria-label="List view"
          >
            <i className="fa-solid fa-list"></i>
          </button>
          <button
            onClick={() => setIsGridView(true)}
            className={`px-3 py-1 rounded ${isGridView ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            aria-label="Grid view"
          >
            <i className="fa-solid fa-grip"></i>
          </button>
        </div>
      </div>

      <div className={isGridView 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        : "flex flex-col gap-4"
      }>
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`${topic.color} rounded-lg p-6 transition-transform duration-200 hover:scale-105 cursor-pointer
              ${isGridView ? '' : 'flex flex-row items-center'}`}
          >
            <div className={isGridView ? '' : 'flex-1'}>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {loading?<Loading/>:''}
    </div>
  );
};

export default Topics;