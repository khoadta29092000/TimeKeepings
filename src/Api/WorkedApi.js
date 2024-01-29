import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const GetWorkedApi = async (name, status, date) => {
    try {
        const response = await axios.get(
            `${API_URL}/RequestWorkTime/get-all-work-time-request?nameSearch=${name}&status=${status}&month=${date}`
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const GetWorkedByIdApi = async (id) => {
    try {
        const response = await axios.get(
            `${API_URL}/RequestWorkTime/get-workslot-lack-time-of-employee?employeeId=${id}`
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export const GetWorkedSlotApi = async (id, month) => {
    try {
        const response = await axios.get(
            `${API_URL}/WorkSlot/get-workslot-of-department-in-one-month?departmentId=${id}&month=${month}`
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export const GetWorkDateSettingByIdApi = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/RequestLeave/get-work-date-setting-of-employee?employeeId=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const GetWorkedTypeApi = async () => {
    try {
        const response = await axios.get(`${API_URL}/LeaveType/get-all-leave-type`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const PostWorkedApi = async (id, body) => {
    try {
        const response = await axios.post(
            `${API_URL}/RequestWorkTime/create-request-work-time-of-employee?employeeId=${id}`,
            body
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export const PostWorkedSlotApi = async (body) => {
    try {
        const response = await axios.post(`${API_URL}/WorkSlot/generate-workslot-of-department-in-one-month`, body)
        return response.data
    } catch (error) {
        throw error
    }
}
export const PostWorkedSlotEmployeeApi = async (body) => {
    try {
        const response = await axios.post(
            `${API_URL}/WorkSlotEmployee/generate-workslot-for-all-employee-in-department`,
            body
        )
        return response.data
    } catch (error) {
        throw error
    }
}

export const PostWorkEmployeeByDepartmentApi = async (id, body) => {
    try {
        const response = await axios.post(
            `${API_URL}/Account/create-multiple-employee-account-of-department?DepartmentId=${id}`,
            body
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export const PutWorkedApi = async (id, body) => {
    try {
        const response = await axios.patch(`${API_URL}/RequestWorkTime/edit-request-work-time?employeeId=${id}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}
export const PutApproveWorkedApi = async (id) => {
    try {
        const response = await axios.patch(`${API_URL}/RequestWorkTime/approve-work-time-request?employeeId=${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const DeleteWorkedApi = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Workeds/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export default GetWorkedApi
