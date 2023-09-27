import Request from '../common/request'
const http = new Request()

const test = (param) => {
    return http.get('/index/test',param)
}
const test1 = (param) => {
    return http.get('/index/test1',param)
}
const test2 = (param) => {
    return http.get('/index/test2',param)
}
const tt = (param) => {
    return http.get('/users/test',param)
}
export default {
    test , test1, test2, tt 
}