/*
  This is useful in case of nested data from which primary key has to be determined
*/
getPrimaryKeyValue = (payload, primaryKey, rootKey) => {
  let primaryKeyValue;
  if(rootKey) {
       let rootKeyPayload = payload[rootKey];
       Array.isArray(rootKeyPayload) ? (primaryKeyValue = rootKeyPayload[0][primaryKey]) : (primaryKeyValue = rootKeyPayload[primaryKey]);
  } else {
        primaryKeyValue = payload[primaryKey];
  }
  return primaryKeyValue;
};


module.exports = {
   getPrimaryKeyValue
};
