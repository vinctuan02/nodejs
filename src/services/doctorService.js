import db from "../models"

let getTopDoctorHomeService = (limitInput) => {
    // console.log("limitInput service: ", limitInput)
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

            // console.log("Test users: ", users)
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
    // console.log('test input data', inputData)
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.contentHTML || !inputData.contentMarkdown || !inputData.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter.'
                })
            } else {
                // console.log("Save")
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                    // specialtyId: inputData.specialtyId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor success.'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['contentHTML', 'contentMarkdown', 'description']
                        },
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['valueEn', 'valueVi']
                        },
                    ],
                    raw: true,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
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
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById
}