import bcrypt from "bcrypt"

class User {
    constructor(data) {
        this.id = data.id
        this.name = data?.name
        this.surname = data?.surname
        this.telephone = data?.telephone
        this.email = data?.email
        this.salt = data.salt ?? bcrypt.genSaltSync(10)
        this.hash = data.hash ?? bcrypt.hashSync(data?.password, this.salt)
        this.roles = data?.roles
    }
}

export default User
