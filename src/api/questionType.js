import http from "@/utils/http.js";

export default {
    add(params){
        return http.post('/question-engine/add',params)
    },
    list(params){
        return http.post('/question-engine/list',params)
    },
    delete(params){
        return http.post('/question-engine/delete',params)
    },
    detail(params){
        return http.post('/question-engine/detail',params)
    },
    edit(params){
        return http.post('/question-engine/edit',params)
    },
    all(params){
        return http.post('/question-engine/all',params)
    }
};