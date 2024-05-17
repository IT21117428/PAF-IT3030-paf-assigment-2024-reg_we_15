import { useEffect, useState } from "react";
  import "react-circular-progressbar/dist/styles.css";
  import { useNavigate, useParams } from "react-router-dom";
  import shose from "../img/greens.jpg"

  
  export default function MealUpdate() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
   
    
    console.log(formData)
    const { idId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      try {
        const fetchworkout = async () => {
          const res = await fetch(`http://localhost:8081/api/Workoutt?itemId=${idId}`);
          const data = await res.json();
          console.log("data", data);
  
          if (!res.ok) {
            console.log(data.message);
          }
          if (res.ok) {
              const selected = data.find((workout) => workout.id === idId);
             console.log(selected)
              if (selected) {
                setFormData(selected);
              }
            }
        };
        fetchworkout();
      } catch (error) {
        console.log(error.message);
      }
    }, [idId]);


  
    
  

   
    

   
      
    
    

    
    
    return (
     <div className="relative ">

<img src={shose} alt="" className="w-full h-[700px] opacity-95 object-cover " />
<div className="absolute transform -translate-x-0 translate-y-0 top-1  ml-20 ">
      <div className=" mb-52">
        <h1 className="text-center text-5xl my-7 flex justify-center font-serif text-opacity-75  underline text-white  font-medium"> My workout</h1>

        <div className="flex justify-center items-center">
            <h1 className="mb-4 text-gray-700 font-medium">{formData.title}</h1>

        </div>
        <div className="flex justify-center items-center gap-[-20px] ">
            <img src="https://miro.medium.com/v2/resize:fit:1400/1*CQngPMK6hz2S8owH-wE2rg.jpeg" alt="" className="w-[400px]   h-72 rounded-xl " />
            <img src="https://media.istockphoto.com/id/1366052585/photo/shot-of-a-group-of-friends-hanging-out-before-working-out-together.jpg?s=612x612&w=0&k=20&c=rj7LgjUuXde0eLWikS1rvDnsKDdBotgsy9eM5HDzko0=" alt="" className="w-[400px] h-72 rounded-xl " />
            <img src="https://media.self.com/photos/57d879034b76f0f832a0d6ad/4:3/w_2560%2Cc_limit/nyrr-facebook.jpg" alt="" className="w-[400px] h-72 rounded-xl " />

        </div>
        
        <div className=" mt-4 flex justify-center items-center">
           
             <h1 className="font-medium  text-2xl text-white">{formData.workoutState}</h1>

        </div>
        <div className="flex justify-center items-center mt-2 font-medium text-white">
        <div>Description</div>
        </div>
     

        <div className=" mt-2 flex justify-center items-center ">
           
             <h1 className="font-extralight ml-2 w-[1300px] break-words text-white  ">{formData.description}</h1>

        </div>
        
       
      </div>
      </div>
      </div>
     
    );
  }
  
  
  
  


