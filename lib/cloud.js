var chai  = require('chai');
var chaiHttp = require('chai-http');
const {getPrimaryKeyValue} = require('./utilities');

chai.use(chaiHttp);
let baseUrl = 'http://localhost:9100/sms/api/v1';

getAuthToken = (authPayload) => {
     return chai.request(baseUrl)
              .post('/authenticate')
              .send(authPayload)
              .then((res) => {
                  if(res.statusCode !=200){
                      throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                  }
                  return res;
              });
};

create = (tokenStr, createPayload, path) => {
    return chai.request(baseUrl)
                    .post(`${path}`)
                    .set('Authorization', tokenStr)
                    .send(createPayload)
                    .then((res) => {
                        if(res.statusCode !=200){
                            throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                         }
                         return res;
                    });
};

getAll = (tokenStr, path) => {
         return chai.request(baseUrl)
                .get(`${path}`)
                .set('Authorization', tokenStr)
                .then((res) => {
                     if(res.statusCode !=200){
                        throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                     }
                     return res;
                });
};

getById = (tokenStr, id, path) => {
      return chai.request(baseUrl)
               .get(`${path}/${id}`)
               .set('Authorization', tokenStr)
               .then((res) => {
                      if(res.statusCode !=200){
                           throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                      }
                      return res;
               });
};

deleteById = (tokenStr, id, path) => {
      return chai.request(baseUrl)
                .delete(`${path}/${id}`)
                .set('Authorization', tokenStr)
                .then((res) => {
                     if(res.statusCode !=200){
                           throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                     }
                     return res;
                });

};

updateById = (tokenStr, path, method, updatePayload) => {
   if(method === 'PUT') {
        return chai.request(baseUrl)
                   .put(`${path}`)
                   .set('Authorization', tokenStr)
                   .send(updatePayload)
                   .then((res) => {
                        if(res.statusCode !=200){
                              throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                        }
                        return res;
                   });
   } else if(method === 'PATCH') {
        return chai.request(baseUrl)
                   .patch(`${path}/${id}`)
                   .set('Authorization', tokenStr)
                   .send(updatePayload)
                   .then((res) => {
                        if(res.statusCode !=200){
                              throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                        }
                        return res;
                   });
   }
};

updateByIds = (tokenStr, leftPath, middlePath, endPath, id1, id2, method, updatePayload) => {
   if(method === 'PUT') {
        return chai.request(baseUrl)
                   .put(`/${leftPath}/${id1}/${middlePath}/${id2}/${endPath}`)
                   .set('Authorization', tokenStr)
                   .send(updatePayload)
                   .then((res) => {
                        if(res.statusCode !=200){
                              throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                        }
                        return res;
                   });
   } else if(method === 'PATCH') {
        return chai.request(baseUrl)
                   .patch(`/${leftPath}/${id1}/${middlePath}/${id2}/${endPath}`)
                   .set('Authorization', tokenStr)
                   .send(updatePayload)
                   .then((res) => {
                        if(res.statusCode !=200){
                              throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                        }
                        return res;
                   });
   }
};

getByIdNotExists = (tokenStr, id, path) => {
      return chai.request(baseUrl)
               .get(`${path}/${id}`)
               .set('Authorization', tokenStr)
               .then((res) => {
                      if(res.statusCode != 404){
                           throw 'HttpCode:'+res.statusCode + ', Message:' +  res.body.message;
                      }
                      return res;
               });
};

testCRDS = (path, createPayload, updatePayload, token, primaryKey, rootKey) => {
  let id;
  let tokenStr = 'Bearer ' +token;
  return create(tokenStr, createPayload, path).
       then(r=> id = getPrimaryKeyValue(r.body, primaryKey, rootKey)).
       then(r=> getAll(tokenStr, path)).
       then(r=> getById(tokenStr, id, path)).
       then(r=> deleteById(tokenStr, id, path)).
       then(r=> getByIdNotExists(tokenStr, id, path)).
       catch(r => {
           throw r;
       });
};

testCRUDS = (path, createPayload, updatePayload, token, primaryKey, rootKey, updateMethod) => {
  let id;
  let tokenStr = 'Bearer ' +token;
  return create(tokenStr, createPayload, path).
       then(r=> id = getPrimaryKeyValue(r.body, primaryKey, rootKey)).
       then(r=> getAll(tokenStr, path)).
       then(r=> getById(tokenStr, id, path)).
       then(r=> updateById(tokenStr, `${path}/${id}`, updateMethod,updatePayload)).
       then(r=> deleteById(tokenStr, id, path)).
       then(r=> getByIdNotExists(tokenStr, id, path)).
       catch(r => {
           throw r;
       });
};

module.exports = { testCRDS, testCRUDS, create, getAll, deleteById,updateById , getAuthToken, updateByIds};
