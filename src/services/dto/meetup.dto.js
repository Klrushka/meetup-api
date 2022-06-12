class MeetupDto{
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.description = data?.description
        this.tags = data?.tags
        this.date = data.date
    }
}

export default MeetupDto
