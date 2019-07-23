const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://user_adm:ThW6F8A7cZBK7S6G@clusterapi-klqrn.mongodb.net/test?retryWrites=true',
                jwt_pass: 'password123',
                jwt_expires_in: '1d'
            }

        case 'prod':
            return {
                bd_string: 'mongodb+srv://user_adm:ThW6F8A7cZBK7S6G@clusterapi-klqrn.mongodb.net/test?retryWrites=true',
                jwt_pass: 'mlk@sldjao#$%!Nn/Aak_!01ko9&*+=-12@',
                jwt_expires_in: '8d'
            }
    }
}

console.log(`Starting API in environment ${env.toUpperCase()}`);

module.exports = config();