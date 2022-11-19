export const getJoiErrorMsg = (errors) =>{
    // console.log('get joi errors',errors?.message);
    return errors?.message;
}

export const getJoiErrorObject = (errors) =>{
    console.log('get joi errors',errors);
    let error = JSON.parse(errors.message);
    return error;
}

