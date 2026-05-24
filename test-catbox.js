const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function testCatbox() {
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', Buffer.from('test image data'), 'test.jpg');
  
  try {
    const res = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form
    });
    const text = await res.text();
    console.log("Catbox Response:", text);
    console.log("Headers:", res.headers.raw());
  } catch(e) {
    console.error(e);
  }
}
testCatbox();
