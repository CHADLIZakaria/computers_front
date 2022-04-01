import React from 'react'
import Title from '../../components/Title/Title'
import AuthenticationService from '../../service/AuthenticationService'
import shopLoginPage from './shop-login-page.jpg'

const Login = () => {
  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-6'>
                    <img src={shopLoginPage} width={300} className='img-thumbnail'/>
                </div>
                <form className='col-6'>
                    <Title title={"Sign in"} />
                    <div className="row mb-3">
                        <label for="colFormLabel" className="col-sm-2 col-form-label">Username</label>
                        <div class="col-sm-10">
                            <input type="text" className="form-control" id="colFormLabel" placeholder="Username" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label for="colFormLabel" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="colFormLabel" placeholder="Password" />
                        </div>
                    </div>
                </form>
            </div>
            <button onClick={() => AuthenticationService.login("zakaria", "zakaria")} className="btn btn-primary" >Submit</button>
        </div>
    </>
  )
}

export default Login