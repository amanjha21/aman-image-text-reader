const { createWorker } = require("tesseract.js");

const textRecog = async function (pic_url) {
  const worker = createWorker({
    logger: (progress) => {
      console.log(progress);
    },
  });
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(pic_url);
  return text;
};

module.exports = textRecog;
