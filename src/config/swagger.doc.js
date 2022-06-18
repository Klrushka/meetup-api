const swaggerDoc = {
    info:{
        version: '1.0.0',
        title: 'Meetup-api',
        description: 'meetup api for you)'
    },
    host: 'localhost:3000/api',
    basepath: '/api',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Meetups',
            description: 'Endpoints'
        }
    ],
    definitions:{
        Meetup: {
            id: 1,
            title: 'Title',
            description: 'Description',
            tags: ['t', 'a', 'g', 's'],
            date: '2022-06-10T09:34:41.552Z'
        },
        AddMeetup:{
            $title: 'Title',
            description: 'Description',
            tags: ['t', 'a', 'g', 's'],
            date: '2022-06-10T09:34:41.552Z'
        },
        HttpException:{
            message: 'error message'
        }
    }
};

export default swaggerDoc;
