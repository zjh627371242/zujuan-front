import http from "@/utils/http.js";

export default {
    list(params){
        return http.post('/subject/list',params)
    },
    delete(params){
        return http.post('/subject/delete',params)
    },
    add(params){
        return http.post('/subject/add',params)
    },
    edit(params){
        return http.post('/subject/edit',params)
    }
};