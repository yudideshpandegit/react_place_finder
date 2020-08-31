export const updateFormData = (oldObject, newObject)  => {

    console.log(oldObject, newObject);

    return{
        ...oldObject,
        ...newObject
    }

}