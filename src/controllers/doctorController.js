import doctorService from '../services/doctorService'

let getTopDoctorHome = async (req, res) => {
    console.log("test getTOpDoctorHome", req.query)
    let limit = req.query.limit
    if (!limit) {
        limit = 3
    }
    try {
        let doctors = await doctorService.getTopDoctorHomeService(+limit)
        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server.'
        })
    }
}


module.exports = {
    getTopDoctorHome
}