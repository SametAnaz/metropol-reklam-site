const axios = require('axios');

async function testUmamiAPI() {
  const apiKey = 'api_bsIcXQsVd66rseroeopn44nxpcAA0Geo';
  const websiteId = '610cc1d0-d081-41b5-a29a-fb2fb627d970';
  
  try {
    console.log('Testing Umami Cloud API with:');
    console.log('API Key:', apiKey);
    console.log('Website ID:', websiteId);
    
    // First test API key validity
    try {
      console.log('\n1. Testing API Key validity...');
      const userResponse = await axios({
        method: 'get',
        url: 'https://cloud.umami.is/api/me',
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      console.log('✅ API Key is valid. User info:', userResponse.data);
    } catch (error) {
      console.error('❌ API Key validation failed:', error.message);
      if (error.response) {
        console.error('  Status:', error.response.status);
        console.error('  Response:', error.response.data);
      }
    }
    
    // Try to get website info
    try {
      console.log('\n2. Testing website info retrieval...');
      const websiteResponse = await axios({
        method: 'get',
        url: `https://cloud.umami.is/api/websites/${websiteId}`,
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      console.log('✅ Website info retrieved:', websiteResponse.data);
    } catch (error) {
      console.error('❌ Website info retrieval failed:', error.message);
      if (error.response) {
        console.error('  Status:', error.response.status);
        console.error('  Response:', error.response.data);
      }
    }
    
    // Try to get stats
    try {
      console.log('\n3. Testing stats retrieval...');
      const now = Date.now();
      const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
      
      const statsResponse = await axios({
        method: 'get',
        url: `https://cloud.umami.is/api/websites/${websiteId}/stats`,
        params: {
          startAt: thirtyDaysAgo,
          endAt: now
        },
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      console.log('✅ Stats retrieved:', JSON.stringify(statsResponse.data, null, 2));
    } catch (error) {
      console.error('❌ Stats retrieval failed:', error.message);
      if (error.response) {
        console.error('  Status:', error.response.status);
        console.error('  Response:', error.response.data);
      }
    }
    
  } catch (error) {
    console.error('General error:', error.message);
  }
}

testUmamiAPI();
