class GoogleUser {
    constructor(profile) {
        this.id = profile.id
        this.name = profile.given_name ?? profile.name
        this.surname = profile.family_name ?? profile.surname
        this.email = profile.email
        this.roles = profile.roles ?? ['user']
    }
}

export default GoogleUser
