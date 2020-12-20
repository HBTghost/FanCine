import axios from 'axios';
import FormData from 'form-data';

async function upload(req, res, next) {
  try {
    const fileNames = Object.keys(req.files);
    const result = {};
    for (const fileName of fileNames) {
      const img = req.files[fileName];
      const formData = new FormData();
      formData.append('smfile', Buffer.from(img.data), { filename: img.name });
      const header = formData.getHeaders();
      header.Authorization = process.env.SMMS_TOKEN;
      await axios
        .post(`${process.env.SMMS_URI}/upload`, formData, {
          headers: header,
        })
        .then((response) => {
          if (response.data.success) {
            result[fileName] = response.data.data.url;
          } else {
            result[fileName] = response.data.images;
          }
        })
        .catch(() => console.error('Failure'));
    }
    req.uploadUrl = result;
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

async function doNothing(req, res, next) {
  try {
    console.log('Do nothing');
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  return next();
}

export default {
  upload,
  doNothing,
};
