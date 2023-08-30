import { useState,useEffect } from "react";
import axios from 'axios'
export default function useCategory(){
    const [categories,setCategories]=useState([])

    //get All category
   const getAllCategory=async()=>{
 try {
    const {data}=await axios.get(`/api/v1/category/get-categories`)
    setCategories(data?.category)
 } catch (error) {
   //  console.log(error);
 }
   }
   useEffect(()=>{
    getAllCategory()
   },[])

   return categories
}