import db from "../models"

let getTopDoctorHomeService = (limitInput) => {
    console.log("limitInput service: ", limitInput)
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                oder: [['createAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })

            console.log("Test users: ", users)
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    }
    )
}


let getAllDoctors = () => {
    // console.log("Get all doctor service: ")
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            // console.log("check doctors: ", doctors)
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}

let saveInforDoctor = async (inputData) => {
    console.log('test input data', inputData)
    new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                console.log("err")
                reject({
                    errCode: 0
                })
                console.log("test resolve")
            } else {
                console.log("Save")
                await db.Markdown.save({
                    contentHTML: inputData.contentHTML,
                    contentMarkDown: inputData.contentMarkDown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                    specialtyId: inputData.specialtyId
                })

                resolve({
                    errCode: 0,
                    message: 'Save infor doctor success.'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getTopDoctorHomeService,
    getAllDoctors,
    saveInforDoctor: saveInforDoctor
}