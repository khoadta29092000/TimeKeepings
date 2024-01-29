import './App.css'
import './index.css'
import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router, Switch } from 'react-router'
import Login from './Page/Login/Login'
import ErrorPage from './Page/Error/ErrorPage'
import Employee from './Page/Manager/Employee/Employee'
import EmployeeDetail from './Page/Manager/EmployeeDetail/EmployeeDetail'
import Profile from './Page/Manager/Profile/Profile'
import RiskEmployee from './Page/Manager/RiskEmployee/RiskEmployee'
import TimeSheet from './Page/Manager/TimeSheet/TimeSheet'
import ManageLeave from './Page/Manager/ManageLeave/ManageLeave'
import Report from './Page/Manager/Report/Report'
import EmployeeAdmin from './Page/Admin/Employee/Employee'
import RiskEmployeeSettings from './Page/Admin/EmployeeRiskSettings/EmployeeRiskSettings'
import TrackSettings from './Page/Admin/TrackSettings/TrackSettings'
import Holiday from './Page/Manager/Holiday/Holiday'
import ApplyLeave from './Page/Employee/ApplyLeave/ApplyLeave'
import Team from './Page/Admin/Team/Team'
import Overtime from './Page/Employee/Overtime/Overtime'
import Worked from './Page/Employee/Worked/Worked'
import ManageOvertime from './Page/Manager/ManageOvertime/ManageOvertime'
import ManageWorked from './Page/Manager/ManageWorked/ManageWorked'
import DashboardEmployee from './Page/Employee/Dashboard/Dashboard'
import WorkSlot from './Page/Manager/WorkSlot/WorkSlot'

export const history = createBrowserHistory()

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                {/*Admin*/}
                <Route path="/Admin/Team" exact component={Team} />
                <Route path="/Admin/Employee" exact component={EmployeeAdmin} />
                {/* <Route path="/Admin/RiskEmployeeSettings" exact component={RiskEmployeeSettings} /> */}
                <Route path="/Admin/TrackSettings" exact component={TrackSettings} />
                {/*Manager*/}
                <Route path="/Profile" exact component={Profile} />
                <Route path="/Manager/Employee" exact component={Employee} />
                <Route path="/Manager/Employee/Detail/:id" render={(props) => <EmployeeDetail {...props} />} />
                <Route path="/Manager/RiskEmployee" exact component={RiskEmployee} />
                <Route path="/Manager/TimeSheet" exact component={TimeSheet} />
                <Route path="/Manager/Report" exact component={Report} />
                {/*HR*/}
                <Route path="/Hr/Workslot" exact component={WorkSlot} />
                <Route path="/Hr/ManageLeave" exact component={ManageLeave} />
                <Route path="/Hr/ManageHoliday" exact component={Holiday} />
                <Route path="/Hr/ManageOvertime" exact component={ManageOvertime} />
                <Route path="/Hr/ManageWorked" exact component={ManageWorked} />
                {/*Employee*/}

                <Route path="/Employee/Dashboard" exact component={DashboardEmployee} />
                <Route path="/Employee/ApplyLeave" exact component={ApplyLeave} />
                <Route path="/Employee/Overtime" exact component={Overtime} />
                <Route path="/Employee/Worked" exact component={Worked} />
                <Route component={ErrorPage} />
            </Switch>
        </Router>
    )
}

export default App
