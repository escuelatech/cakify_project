import axios from 'axios';

export default {
    upload,
    uploadBakeryImage
}

function upload(formData,uuid) {
    console.log("Upload started ..... ");
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

function uploadBakeryImage(formData,email) {
 
  console.log(email , "printing email");
  console.log("Upload started ..... ");
  console.log('file', formData);
  axios({
    url: 'https://escuelatech.com/api/bakery/logoupload',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      // 'uuid':uuid
      'bakeryEmail':email,
     
    },
   
    
  }).then(response =>{
    console.log(JSON.stringify(response.data));
    // this.$store.dispatch('addBakeryRegMessage');
  });

}