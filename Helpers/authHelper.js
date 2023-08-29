import bcrypt from 'bcrypt'


// For Password Hashing
export const hashPassword=async(password)=>{
    try {
        const saltRound=10;
       const hashedPassword=await bcrypt.hash(password,saltRound);
       return hashedPassword 
    } catch (error) {
        // console.log(error);
    }
}

// For Comparing Password
export const comparePassword=async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}
