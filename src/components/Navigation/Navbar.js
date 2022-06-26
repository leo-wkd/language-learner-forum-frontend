import React from 'react';
import { useSelector } from 'react-redux';
import PublicNavbar from './Public/PublicNavbar';
import PrivateNavbar from './Private/PrivateNavbar';
import AdminNavbar from './Admin/AdminNavbar';
import AccountVerificationAlertWarning from './Alerts/AccountVerificationAlertWarning';
import AccountVerificationSuccessAlert from './Alerts/AccountVerificationSuccessAlert';

export const Navbar = () => {
  const state = useSelector(state => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;

  // account verification
  const account = useSelector(state => state?.accountVerification);
  const {loading, appErr, serverErr, token} = account;
  return (
    <>
        {!userAuth? <PublicNavbar/> : isAdmin ? <AdminNavbar isLogin={userAuth}/> : <PrivateNavbar isLogin={userAuth}/>}
        {/*display alert*/}
        {userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning/>}
        {loading && <h2 className="text-center">Loading please wait...</h2>}
        {token && <AccountVerificationSuccessAlert/>}
        {appErr || serverErr ? <h2 className="text-center text-red-500">{serverErr} {appErr}</h2> : null}
    </>
  )
};

export default Navbar;
