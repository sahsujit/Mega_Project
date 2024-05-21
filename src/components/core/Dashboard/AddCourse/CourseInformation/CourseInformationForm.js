import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"

const CourseInformationForm = () => {
    const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    }= useForm();

    const {course, editCourse} = useSelector((state)=>state.course)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [courseCategories, setCourseCategories] = useState([])


    
    useEffect(() => {
        const getCategories = async () => {
          setLoading(true)
          const categories = await fetchCourseCategories()
        //   console.log("categories", categories)
          if (categories.length > 0) {
            
            setCourseCategories(categories)
          }
          setLoading(false)
        }
        // if form is in edit mode
        if (editCourse) {
          // console.log("data populated", editCourse)
          setValue("courseTitle", course.courseName)
          setValue("courseShortDesc", course.courseDescription)
          setValue("coursePrice", course.price)
          setValue("courseTags", course.tag)
          setValue("courseBenefits", course.whatYouWillLearn)
          setValue("courseCategory", course.category)
          setValue("courseRequirements", course.instructions)
          setValue("courseImage", course.thumbnail)
        }
        getCategories()
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    

    const onSubmit = () =>{

    }
  return (
   <form 
   onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
   >

    <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>

        <input
        id='courseTitle'
        type="text"
        placeholder="Enter Course Title"
        {...register("courseTitle", { required: true })}
        style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {
            errors.courseTitle && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course title is required
              </span>
            )
        }
    </div>

    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full !pl-12 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

     <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseCategory">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          defaultValue=""
          id="courseCategory"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full form-style rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

   </form>
  )
}

export default CourseInformationForm