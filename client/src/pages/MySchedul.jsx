import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import shose from "../img/green.jpg"

export default function Home() {
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
        const res = await fetch(`http://localhost:8081/api/Workout`);
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
        `http://localhost:8081/api/WorkoutDelete/${ItemDelete}`,
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
 


 
 

  return (
    <div className=" relative">

<img src={shose} alt="" className="w-full h-[700px] opacity-95 object-cover " />


<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-6 ">



     <div>
    <div className="flex justify-center items-center">
      <h1 className="text-5xl font-serif text-white  underline text-opacity-70 mt-6">
        My Schedule
      </h1>
    </div>
    <div className="mt-4">
    <Link to="/createschedul">
        <button className="bg-green-700  bg-opacity-80  w-32 h-10 border border-slate-300 shadow-xl rounded-lg text-white hover:opacity-85 ml-[1240px]  font-extralight  text-opacity-75">Add Schedule</button>
        </Link>
        </div>
        

        <div className="max-h-[550px] overflow-y-auto  scrollbar-none">
    <div className="flex justify-center mt-4">
      <div className="flex flex-wrap justify-center gap-8">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="w-[600px] h-[620px] shadow-lg bg-white bg-opacity-30    mt-10 mb-5 border rounded-2xl relative z-10 "
          >
            <div className="px-6 py-4">
                <div className="flex justify-center items-center  bg-gradient-to-r from-green-800 border rounded-xl shadow-md  to-green-500 font-serif opacity-80 ">
                <h2 className="font-extralight text-xl text-white mb-2 truncate">
                {workout.workoutState}
              </h2>

                </div>
              <div className="bg-black rounded-lg bg-opacity-40">
              <p className="font-semibold text-white ">Description</p>
              <p className=" text-white text-[12px]  w-20px break-words">
                 {workout.description}
              </p>

              </div>
              <div>
                <p className="font-semibold text-xl text-white">
                    Date
                </p>
              <p className="font-extralight text-xl text-white ">
           
             {moment(workout.date).format("YYYY-MM-DD HH:mm:ss")}
              </p>

              </div>
             
             
              <div className="font-medium text-white text-opacity-70  shadow-xl h-10 ml-1 rounded-xl bg-green-700  bg-opacity-60   mt-4 mb-2">
             
                <div className=" flex justify-center text-2xl font-serif   items-center  mt-4 cursor-pointer">
              My Workout
                </div>
               
            
              </div>
              <div>
              <div className="max-h-44 overflow-y-auto  scrollbar-none bg-green-700 rounded-xl bg-opacity-50">
                {workout.state.map((state, index) => (
                  <div key={index} className="gap-2   rounded-xl  ">
                    <div className="font-serif text-white">
                   {state.name}
                    </div>
                    <div className="font-medium text-white">
                    Completed Time: {state.completed}
                    </div>
                    <div>

                    <div className="font-medium text-white">
                    Burned Calories: {state.burend_callary}
                   
                    </div>
                 </div>
                <hr  className="text-blue-600"/>

                  </div>
                ))}

                
                </div>
                <div className="flex justify-center mt-3 gap-10">
                     
                     <Link to={`/updateworkout/${workout.id}`}>
                     <button className="text-lg bg-green-700  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-white font-medium">Edit</button>
                     </Link>
                   
                    <button  onClick={() => {
                      setItemToDelete(workout.id);
                      handleDeleteUser();
                    }} className="text-lg bg-green-700  bg-opacity-80  hover:opacity-85 rounded-xl shadow-lg  w-20 text-white font-medium">Delete</button>
                   

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>
  </div>
  );
}

