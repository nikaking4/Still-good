export const OCR_HTML = `<!doctype html>
<html><head><meta charset="utf-8">
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@7.0.0/dist/tesseract.min.js"></script>
<script>
  const post = (m) => window.ReactNativeWebView.postMessage(JSON.stringify(m));
  async function run(image) {
    if (typeof Tesseract === 'undefined') return post({ error: 'OCR script not loaded (no internet?)' });
    try {
      const { data } = await Tesseract.recognize(image, 'lit', {
        logger: (m) => m.status === 'recognizing text' && post({ progress: m.progress }),
      });
      post({ text: data.text });
    } catch (e) {
      post({ error: String(e && e.message || e) });
    }
  }
</script></head><body></body></html>`;
