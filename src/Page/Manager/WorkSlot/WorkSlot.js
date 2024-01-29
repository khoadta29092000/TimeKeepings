import React, { Fragment, useCallback, useEffect, useState } from 'react'
import vnLocale from '@fullcalendar/core/locales/vi'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridWeek from '@fullcalendar/timegrid'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import dayGridPlugin from '@fullcalendar/daygrid'
//date-picker-range
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
//mui
import {
    Select,
    MenuItem,
    FormControl,
    DialogActions,
    Autocomplete,
    TextField,
    InputLabel,
    Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
//icon
import FilterListIcon from '@mui/icons-material/FilterList'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BadgeIcon from '@mui/icons-material/Badge'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

//component
import IconBreadcrumbs from '../../../Components/Breadcrumbs'
import Navbar from '../Navbar'
import PopupData from '../../../Components/Popup'
import { formatDateExact, formattedDate } from '../../../Hook/useFormatDate'
import NavbarHR from '../NavbarHR'

//style
//style
import './Style.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    GetWorkedSlotAsyncApi,
    PostWorkEmployeeByDepartmentAsyncApi,
    PostWorkedSlotAsyncApi,
    PostWorkedSlotEmployeeAsyncApi,
} from '../../../Redux/Worked/WorkedSlice'
import { getDepartmentAsyncApi } from '../../../Redux/Department/DepartmentSlice'
import { useSnackbar } from '../../../Hook/useSnackbar'

const breadcrumbIcons = () => {
    const data = [
        { title: 'Dashboard', icon: <DashboardIcon />, url: '/', status: true },
        { title: 'Time Sheet', icon: <BadgeIcon />, url: '/Employee', status: false },
    ]
    return data
}

const dataBreadcrumbs = breadcrumbIcons()

