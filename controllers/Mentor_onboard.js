const Onboard = require('../models/MentorOnboard')

//Post APIS

const postMentorOnboard = async (req, res) => {
    let { Feld, Verification, DOB, CV, ID } = req.body;

    try {
        if (!(Feld && Verification && DOB && CV && ID)) {
            res
                .status(400)
                .json({ message: "All fields are required", status: false });
        } else {
            const getResponce = await Onboard.create({
                Feld,
                Verification,
                DOB,
                CV,
                ID
            });

            if (!getResponce) {
                res
                    .status(400)
                    .json({ message: "Mentor Onboard  not  Has Posted", status: false });
            } else {
                res.status(200).json({
                    message: "Mentor Onboard  is  created successfully",
                    data: getResponce,
                    status: true,
                });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
}

//GetAPI

const GetMentorOnboard= async (req, res) => {
    try {
        const getMentorOnboard = await Onboard.find();
        if (!getMentorOnboard) {
            res.json({ message: "there is no Mentor Onboard", status: false });
        }
        res.json({
            message: "Found  Mnetor Onboard",
            data: getMentorOnboard,
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};


module.exports = {
    postMentorOnboard,
    GetMentorOnboard

}