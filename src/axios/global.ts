import axios from "axios";
axios.defaults.baseURL = "https://stage.api.sloovi.com/";
// Request interceptor
axios.interceptors.request.use(function (config: any) {
    const token = localStorage.getItem('sloovi-api-token');
    // Get token and assign it to headers here
    if (token) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    //show loader here
    return config;
}
    , function (error) {
        return Promise.reject(error);
    });

// response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    //show loader here
    return response;
}, function (error) {
    if (error.response.data.errors) {
        error.response.data.errors.forEach((failed: { message: string }) => {
            console.error(failed)
        })
    }
    else if (error.response.data.message) {
        //handle error here
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
});