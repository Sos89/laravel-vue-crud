import Vue from "vue";

let loader = null;
function displayLoading(loadingText="Loading...") {
    loader = Vue.prototype.$loading({
        lock: true,
        text: loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.85)'
    })
}

function removeLoader(){
    loader.close();
}
export const saveEmployee = ({commit}, payload) => {
    console.log(payload,'payload')
    displayLoading();
    axios.post('/save-employee', payload )
        .then(res => {
            Vue.prototype.$notify({
                title: 'Success',
                message: 'Employee added Successfully',
                type: 'success'
            })
            removeLoader();

            setTimeout( () => {
                window.location.href = '/employees'
            },2000)
        })
}

export const getEmployeesData = ( { commit }, payload ) => {
    axios.post(`/get-employee-data`, payload)
        .then(response => {
            commit('setTableData', response.data)
        })
}

export const updateEmployee = ({commit}, payload) => {
    displayLoading('Update employee...');
    axios.put(`/update-employee/${payload.id}`, payload.form ).then(res => {
        Vue.prototype.$notify({
            title: 'Success',
            message: 'Employee Updated Successfully',
            type: 'success'
        })
        removeLoader();
        setTimeout(() => {
            window.location.href= '/employees'
        }, 2000)
    })
}


export const deleteEmployee = ({commit}, payload) => {
    displayLoading('Deleting Employee');
    axios.delete(`/delete-employee/${payload.id}` )
        .then(res => {
            Vue.prototype.$notify({
                title: 'Success',
                message: res.data.message,
                type: 'success'
            })
            removeLoader();

        })

}
