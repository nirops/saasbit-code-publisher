import axios from 'axios';

export async function executeRest(port, request) {
  console.log('Executing rest');
  if (request.uri) {
    const url = `http://localhost:${port}${request.uri}`;
    console.log(`Request URL: ${url}`);
    try{
      const resp = await axios.request({
        url: url,
        method: request.method
      });
      return Promise.resolve({
        status: true,
        data: resp
      })
    }catch(e){
      return Promise.resolve({
        status: false,
        data: e
      })
    }
  }else{
    return Promise.reject();
  }
  // const res = await axios.get(request.url);
  // return res;
}