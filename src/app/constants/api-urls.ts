
/**** Exporting object of URL tree ****/
export const API_URL = {
  // BASE_URL: 'http://52.202.205.180:8080/',
  BASE_URL: 'http://dev-api.eba-xbh4x3yw.ap-south-1.elasticbeanstalk.com/',
  // BASE_URL: 'http://192.168.1.39:8080/',
  // BASE_URL: 'http://192.168.0.110:8080/',

  /**** Auth URL Object ****/
  AUTH:{
    LOGIN: 'auth/login'
  },
  REPORT:{
    SEND_REPORT: 'files/upload',
    SAVE_REPORT: 'files/save',
  },
  COMPANY:{
    GET_COMPANIES: 'company/get-list'
  }
};
