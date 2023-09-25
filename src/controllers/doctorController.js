import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    console.log("test getTOpDoctorHome", req.query)
    let limit = req.query.limit
    if (!limit) {
        limit = 10
    }
    try {
        let doctors = await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server.'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'get All Doctor Fail'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        // console.log("test req: ", req.body)
        // let response = await doctorService.getAllDoctors()
        let response = await doctorService.saveInforDoctor(req.body)
        console.log("Test respone: ", response)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Post infor doctor fail"
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById
}