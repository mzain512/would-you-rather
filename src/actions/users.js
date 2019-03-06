export const GET_USERS = 'GET_USERS'

export const fetchUsers = (users) => {
     return {
         type : GET_USERS,
         users
     }
}