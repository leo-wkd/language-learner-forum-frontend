import {BrowserRouter, Switch, Route} from 'react-router-dom'
import HomePage from './components/HomePage/HomePage';
import Register from './components/Users/Register/Register';
import Login from './components/Users/Login/Login';
import Navbar from './components/Navigation/Navbar'
import AddNewCategory from './components/Categories/AddNewCategory';
import CategoryList from './components/Categories/CategoryList';
import UpdateCategory from './components/Categories/UpdateCategory';
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute';
import AdminRoute from './components/Navigation/ProtectedRoutes/AdminRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from './components/Posts/PostsList';
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import UpdateComment from './components/Comments/UpdateComment';
import Profile from './components/Users/Profile/Profile';
import UploadProfilePhoto from './components/Users/Profile/UploadProfilePhoto';
import UpdateProfileForm from './components/Users/Profile/UpdateProfileForm';
import SendEmail from './components/Users/Emailing/SendEmail';
import AccountVerified from './components/Users/AccountVerification/AccountVerified';
import UsersList from './components/Users/UsersList/UsersList';
import UpdatePassword from './components/Users/PasswordManagement/UpdatePassword';
import ResetPasswordForm from './components/Users/PasswordManagement/ResetPasswordForm';
import ResetPassword from './components/Users/PasswordManagement/ResetPassword';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/posts' component={PostsList}/>
        <Route exact path='/posts/:id' component={PostDetails}/>
        <Route exact path='/users' component={UsersList}/>
        <Route exact path='/password-reset-token' component={ResetPasswordForm}/>
        <Route exact path='/reset-password/:token' component={ResetPassword}/>
        
        
        <AdminRoute exact path='/add-category' component={AddNewCategory}/>
        <AdminRoute exact path='/category-list' component={CategoryList}/>
        <AdminRoute exact path='/update-category/:id' component={UpdateCategory}/>

        <PrivateProtectRoute exact path='/send-email' component={SendEmail}/>
        <PrivateProtectRoute exact path='/profile/:id' component={Profile}/>
        <PrivateProtectRoute exact path='/update-profile/:id' component={UpdateProfileForm}/>
        <PrivateProtectRoute exact path='/upload-profile-photo' component={UploadProfilePhoto}/>
        <PrivateProtectRoute exact path='/create-post' component={CreatePost}/>
        <PrivateProtectRoute exact path='/update-post/:id' component={UpdatePost}/>
        <PrivateProtectRoute exact path='/update-comment/:id' component={UpdateComment}/>
        <PrivateProtectRoute exact path='/verify-account/:token' component={AccountVerified}/>
        <PrivateProtectRoute exact path='/update-password' component={UpdatePassword}/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
