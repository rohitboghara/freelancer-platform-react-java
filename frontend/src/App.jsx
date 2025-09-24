import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Route, Routes, useLocation } from 'react-router-dom';


import Home from "./pages/Home"
import Footer from './components/Footer';
import Login from './pages/Login'
import JobList from './pages/JobList';
import Talent from './pages/Talent';
import ProjectDetail from './components/WorkAndTalent/ProjectDetail';
import MyProfile from './pages/Header-page/MyProfile';
import SignUpPage from './pages/Signup';
import FreelancerProfile from './components/WorkAndTalent/FreelancerProfile';
import Header from './components/Header';
import MyJobs from './pages/Header-page/Manage-work/MyJobs';
import Contracts from './pages/Header-page/Manage-work/Contracts';
import AddJob from './pages/Header-page/Manage-work/AddJob';
import ManageJob from './pages/Header-page/Manage-work/ManageJob';
import EditJob from './pages/Header-page/Manage-work/component/EditJob';
import ByJob from "./pages/Header-page/find-work/ByJob";
import BySkill from './pages/Header-page/freelancer/BySkill';
import Message from './pages/Header-page/Message';
import ByLocation from './pages/Header-page/freelancer/ByLocation';
import ByCountry from './pages/Header-page/find-work/ByCountry';
import ByCategory from './pages/ByCategory';
import InternatinalFreelancer from './pages/Header-page/InternationalFreelancer';


const App = () => {

  const location = useLocation();
  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <MantineProvider>
      <Notifications position="top-center" zIndex={2077} />
      {!hideLayout && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/job-list' element={<JobList />} />
        <Route path='/talent' element={<Talent />} />
        <Route path="/project/:jobId" element={<ProjectDetail />} />
        <Route path="/freelancer-profile/:id" element={<FreelancerProfile />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path="/by-skill/:skill" element={<BySkill />} />
        <Route path='/by-location/:location' element={<ByLocation />} />
        <Route path="/by-job/:job" element={<ByJob />} />
        <Route path='/by-country/:location' element={<ByCountry />} />
        <Route path='/freelancer/my-jobs' element={<MyJobs/>}/>
        <Route path='/freelancer/contracts' element={<Contracts/>}/>
        <Route path='/employer/contracts' element={<Contracts/>}/>
        <Route path='/employer/post-job' element={<AddJob/>}/>
        <Route path='/employer/manage-jobs' element={<ManageJob/>}/>
        <Route path='/employer/edit-job/:id' element={<EditJob/>}/>
        <Route path='/messages' element={<Message />} />
        <Route path='/category/:categorys' element={<ByCategory />} />
        <Route path='/international-freelancer' element={<InternatinalFreelancer />} />
      </Routes>
      {!hideLayout && <Footer />}
    </MantineProvider>
  )
}

export default App;