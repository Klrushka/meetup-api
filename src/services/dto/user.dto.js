class UserDto {
    constructor(data) {
        this.id = data?.id
        this.name = data?.name
        this.surname = data?.surname
        this.email = data?.email
        this.telephone = data?.telephone
    }
}

export default UserDto
