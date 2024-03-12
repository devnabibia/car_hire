

const useRtkErrors = (error:any) =>{

let errMsg=''

    if(error){

        if('status' in error){

            'error' in error?errMsg=error.error:errMsg=JSON.parse(JSON.stringify(error.data)).msg

        }

    }

    return errMsg


}
export default useRtkErrors