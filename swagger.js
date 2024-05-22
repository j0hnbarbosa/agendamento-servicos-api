const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

require('dotenv').config();

const doc = {
    info: {
        version: "1.0.0",
        title: "agendamento-servicos-api",
        description: "Some description..."
    },
    servers: [
        {
            url: process.env.URL_API
        }
    ],
    components: {
        schemas: {
            someBody: {
                $name: "Jhon Doe",
                $age: 29,
                about: ""
            },
            someResponse: {
                name: "Jhon Doe",
                age: 29,
                diplomas: [
                    {
                        school: "XYZ University",
                        year: 2020,
                        completed: true,
                        internship: {
                            hours: 290,
                            location: "XYZ Company"
                        }
                    }
                ]
            },
            someEnum: {
                '@enum': [
                    "red",
                    "yellow",
                    "green"
                ]
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app');           // Your project's root file
});