import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordCriteria = ({password})=>{
  const criteria = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8
    },
    {
      label:"At Least one uppercase letter",
      met: /[A-Z]/.test(password)
    },
    {
      label:"At Least one lowercase letter",
      met: /[a-z]/.test(password)
    },
    {
      label:"At Least one number",
      met: /\d/.test(password)
    },
    {
      label:"At Least one special character",
      met: /[^A-Za-z0-9]/.test(password)
    }
  ];

  return (
    <div className='my-5 space-y-1'>
      {criteria.map((criterion,index)=>(
        <div  key={index} className="flex items-center text-xs">
          {criterion.met?(
            <Check className='size-4 text-blue-500 mr-2'/>
          ):(
            <X className='size-4 text-gray-500 mr-2'/>
          )}
          <span className={criterion.met? "text-blue-500":"text-gray-500"}>{criterion.label}</span>
        </div>
      ))}

    </div>
  )
}

const PasswordStrengthMeter = ({password}) => {

  const getStrength = (password) => {
    let strength = 0;
    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/\d/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  const strength = getStrength(password);

  const getColor = (strength) => {
    if(strength === 0) return 'bg-red-500';
    if(strength === 1) return 'bg-red-400';
    if(strength === 2) return 'bg-yellow-500';
    if(strength === 3) return 'bg-yellow-400';
    if(strength === 4) return 'bg-green-500';
    return 'bg-green-400';
  }

  
	const getStrengthText = (strength) => {
		if (strength === 0) return "Very Weak";
		if (strength === 1) return "Weak";
		if (strength === 2) return "Fair";
		if (strength === 3) return "Good";
		return "Strong";
	};


  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center mb-2'>
        <div className='text-sm text-gray-400'>{getStrengthText(strength)}</div>
        <div className='text-sm text-gray-400'>{strength}/5</div>
      </div>
      <div className='flex space-x-1'>
        {[...Array(5)].map((_,index)=>(
          <div key={index} 
          className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index<strength ?getColor(strength):"bg-gray-500"}`}></div>
        ))}

      </div>
      <PasswordCriteria password={password}/>
    </div>
  )

}

export default PasswordStrengthMeter