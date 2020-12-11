import axios from 'axios';
import {API_URL} from '../../../config';


export const getStudents = (jwt:string|undefined, param: string, limit:number, offset:number) => {
    
    return axios.get(`${API_URL}/cabinet/teacher/info?type=${param}&limit=${limit}&offset=${offset}`,{
            headers: {
                "X-api-token": `${jwt}`
            }
        })
        .then((response) => {
            return {
                total: response.data.total,
                students: response.data.all_people
            }
        })
        .catch(() => {
            return {
                total: null,
                students: null
            }
        })
}


export const getExperts = (jwt:string|undefined, param: string, limit:number, offset:number) => {
    
    return axios.get(`${API_URL}/cabinet/organizer/info?type=${param}&limit=${limit}&offset=${offset}`,{
            headers: {
                "X-api-token": `${jwt}`
            }
        })
        .then((response) => {
            console.log(response.data)
            return {
                total: response.data.total,
                users: response.data.all_students||response.data.all_teachers||response.data.all_people||response.data['all_teachers ']
            }
        })
        .catch((err) => {
            console.log(err)
            return {
                total: null,
                users: null
            }
        })
}