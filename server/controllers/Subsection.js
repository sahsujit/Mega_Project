const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
 
exports.createSubSection = async(req, res)=>{
    try{
        const {sectionId, title, description, timeDuration} = req.body;
        const video = req.files.videoFile;

        if(!sectionId || !title || !description || !timeDuration){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })

        };

        const videoUpload = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:videoUpload.secure_url
        });

        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{subSection:subSectionDetails._id,
            }
        },{new:true});

        return res.status(200).json({
            success:true,
            message:"Sub Section created successfully",      
            updatedSection
        }) 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to created Sub Section, please try again"
        })
    }
};


exports.updatedSubSection = async(req, res)=>{
    try{
        const {subSectionId,sectionId, timeDuration, title, description} = req.body;
        const video = req.files.videoFile;

        // console.log("subSectionId   : ", subSectionId);
        // console.log("timeDuration   : ", timeDuration);
        // console.log("title   : ", title);
        // console.log("description   : ", description);
        // console.log("videoUrl   : ", videoUrl);

        const videoUpload = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);



        if( !sectionId || !timeDuration || !title || ! description || !videoUpload){
            return res.status(404).json({
                success:false,
                message:"Missing Properties"
            })
        };

        const updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                timeDuration,
                description,
                title,
                videoUrl:videoUpload.secure_url
            },
            {new:true});

            const updatedSection = await Section.findByIdAndUpdate(sectionId,{
                $push:{
                    subSections : updatedSubSectionDetails._id
                },
            },{new:true})


            return res.status(200).json({
                success: true,
                message:"SubSection updated successfully"
            })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to updated  the Subsection, Please try again later."
        })
    }
};


exports.deletedSubSection = async(req, res)=>{
    try{
        const {subSectionId, sectionId} = req.body;

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push:{
                subSection: deletedSubSection._id
            }
        }, {new:true})

        return res.status(200).json({
            success:true,
            message:"SubSection successfully deleted",
            data:updatedSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to deleted SubSection, please try again"
        })

    }
}