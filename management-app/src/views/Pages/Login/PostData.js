export function PostData(type, userData) {
  
  let BaseURL = 'http://localhost:3000/login';
  //return new Promise((resolve, reject) =>{

    console.log('sasda')

console.log(fetch(BaseURL,{
      method: 'POST',
      body: userData,
    }))

  return fetch(BaseURL,{
      method: 'POST',
      body: JSON.stringify(userData),
    })
    /*.then((response) => {
      console.log('asdalkfşl')
      response.json()
    })*/
    .then((responseJson) => {
      console.log('asdasda')
      return new Promise((resolve, reject) => resolve(responseJson));
    })
    .catch((error) => {
      console.log('sadasdcxv')
      return new Promise((resolve, reject) => reject(error));
    });
  //});
 }