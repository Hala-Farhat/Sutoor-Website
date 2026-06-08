const body = {
  donorName: 'Test',
  donorAmount: '100',
  donorMessage: 'test',
  countryName: 'Qatar',
  receiptBase64:
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  receiptFilename: 't.png',
  receiptMimeType: 'image/png',
};

const res = await fetch('https://sutoor.web.app/api/send-donation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});
const text = await res.text();
console.log('HTTP', res.status);
console.log(text);
