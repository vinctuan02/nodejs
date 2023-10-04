import db from "../models"
require('dotenv').config()

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE || 10

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
    console.log("inputData.action: ", inputData.action)
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.contentHTML || !inputData.contentMarkdown ||
                !inputData.description || !inputData.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter.'
                })
            } else {
                if (inputData.action == 'CREATE') {
                    console.log("CREATE")
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        // specialtyId: inputData.specialtyId
                    })
                } else if (inputData.action == 'EDIT') {
                    console.log("EDIT")
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    // console.log("doctorMarkdown: ", doctorMarkdown)
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown
                        doctorMarkdown.description = inputData.description
                        await doctorMarkdown.save()
                    }
                }

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

let bulkCreateSchedule = (data) => {
    console.log("data doctorService: ", data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing required param !'
                })
            } else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }
                console.log("data11: ", schedule)
                await db.Schedule.bulkCreate(schedule)
                resolve({
                    errCode: 0,
                    errMessage: 'Oke'
                })
            }
        } catch (e) {
            reject({
                errCode: -1,
                errMessage: "hihi "
            })
        }
    })
}

module.exports = {
    getTopDoctorHomeService,
    getAllDoctors,
    saveInforDoctor: saveInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule
}


// [
//     { doctorId: 74, date: 'Invalid date', timeType: 'T2', maxNumber: 10 },
//     { doctorId: 74, date: 'Invalid date', timeType: 'T3', maxNumber: 10 }
// ]

// [
//     { username: 'barfooz', isAdmin: true },
//     { username: 'foo', isAdmin: true },
//     { username: 'bar', isAdmin: false }
// ]