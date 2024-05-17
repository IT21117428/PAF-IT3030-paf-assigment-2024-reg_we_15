import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import shose from "../img/green.jpg"





export default function Shareschedul() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [ItemDelete, setItemToDelete] = useState("");
  console.log(ItemDelete);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Workoutt`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setWorkouts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);




  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/WorkoutDeletee/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== ItemDelete));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
  const handleShare = (postId) => {
    const postLink = window.location.origin + `/share/${postId}`;
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setNotification("Link copied!");
      })
      .catch((error) => {
        console.error('Failed to copy: ', error);
        setNotification("Failed to copy link.");
      });
  };

 

  return (
    <div className="relative">

<img src={shose} alt="" className="w-full h-[700px] opacity-95 object-cover " />
<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-26 ">
    <div className="flex justify-center items-center">
      <h1 className="text-5xl font-serif text-white text-opacity-70 mt-6">
        My Schedule
      </h1>
    </div>
          <div className="mt-4 ml-56">
    <Link to="/createshare">
        <button className=" bg-green-700  bg-opacity-80  w-32 h-10 border border-slate-300 shadow-xl rounded-lg text-white hover:opacity-85 ml-[800px]  font-extralight  text-opacity-75">Add Workout</button>
        </Link>
        </div>
        <div className="max-h-[550px] overflow-y-auto  scrollbar-none">


    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap justify-center gap-8">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="w-[800px] h-[370px]  bg-white bg-opacity-30  mt-10 mb-5 border rounded-2xl shadow-2xl relative z-10"
          >
            <div className="px-6 py-4">
                <div className="flex justify-center items-center  bg-gradient-to-r from-green-800 border rounded-xl shadow-md  to-green-500 font-serif  ">
                <h2 className="font-extralight text-xl text-white mb-2 truncate">
                {workout.workoutState}
              </h2>

                </div>
              <div className="bg-black rounded-lg bg-opacity-40" >
              <p className="font-semibold text-white ">Description</p>
              <p className=" text-[12px] text-white  w-20px break-words">
                 {workout.description}
              </p>

              </div>
              <div>
                <p className="font-semibold text-black opacity-90 text-xl">
                    Date
                </p>
              <p className="font-medium text-black opacity-90 text-xl">
             {new Date(workout.date).toLocaleDateString()}
              </p>

              </div>
             
             
              
              <div>
              
                <div className="flex justify-center mt-3 gap-6">
                     
                     <Link to={`/update/${workout.id}`}>
                     <button className=" text-lg bg-green-700  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-white font-medium">Edit</button>
                     </Link>
                   
                    <button  onClick={() => {
                      setItemToDelete(workout.id);
                      handleDeleteUser();
                    }} className="text-lg bg-green-700  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-white font-medium">Delete</button>
                    <button onClick={() => handleShare(workout.id)} className="text-lg bg-green-700  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-white font-medium">Share</button>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    {notification && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-300 border border-blue-800 rounded-md p-4 px-32 shadow-md">
          <p className="text-sm">{notification}</p>
        </div>
      )}

      </div>
  </div>
  );
}

