const {getAuthToken, testCRDS} = require('../lib/cloud');
const { schoolAdminAuthPayload} = require('../lib/auth-payloads');
const createPayload =
{
  "address": {
    "addressOne": "209",
    "addressTwo": "Chandanagar",
    "city": "Hyderabad",
    "state": "TS",
    "country": "India",
    "zipCode": "500050"
  },
  "user": {
    "email": "school-employee1@gmail.com",
    "lastName": "Malakar",
    "firstName": "Rohit",
    "password": "test@123"
  },
  "employee":{
    "firstName":"Rohit",
    "lastName":"Malakar",
    "gender":"M",
    "dob":"01/05/1985",
    "bloodGroup":"O+",
    "joiningDate":"01/07/2015",
    "employeeNumber":"EMP0002",
    "departmentId":1
  }
};

let token;
describe('employees', () => {
   before(()=> {
      return getAuthToken(schoolAdminAuthPayload).
            then(r => token = r.body.token).
            catch(r => {throw r;});
   });

    it('/employees - CRDS', () => {
	     return testCRDS('/employees', createPayload, null, token, 'id')
		     .catch(r => { throw r;});
	});
});
