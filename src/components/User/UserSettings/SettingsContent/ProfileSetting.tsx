import React from 'react'
import SubHeader from '../../../SubHeader/SubHeader'
import UserInfo from '../../UserInfo/UserInfo'

const ProfileSetting = () => {
  return (
    <div className='wrap border-x-only'>
      <div className='container relative'>
        <section>
          <SubHeader pageName='My Profile' rootURL='/user/settings' />
        </section>
        <section className='flex flex-col items-center mt-10'>
          <UserInfo />
        </section>
        <section className='flex flex-col items-center mt-20'>
          <div>
            <p className='text-sm text-center w-10/12 mx-auto'>
              To edit your wallet name, click on the button below 
              and follow the instructions at the website:
              <span className='text-primaryColor font-semibold'> https://www.pns.link</span>
            </p>
          </div>
          <div className='w-full mt-10'>
            <a
              href="https://www.pns.link"
              className='block w-full text-center text-xl py-4 font-semibold 
              rounded-3xl bg-primaryColor text-white cursor-pointer opacity-80 
              hover:opacity-100'
            >
              Edit Name
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProfileSetting