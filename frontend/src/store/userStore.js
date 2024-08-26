import axios from 'axios';
import {create} from 'zustand';

const API_URL = "https://chatty-backend-ruddy.vercel.app/api/users";

const useUser = create((set)=>({
    getAllUsers: async ()=>{
        try{
            const res = await axios.get(`${API_URL}/`);
            const data = await res.data;
            return data.users;
        }catch(error){
            throw error;
        }
    },
}))

export default useUser;