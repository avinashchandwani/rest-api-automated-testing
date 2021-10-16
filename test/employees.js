const {getAuthToken, testCRDS} = require('../lib/cloud');
const { authPayload} = require('../lib/auth-payloads');
const createPayload =
{
  "firstName": "Mark",
  "lastName": "Genee",
  "gender": "M",
  "employeeNumber":"EMP1111"
};

let token;
describe('employees', () => {
   before(()=> {
      return getAuthToken(authPayload).
            then(r => token = r.body.token).
            catch(r => {throw r;});
   });

    it('/employees - CRDS', () => {
	     return testCRDS('/employees', createPayload, null, token, 'id')
		     .catch(r => { throw r;});
	});
});
