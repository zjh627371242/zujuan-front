import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/knowledge/add',params)
    },
    list(params){
        return http.post('/knowledge/list',params)
    },
    delete(params){
        return http.post('/knowledge/delete',params)
    },
    edit(params){
        return http.post('/knowledge/edit',params)
    }
};