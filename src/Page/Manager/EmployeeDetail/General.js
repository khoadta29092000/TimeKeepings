import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import AddIcon from '@mui/icons-material/Add'
//Firebase
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../Config/FirebaseConfig'

//mui
import {
    Avatar,
    Button,
    FormControl,
    TextField,
    DialogActions,
    Tooltip,
    IconButton,
    Select,
    InputLabel,
    MenuItem,
    Radio,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Grid,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
//redux
import { PutEmployeeAsyncApi, getEmployeeByIdAsyncApi } from '../../../Redux/Employee/employeeSlice'
import { useSnackbar } from '../../../Hook/useSnackbar'
import { getDepartmentAsyncApi } from '../../../Redux/Department/DepartmentSlice'
import { getRoleAsyncApi } from '../../../Redux/Account/AccountSlice'

export default function General() {
    const [click, SetClick] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const param = useParams()
    const showSnackbar = useSnackbar()
    const { EmployeeDetail } = useSelector((state) => state.employee)
    const { RoleList } = useSelector((state) => state.account)
    const { DepartmentList } = useSelector((state) => state.department)

    const dispatch = useDispatch()
    useEffect(() => {
        const userStringEmployeeName = localStorage.getItem('employeeId')
        const employeeId = JSON.parse(userStringEmployeeName)
        console.log('effect', employeeId)
        dispatch(getDepartmentAsyncApi())
        dispatch(getRoleAsyncApi())
        dispatch(getEmployeeByIdAsyncApi(employeeId))
            .then((response) => {
                if (response.meta.requestStatus == 'fulfilled') {
                    console.log('effect', response)
                    formik.setValues({
                        username: response.payload.email,
                        firstName: response.payload.firstName,
                        lastName: response.payload.lastName,
                        gender: response.payload.gender,
                        address: response.payload.address,
                        phoneNumber: response.payload.phoneNumber,
                        roleID: response.payload.roleId,
                        departmentID: response.payload.departmentId,
                    })
                }
            })
            .catch((error) => {
                // Handle failure case
            })
        return () => {}
    }, [])
    const initialValues = {
        username: '',
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        phoneNumber: '',
        roleID: '',
        departmentID: '',
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required').email('Invalid email address'),
            firstName: Yup.string().min(2, 'Too Short!').max(4000, 'Too Long!').required(),
            lastName: Yup.string().min(2, 'Too Short!').max(4000, 'Too Long!').required(),
            gender: Yup.string().required(),
            phoneNumber: Yup.string().required(),
            address: Yup.string().required(),
            roleID: Yup.string().required(),
            departmentID: Yup.string().required(),
        }),
        onSubmit: (values) => {
            setLoadingButton(true)
            const userStringEmployeeName = localStorage.getItem('employeeId')
            const employeeId = JSON.parse(userStringEmployeeName)
            const newData = {
                id: employeeId,
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                address: values.address,
                phoneNumber: values.phoneNumber,
                roleID: values.roleId,
                departmentID: values.departmentId,
            }
            dispatch(PutEmployeeAsyncApi(newData))
                .then((response) => {
                    setLoadingButton(false)
                    if (response.meta.requestStatus == 'fulfilled') {
                        showSnackbar({
                            severity: 'success',
                            children: 'Update Employee successfully',
                        })
                        SetClick(false)
                        dispatch(getEmployeeByIdAsyncApi(employeeId))
                            .then((response) => {
                                if (response.meta.requestStatus == 'fulfilled') {
                                    formik.setValues({
                                        username: response.payload.email,
                                        firstName: response.payload.firstName,
                                        lastName: response.payload.lastName,
                                        gender: response.payload.gender,
                                        address: response.payload.address,
                                        phoneNumber: response.payload.phoneNumber,
                                        roleID: response.payload.roleId,
                                        departmentID: response.payload.departmentId,
                                    })
                                }
                            })
                            .catch((error) => {
                                // Handle failure case
                            })
                    }
                })
                .catch((error) => {
                    // Handle failure case
                    setLoadingButton(false)
                })
        },
    })
    return (
        <div className="bg-white block gap-10 my-5 lg:my-0 lg:flex">
            <div className="flex flex-col gap-5 w-full items-center h-[600px] rounded-2xl bg-white shadow-lg pt-16 my-5 lg:w-1/3 lg:my-0">
                <Avatar className="mx-auto" sx={{ width: 280, height: 280 }} />

                {/* <p className="text-center text-lg text-gray-400 font-semibold">Allowed *.jpeg, *.jpg, *.png, *.gif</p>
                <Button className="" variant="contained" component="label">
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0])
                            SetClick(true)
                        }}
                    />
                </Button> */}
            </div>
            <div className="rounded-2xl bg-white shadow-lg lg:w-2/3">
                <form onSubmit={formik.handleSubmit}>
                    <div className=" gap-5 py-4 px-8 mb-5 lg:my-0">
                        <div className="my-2">
                            <TextField
                                className="w-full"
                                id="outlined-basic"
                                disabled={true}
                                error={formik.touched.username && formik.errors.username ? true : undefined}
                                value={formik.values.username}
                                name="username"
                                label="Username"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                            />
                            {formik.errors.username && formik.touched.username && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.username}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">role</InputLabel>
                                <Select
                                    id="outlined-basic"
                                    disabled
                                    error={formik.touched.roleID && formik.errors.roleID ? true : undefined}
                                    className="w-full"
                                    value={formik.values.roleID}
                                    name="roleID"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="role"
                                    variant="outlined"
                                >
                                    {RoleList.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {formik.errors.roleID && formik.touched.roleID && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.roleID}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                    id="outlined-basic"
                                    disabled
                                    error={formik.touched.departmentID && formik.errors.departmentID ? true : undefined}
                                    className="w-full"
                                    value={formik.values.departmentID}
                                    name="departmentID"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Department"
                                    variant="outlined"
                                >
                                    {DepartmentList.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {formik.errors.departmentID && formik.touched.departmentID && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.departmentID}</div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="my-2">
                                <TextField
                                    id="outlined-basic"
                                    error={formik.touched.firstName && formik.errors.firstName ? true : undefined}
                                    fullWidth
                                    value={formik.values.firstName}
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="First Name"
                                    variant="outlined"
                                />
                                {formik.errors.firstName && formik.touched.firstName && (
                                    <div className="text mt-1 text-red-600 font-semibold">
                                        {formik.errors.firstName}
                                    </div>
                                )}
                            </div>
                            <div className="my-2">
                                <TextField
                                    id="outlined-basic"
                                    error={formik.touched.lastName && formik.errors.lastName ? true : undefined}
                                    fullWidth
                                    value={formik.values.lastName}
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    label="Last Name"
                                    variant="outlined"
                                />
                                {formik.errors.lastName && formik.touched.lastName && (
                                    <div className="text mt-1 text-red-600 font-semibold">{formik.errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.address && formik.errors.address ? true : undefined}
                                className="w-full"
                                value={formik.values.address}
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Address"
                                variant="outlined"
                            />
                            {formik.errors.address && formik.touched.address && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.address}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    error={formik.touched.gender && formik.errors.gender ? true : undefined}
                                    className="w-full"
                                    value={formik.values.gender}
                                    name="gender"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <FormControlLabel value={true} control={<Radio />} label="Female" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value={false} control={<Radio />} label="Male" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>

                            {formik.errors.gender && formik.touched.gender && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.gender}</div>
                            )}
                        </div>
                        <div className="my-2">
                            <TextField
                                id="outlined-basic"
                                error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : undefined}
                                className="w-full"
                                value={formik.values.phoneNumber}
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Phone Number"
                                variant="outlined"
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className="text mt-1 text-red-600 font-semibold">{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                    </div>

                    <LoadingButton
                        className=" right-8 float-right"
                        startIcon={<AddIcon />}
                        type="submit"
                        loading={loadingButton}
                        loadingPosition="start"
                        color="info"
                        variant="contained"
                        sx={{
                            textAlign: 'center',
                        }}
                        autoFocus
                    >
                        Save
                    </LoadingButton>
                </form>
            </div>
        </div>
    )
}
