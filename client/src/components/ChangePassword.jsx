import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom';

// Panels
const ChangePassword = () => {
    const initialCurrentServer = {"username": "", "old_password": "", "updated_password": ""}
    const [currentServer,setCurrentServer] = useState(initialCurrentServer)
    const navigate = useNavigate(); //use navigate to jump

    const handleChangeCurrentServer = event => {
        const { id, value } = event.target
        setCurrentServer({ ...currentServer, [id]: value })
    }

    const changePassword = async(event) => {
        event.preventDefault()

        console.log("changePassword sent request");

        const response = await fetch('http://localhost:8080/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentServer),
        })

        setCurrentServer(initialCurrentServer);

        console.log("changePassword got response");
    }

    const toHome = () => {
        navigate('/')
    }

    // const Panel = ({ children, title, className }) => {
    //     return (
    //         <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
    //             <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
    //             {children}
    //         </div>
    //     )
    // }
    const Panel = ({ children, title, className }) => {
        return (
            <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
                {children}
            </div>
        )
    }

    return (
        <Panel className="h-[100%]" title="User Settings">
            <div className="flex justify-between">
                <Button onClick={changePassword}>Change Password</Button>
                <Button type="danger" onClick={toHome}>Log Off</Button>
            </div>
            <div className="mt-[20px]">
                <Input id="username" label="Username" handleInputChange={handleChangeCurrentServer} value={currentServer.username}/>
                <Input id="old_password" type="password" label="Old Password" handleInputChange={handleChangeCurrentServer} value={currentServer.old_password}/>
                <Input id="updated_password" type="password" label="New Password" handleInputChange={handleChangeCurrentServer} value={currentServer.updated_password}/>
            </div>
        </Panel>
    )
}

export default ChangePassword



