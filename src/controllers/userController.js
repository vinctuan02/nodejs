import userService from '../services/userService'

let handleLogin = async (req,res) => {
    let email = req.body.email
    let password = req.body.password

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter !'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        userData
    })
}


let handleGetAllUsers = async (req, res) => {
    let id = req.query.id //ALL, id

    if(!id){
        return res.status(200).json({
            errcode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    console.log(users)

    return res.status(200).json({
        errcode: 0,
        errMessage: "Oke",
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let mesaage = await userService.createNewUser(req.body)
    console.log(mesaage)
    return res.status(200).json(mesaage)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let mesaage = await userService.updateUserData(data)
    return res.status(200).json(mesaage)
}

let handleDeleteUser = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 2,
            mesaage: 'Missing required paraments'
        })
    }
    let mesaage = await userService.deleteUser(req.body.id)
    return res.status(200).json(mesaage)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}
