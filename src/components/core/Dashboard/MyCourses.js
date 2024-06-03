// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"

// // import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
// import { useNavigate } from 'react-router-dom';
// import IconBtn from '../../common/IconBtn';
// import { VscAdd } from "react-icons/vsc";
// import CoursesTable from './InstructorCourses/CoursesTable';


// const MyCourses = () => {
//     const {token } = useSelector((state)=>state.auth);
//     const navigate = useNavigate();
//     const [courses, setCourses] = useState([]);

//     useEffect(()=>{
//         const fetchCourse = async()=>{
//             const result = await fetchInstructorCourses(token);
//             if(result){
//                 setCourses(result)
//             }
//         }
//         fetchCourse()
//     },[])
//   return (
//     <div>
//       <div className="mb-14 flex items-center justify-between">
//         <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
//         <IconBtn
//           text="Add Course"
//           onclick={() => navigate("/dashboard/add-course")}
//         >
//           <VscAdd />
//         </IconBtn>
//       </div>
//       {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
//     </div>
//   )
// }

// export default MyCourses











import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}