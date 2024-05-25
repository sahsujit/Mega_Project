const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection = async(req, res) =>{
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //validate data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section object id
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();

        return res.status(200).json({
            success:true,
            message:"Section created successsfully",
            updatedCourse
        })

        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to created Section, please try again ",
        })
    }
};


exports.updateSection = async(req, res) =>{
    try{
        const {sectionName, sectionId, courseId} = req.body;

        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        };

        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true})
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        return res.status(200).json({
            success:true,
            data:course,
            message:section
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to updated Section, please try again ",
        })
    }
};


// exports.deleteSection= async(req, res) =>{
//     try{
//         const {sectionId} = req.params;

//         await Section.findByIdAndDelete(sectionId);

//         return res.status(200).json({
//             success:true,
//             message:"Section deleted successfully"
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Unable to deleted Section, please try again ",
//         })
//     }

// }

exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};   
