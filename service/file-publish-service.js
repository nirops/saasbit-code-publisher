import * as fs from 'fs';
import axios from 'axios';

export async function uploadFile(filename) {
  const file = fs.createReadStream(filename);

  const form = new FormData();
  form.
  form.append('file', file);

  const resp = await axios.post('http://localhost:3000/upload', form, {
    headers: {
      ...form.getHeaders(),
    }
  });

  if (resp.status === 200) {
    return 'Upload complete';
  }
}