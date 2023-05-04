import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'

// import SettingsBio from '../settings/SettingsBio';
import SettingsGifts from '../settings/SettingsGifts';
// import SettingsPublic from '../settings/SettingsPublic';
import SettingsPreferences from '../settings/SettingsPreferences'
import SettingsAccount from '../settings/SettingsAccount';
import UserBanner from './UserBanner';

export default function UserSettings(props) {
    const authUser = useAuthUser()
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user){
            setUser(authUser().user)
        }
    }, []);

    if (!user) {
        return "No user logged in!"
    }

    return (

        <>
            <UserBanner user={user}/>
            
            <div className="Container">    
                <SettingsPreferences user={user} settings={user.preferences}/>               
                <SettingsGifts user={user} settings={user.gifts}/>        
                {/* <SettingsBio user={user} settings={user.bio}/>         */}
                {/* <SettingsPublic user={user} settings={user.public}/>                        */}
                <SettingsAccount user={user}/>        
            </div>
        </>
        )
    }

