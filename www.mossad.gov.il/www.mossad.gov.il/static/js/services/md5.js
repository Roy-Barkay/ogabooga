import { createMD5 } from "hash-wasm";

const chunkSize = 64 * 1024 * 1024;
const fileReader = new FileReader();
let hasher = null;

function hashChunk(chunk) {
  return new Promise((resolve, reject) => {
    fileReader.onload = async (e) => {
      const view = new Uint8Array(e.target.result);
      hasher.update(view);
      resolve();
    };

    fileReader.readAsArrayBuffer(chunk);
  });
}

const readFile = async (file) => {
  if (hasher) {
    hasher.init();
  } else {
    hasher = await createMD5();
  }

  const chunkNumber = Math.floor(file.size / chunkSize);

  for (let i = 0; i <= chunkNumber; i++) {
    const chunk = file.slice(
      chunkSize * i,
      Math.min(chunkSize * (i + 1), file.size)
    );
    await hashChunk(chunk);
  }

  const hash = hasher.digest();
  return Promise.resolve(hash);
};

export default async function MD5Compiler(fileItem) {
  const file = fileItem;
  const hash = await readFile(file);
  return hash;
}
