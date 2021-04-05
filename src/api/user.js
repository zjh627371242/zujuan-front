import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/user/add',params)
    },
    list(params){
        return http.post('/user/list',params)
    },
    delete(params){
        return http.post('/user/delete',params)
    },
    detail(params){
        return http.post('/user/detail',params)
    },
    edit(params){
        return http.post('/user/edit',params)
    }
};
