import { useEffect, useState } from "react";
import useUser from "../store/userStore";

const useUsers = ()=>{
    const {getAllUsers} = useUser();
    const [users ,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        getAllUsers().then((data)=>{
            setUsers(data);
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
            setLoading(false);
        })
    }, []);

    return {users, loading};
}

export default useUsers;