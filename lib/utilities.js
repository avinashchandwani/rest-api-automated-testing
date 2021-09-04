
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