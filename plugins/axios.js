export default function ({ $axios,req, redirect, store }) {
    $axios.onRequest(config => {
        let { method, header, data } = config
        if (method == 'post' && store.state.token) {
            if (typeof data === 'undefined') {
                config.data = {}
            }
            config.data.token = store.state.token
        }
    })
    $axios.defaults.timeout = 5000
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 500) {
            redirect('/400')
        }
    })
}