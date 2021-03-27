import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/question/add',params)
    },
    list(params){
        return http.post('/question/list',params)
    },
    delete(params){
        return http.post('/question/delete',params)
    },
    detail(params){
        return http.post('/question/detail',params)
    },
    edit(params){
        return http.post('/question/edit',params)
    }
};