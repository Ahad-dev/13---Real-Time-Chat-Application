export const getUniqueProfilePic = (gender,fullname)=>{
    
    if(gender == "male"){
    return `https://avatar.iran.liara.run/public/boy?username=${fullname}`
    }else{
        return `https://avatar.iran.liara.run/public/girl?username=${fullname}`
    }

}