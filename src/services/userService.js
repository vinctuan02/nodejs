import db from "../models"
import bcrypt from "bcryptjs"

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['email','roleId','password'],
                    where: {email: email},
                    raw: true
                })

                if(user){
                    //compare password
                    let checkPassword = bcrypt.compareSync(password, user.password)
                    if(checkPassword){
                        userData.errCode = 0
                        userData.errMessage = 'Oke'
                        console.log(user)
                        delete user.password
                        userData.user = user
                    }else{
                        userData.errCode = 3,
                        userData.errMessage = 'Wrong password'
                    }

                }else{
                    userData.errCode = 2
                    userData.errMessage = `User not found.`
                }
            } else {
                userData.errCode = 1
                userData.errMessage = `Your email isn't exist in your system.`
                console.log('isExit false');
                console.log(userData)
                resolve(userData)
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let comparePassword = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve()
        }catch(e){
            reject(e)
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}