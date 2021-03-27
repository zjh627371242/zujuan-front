import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/notice/add',params)
    },
    list(params){
        return http.post('/notice/list',params)
    },
    delete(params){
        return http.post('/notice/delete',params)
    },
    detail(params){
        return http.post('/notice/detail',params)
    },
    edit(params){
        return http.post('/notice/edit',params)
    }
};