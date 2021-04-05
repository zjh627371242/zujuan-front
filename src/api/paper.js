import http from "@/utils/http.js";

export default {
  list(params) {
    return http.post("/paper/list", params);
  },
  auto(params) {
    return http.post("/paper/autoPaper", params);
  },
  manual(params) {
    return http.post("/paper/manualPaper ", params);
  },
  detail(params) {
    return http.post("/paper/detail ", params);
  },
  delete(params) {
    return http.post("/paper/delete ", params);
  },
};
