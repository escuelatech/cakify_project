import axios from 'axios';

export default {
    upload,
    uploadBakeryImage
}

function upload(formData,uuid) {
    console.log("Upload started ..... "+uuid);
    formData.append('action', 'ADD');
    formData.append('param', 0);
    formData.append('secondParam', 0);
    console.log('file', formData);
    axios({
      url: 'https://escuelatech.com/api/cakes/upload',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'uuid':uuid
      },
    }).then(response =>{
      console.log(JSON.stringify(response.data));
    });

}

function uploadBakeryImage(formData,uuid) {
  console.log("Upload started ..... "+uuid);
  formData.append('action', 'ADD');
  formData.append('param', 0);
  formData.append('secondParam', 0);
  console.log('file', formData);
  axios({
    url: 'https://escuelatech.com/api/cakes/upload',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'uuid':uuid
    },
  }).then(response =>{
    console.log(JSON.stringify(response.data));
  });

}