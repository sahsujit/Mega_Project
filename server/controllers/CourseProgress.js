const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req, res) =>{
    try{
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id;

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Invalid subsection"
            })
        };

        const courseProgress = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        });

        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
              })
        }
        else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({ error: "Subsection already completed" })


            };
            courseProgress.completedVideos.push(subSectionId);

        }
        await courseProgress.save();

    return res.status(200).json({ message: "Course progress updated" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: "Internal server error" })
    }
}