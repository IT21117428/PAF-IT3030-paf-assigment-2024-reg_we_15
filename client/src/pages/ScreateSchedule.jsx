import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import shose from "../img/work.jpg"


export default function SCreateSchedul() {
    const [formData, setFormData] = useState({
        workoutState: "",
        description: "",
        date: "",
        state: [],
      });
  
  
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData)
  const [Error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedState = [...formData.state];
    updatedState[index][field] = value.trim();
    setFormData({ ...formData, state: updatedState });
  };

  const handleAddExercise = () => {
    setFormData({
      ...formData,
      state: [...formData.state, { name: "", completed: "", burned_calories: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await fetch("http://localhost:8081/api/CreateWorkoutt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(), // Convert date to ISO format
      }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(``);
        alert("successfull");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value.trim(); // Remove leading/trailing spaces
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;
  
    if (!datePattern.test(date)) {
      setError("Invalid date format. Please use mm/dd/yy format.");
    } else {
      setFormData({ ...formData, date: date });
      setError(null); // Clear error message if date is valid
    }
  };

 
  
  
  
  

  return (
    <div className=" relative ">
<img src={shose} alt="" className="w-full h-[700px] opacity-95 object-cover " />


<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-[800px] ">
        <div className=" mt-12  ml-[-780px]">

     
      
      <Link to="/allshareschedul">
        <button className="bg-green-700  bg-opacity-80  w-32 h-10 border border-slate-300 shadow-xl rounded-lg text-white hover:opacity-85 ml-[800px]  font-extralight  text-opacity-75">My Workout</button>
        </Link>
        </div>
        
        
      
       
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">

        
          <div className="w-[550px] h-[450px] border bg-white bg-opacity-30 rounded-lg shadow-xl relative z-10">
        <div className="flex justify-center items-center mt-6">
          <form className="flex flex-col  gap-4" onSubmit={handleSubmit} >
            
         
            
            
            <div>
            <h3 className="font-semibold text-white ml-1">WorkoutState</h3>
            <select
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[200px] h-15"
          
            id="workoutState"
            onChange={handleChange}
            required
          >
             <option className="font-serif" value="">Select</option>
            <option value="Running">Running</option>
            <option value="Walking">Walking</option>
          </select>
            </div>

            <div>
             <h3 className="font-semibold text-white ml-1 ">Date</h3>


              <input
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[460px] h-11"
                type="text"
                placeholder=""
                id="date"
                required
                maxLength={80}
              
                onChange={handleDateChange}
                />
                 {Error && (
            <p className="mt-5 text-red-800 font-serif text-opacity-50  w-300 h-7 rounded-lg text-center ">
              {Error}
            </p>)}
            </div>


            <div>
             <h3 className="font-semibold text-white ml-1">Description</h3>


              <textarea
               className=" bg-slate-100 p-3 bg-opacity-80 rounded-lg w-[460px] h-20"
                type="text"
                placeholder=""
                id="description"
                required
                maxLength={1000}
              
                onChange={handleChange}
              />
            </div>
           
           
          
        
            <button
              className="bg-green-700  bg-opacity-80   text-white border border-slate-300 shadow-xl shadow-slate-400 font-serif  text-opacity-90 p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
             
            >
             Submit 
            </button>

            {publishError && (
            <p className="mt-5 text-red-800 font-serif text-opacity-50  w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
          
          </form>
          
         
         
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
