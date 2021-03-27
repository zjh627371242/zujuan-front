import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/dictionary/add',params)
    },
    list(params){
        return http.post('/dictionary/list',params)
    },
    delete(params){
        return http.post('/dictionary/delete',params)
    },
    detail(params){
        return http.post('/dictionary/detail',params)
    },
    edit(params){
        return http.post('/dictionary/edit',params)
    },
    getByCode(params){
        return http.post('/dictionary/getByCode',params)
    }
};