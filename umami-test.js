const axios = require('axios');

async function testUmamiConnection() {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://cloud.umami.is/api/websites/610cc1d0-d081-41b5-a29a-fb2fb627d970/stats',
      headers: {
        'Authorization': 'Bearer api_bsIcXQsVd66rseroeopn44nxpcAA0Geo',
        'Content-Type': 'application/json'
      }
    });
    console.log('Success!', response.data);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testUmamiConnection();
