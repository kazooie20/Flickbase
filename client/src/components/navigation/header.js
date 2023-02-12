import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SideDrawer from './sideNavigation'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotifications } from '../../store/reducers/notifications'
import { showToast } from '../../utils/tools'
import { signOut } from '../../store/actions/users'
import { setLayout } from '../../store/reducers/site'

const Header = () => {
  const users = useSelector(state => state.users);
  const notifications = useSelector(state => state.notification);
  const site = useSelector(state => state.site);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  React.useEffect(() => {
    let pathname = location.pathname.split('/')
    if (pathname[1] === 'dashboard') {
      dispatch(setLayout('dash_layout'))

    } else {
      dispatch(setLayout(''))

    }
  }, [location.pathname, dispatch])

  React.useEffect(() => {
    let { global } = notifications;
    if (notifications && global.error) {
      const msg = global.msg ? global.msg : 'Error';
      showToast('ERROR', msg);
      dispatch(clearNotifications());
    }

    if (notifications && global.success) {
      const msg = global.msg ? global.msg : 'Success';
      showToast('SUCCESS', msg);
      dispatch(clearNotifications());
    }

  }, [notifications])

  const signOutUser = () => {
    dispatch(signOut());
    navigate('/');
  }

  return (
    <>
      { !users.data.verified && users.auth ?
        <div className='not_verified'>Not Verified</div>
       : null}
      <nav className={`navbar fixed-top ${site.layout}`}>
        <Link to='/' className='navbar-brand d-flex align-items-center fredoka_ff'>
          Flickbase
        </Link>
        <SideDrawer users={users} signOutUser={signOutUser} />
      </nav>

    </>

  )
}

export default Header