const dataList = [
    {
        name: 'Việt',
        avatar: 'https://haycafe.vn/wp-content/uploads/2022/03/Anh-anime-nu-anh-anime-girl-449x600.jpg',
        working: [
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
        ],
    },
    {
        name: 'Đạt',
        avatar: 'https://antimatter.vn/wp-content/uploads/2022/11/hinh-anh-anime-nu-334x600.jpg',
        working: [
            { out: '00:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
            { out: '7:00', in: '7:00', work: '7:00', active: '7:00', date: new Date() },
        ],
    },
]

export default function WorkSlot() {
    const [open, setOpen] = useState()
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    })
    const [loadingButton, setLoadingButton] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')
    const [alert, setAlert] = useState('')

    let callbackFunctionAlert = (childData) => {
        setAlert(childData)
    }

    let callbackFunctionPopup = (childData) => {
        setOpen(childData)
    }
    let callbackFunctionPopup1 = (childData) => {
        setOpen1(childData)
    }
    const moment = require('moment')
    const [currentMonth, setCurrentMonth] = useState(null) // Lưu trữ tháng hiện tại

    const [userDad, setUserDad] = useState({})
    // const getAllCarschedule = useCallback(() => {
    //   const actionAsync = getCarscheduleAsyncApi();
    //   dispatch(actionAsync);
    // }, [dispatch]);
    const [Department, setDepartment] = useState('')
    //setting redux
    const { WorkedSlot, loading } = useSelector((state) => state.worked)
    const { DepartmentList } = useSelector((state) => state.department)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDepartmentAsyncApi()).then((res) => {
            dispatch(
                GetWorkedSlotAsyncApi({
                    id: res.payload[0].id,
                    month: formatDateExact(currentMonth),
                })
            )
            setDepartment(res.payload[0].id)
        })

        return () => {}
    }, [])
    useEffect(() => {
        {
            Department &&
                dispatch(getDepartmentAsyncApi()).then((res) => {
                    dispatch(
                        GetWorkedSlotAsyncApi({
                            id: Department,
                            month: formatDateExact(currentMonth),
                        })
                    )
                    setDepartment(Department)
                })
        }

        return () => {}
    }, [currentMonth, Department])

    const getAllCarschedule = () => {}
    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value)
    }

    const calendarRef = React.createRef()
    const [id, setid] = useState(null)
    const [event, setEvent] = useState(null)
    const [carStatusId, setCarStatusId] = useState(0)
    const [carId, setCarId] = useState(0)

    // const resources = Carschedule.map((schedule) => ({
    //     id: schedule.carLicensePlates,
    //     title: `${schedule.carLicensePlates}`,
    //     carLicensePlates: schedule.carLicensePlates,
    // }))

    // const handleEventClick = (info) => {
    //     const {
    //         extendedProps: { id1: id, carid1: carId, title1: carStatusId },
    //     } = info.event
    //     handleClickOpenUpdate(info.event, id, carId, carStatusId, {})
    // }
    // const events = Carschedule.map((schedule) => {
    //     let color = ''
    //     switch (schedule.carStatusId) {
    //         case 1:
    //             color = 'yellow'
    //             break
    //         case 2:
    //             color = 'green'
    //             break
    //         case 3:
    //             color = 'red'
    //             break
    //         case 4:
    //             color = 'blue'
    //             break
    //         case 5:
    //             color = 'purple'
    //             break
    //         case 6:
    //             color = 'pink'
    //             break
    //         case 7:
    //             color = 'gray'
    //             break
    //         case 8:
    //             color = 'orange'
    //             break
    //         case 9:
    //             color = 'teal'
    //             break
    //         case 10:
    //             color = 'indigo'
    //             break
    //         default:
    //             color = 'green'
    //             break
    //     }
    //     const start = schedule.dateStart ? moment(schedule.dateStart).toDate() : null
    //     const end = schedule.dateEnd ? moment(schedule.dateEnd).toDate() : null
    //     return {
    //         title: schedule.carStatusName,
    //         title1: schedule.carStatusId,
    //         carid1: schedule.carId,
    //         id1: schedule.id,
    //         resourceId: schedule.carLicensePlates,
    //         start,
    //         end,
    //         color,
    //     }
    // })
    const handleDateRangeChange = (ranges) => {
        setSelectedDateRange(ranges.selection)
    }

    const clickOpenFalse = (event) => {
        setOpen(false)
        setSelectedDateRange({})
    }
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClickSave = () => {
        setOpen(false)
    }
    const topName = ['khoa', 'việt', 'tài']
    const viewModalContent = (
        <Fragment>
            <div className=" gap-5 py-4 px-8 mb-5 lg:my-0"></div>

            <DialogActions>
                <div className="flex gap-5">
                    <Button variant="contained" color="inherit" autoFocus onClick={handleClickSave}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary" autoFocus>
                        Save changes
                    </Button>
                </div>
            </DialogActions>
        </Fragment>
    )
    const viewModalAction = (
        <Button autoFocus onClick={handleClickSave}>
            Save changes
        </Button>
    )

    const handleChangeMonth = (info) => {
        const startDate = info.view.currentStart

        // Lấy ngày đầu của tháng
        const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1)

        // Chuyển đổi định dạng ngày thành "yyyy/MM/dd"
        const formattedStartDate = firstDayOfMonth.toLocaleDateString('en-CA')
        const formattedDate = formattedStartDate.replace(/-/g, '/')
        // Hiển thị tháng hiện tại dưới dạng "yyyy/MM/dd"
        setCurrentMonth(formattedDate)
    }
    console.log('selectedDateRange', Department)
    const events = [
        {
            title: 'Event 1',
            start: '2023-09-01',
        },
        {
            title: 'Event 2',
            start: '2023-09-02',
        },
        {
            title: 'Event 3',
            start: '2023-09-08',
        },
        {
            title: 'Event 4',
            start: '2023-09-09',
        },
    ]
    const newEvents = WorkedSlot.map((item, index) => {
        return {
            start: item.date,
            title: item.title,
            time: item.startTime + ' ~ ' + item.endTime,
        }
    })
    console.log('sada', newEvents)

    const dayHeaderContent = (info) => {
        const date = info.date
        const dayOfWeek = date.getDay()

        if (dayOfWeek === 0 /* Sunday */) {
            return (
                <div className="sunday-header" style={{ backgroundColor: '#FF0000', color: '#FFFFFF' }}>
                    {info.dayNumberText}
                </div>
            )
        }

        return info.dayNumberText
    }
    function renderEventContent(eventInfo) {
        // Tùy chỉnh cách hiển thị sự kiện
        console.log('eventInfo.event', eventInfo.event)
        if (eventInfo.event.title === 'Not working') {
            return (
                <div className="working-event text-black">
                    <b>{eventInfo.timeText}</b>
                    <div className="flex my-2 gap-2 bg-none items-center mx-auto ml-4">
                        <button className="rounded-full bg-gray-600 w-2 h-2"></button>
                        <p className=" ">{eventInfo.event.title}</p>
                    </div>
                </div>
            )
        } else {
            // Xử lý hiển thị các sự kiện khác
            return (
                <div className="text-black">
                    <b>{eventInfo.timeText}</b>
                    <div className="flex my-2 gap-2 bg-none items-center mx-auto ml-4">
                        <button className="rounded-full bg-green-600 w-2 h-2"></button>
                        <p className=" ">Working Date : {eventInfo.event.extendedProps.time}</p>
                    </div>
                </div>
            )
        }
    }
    const [openPopup, setOpenPopup] = useState(false)
    const showSnackbar = useSnackbar()
    const handleClickOpenAdd = () => {
        setLoadingButton(true)
        // dispatch(PostWorkEmployeeByDepartmentAsyncApi({ id: Department, body: '1' }))

        dispatch(
            PostWorkedSlotAsyncApi({
                departmentId: Department,
                month: currentMonth,
            })
        )
            .then((response) => {
                if (response.meta.requestStatus == 'fulfilled') {
                    dispatch(
                        PostWorkedSlotEmployeeAsyncApi({
                            departmentId: Department,
                            month: currentMonth,
                        })
                    ).then((res) => {
                        dispatch(getDepartmentAsyncApi()).then((res) => {
                            setLoadingButton(false)
                            dispatch(
                                GetWorkedSlotAsyncApi({
                                    id: res.payload[0].id,
                                    month: formatDateExact(currentMonth),
                                })
                            )
                            setDepartment(res.payload[0].id)
                            showSnackbar({
                                severity: 'success',
                                children: 'Create Work Slot Department successfully',
                            })
                        })
                    })
                }
            })
            .catch((error) => {
                setLoadingButton(false)
            })
    }
    return (
        <div>
            <PopupData
                open={open}
                clickOpenFalse={clickOpenFalse}
                viewTitle={'Create Work Slot Department'}
                viewContent={viewModalContent}
            />

            <NavbarHR />

            <div className="sm:ml-64 h-screen pt-20 bg-gray-50">
                <div className="w-full py-8 px-5 bg-white relative ">
                    <div className="  xl:flex mb-2 w-full  absolute right-[200px] top-[32px]">
                        <div className="sm:ml-[220px]">
                            <FormControl sx={{ width: 300, marginBottom: 4 }}>
                                <InputLabel size="small" id="demo-simple-select-label">
                                    Department
                                </InputLabel>
                                <Select
                                    size="small"
                                    className="bg-white"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Department}
                                    label="Department"
                                    onChange={handleChangeDepartment}
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
                        </div>
                        <div className="ml-auto flex justify-between flex-wrap  gap-5 ">
                            <LoadingButton
                                startIcon={<AddIcon />}
                                onClick={handleClickOpenAdd}
                                loading={loadingButton}
                                loadingPosition="start"
                                color="info"
                                variant="contained"
                                sx={{
                                    textAlign: 'center',
                                }}
                                autoFocus
                                className="text-gray-600 h-10   border-gray-400 shadow-lg"
                            >
                                Add Work Slot
                            </LoadingButton>
                        </div>
                    </div>

                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin]}
                        datesSet={handleChangeMonth}
                        initialView="dayGridMonth"
                        events={newEvents}
                        eventContent={renderEventContent}
                        headerToolbar={{
                            left: '',
                            center: 'title',
                            right: 'prev,next today',
                        }}
                        height="84vh"
                        daysOfWeek={(0, 1)}
                        DayGrid={true}
                        TimeGrid={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        daysHidden={[6, 5]}
                        editable={true}
                        droppable={true}
                        eventBackgroundColor={'#ffffff'}
                        eventBorderColor={'#ffffff'}
                        className="custom-calendar"
                    />
                </div>
            </div>
        </div>
    )
}
