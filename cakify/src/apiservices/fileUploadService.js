import axios from 'axios';

export default {
    upload,
    uploadBakeryImage
}

function upload(formData,uuid) {
    
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
// uploading image by passing bakeryEmail through header
function uploadBakeryImage(formData,email) {
 
   axios({
    url: 'https://escuelatech.com/api/bakery/logoupload',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'bakeryEmail':email,
     },
       
  }).then(response =>{
    console.log(JSON.stringify(response.data));
    // this.$store.dispatch('addBakeryRegMessage');
  }).catch(error => {
  console.log('There was an error : ' + JSON.stringify(error))
   return(this.errorMessage= JSON.stringify(
          error.response.data.errorMessage))
});

}