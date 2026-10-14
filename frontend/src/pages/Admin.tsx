import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext"
import { useSongData } from "../context/SongContext"


const Admin = () => {
  
    const navigate=useNavigate()
    const{user}=useUserData()

    const {albums,songs,fetchAlbums,fetchSongs}=useSongData()

    useEffect(()=>{
  
        if(user && user.role!=="admin"){
            navigate("/")
        }

    },[])

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8 ">

     <Link to={"/"} className="bg-red-500 text-white font-bold px-4 py-2 rounded-full">
   Go to home page
     </Link>

      <h2 className="text-2xl font-semi-bold mb-6 mt-6" >Add Album</h2>
       <form action="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4 ">
        <input type="text" placeholder="Title" className="auth-input" required/>
       </form>

    </div>
  )
}

export default Admin