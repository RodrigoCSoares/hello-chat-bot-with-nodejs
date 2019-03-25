const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const watsonConfig = new AssistantV1({
    version: '2019-18-03',
    username: 'apikey',
    password: 'udSQHHo0jwpfFmRpZiKV--7iivAvU6ipffZy6nHJtBLj',
    url: 'https://gateway.watsonplatform.net/assistant/api'
});

module.exports = watsonConfig;