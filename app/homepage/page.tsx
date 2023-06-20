"use client"
import {useUserInfoContext} from '../context/userinfo';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {Button} from "@/components/ui/button";
import AgentList from "@/app/homepage/components/agentsList";

export enum Status {
  On = "on",
  Off = "off",
}

export interface agentProps {
  id: number,
  name: string,
  status: Status
}

export default function Page() {
  const {userInfo, setUserInfo} = useUserInfoContext();
  const [menu, setMenu] = useState<string>('agents');
  const [open, setOpen] = useState<boolean>(false);
  const [agents, setAgents] = useState<agentProps[]>([]);
  const [select, setSelect] = useState<number | undefined>();
  const [deleteItem, setDeleteItem] = useState<number | undefined>();
  const router = useRouter();

  const logout = () => {
    setUserInfo({username: '', password: ''})
  }

  const clickEdit = (agent: agentProps) => {
    setSelect(agent.id + 1);
    setOpen(true);
  }

  const deleteEvent = (agent: agentProps) => {
    setDeleteItem(agent.id);
    setTimeout(() => {
      setAgents(prevAgents => prevAgents.filter(agentC => agentC.id !== agent.id));
      setDeleteItem(undefined);
    }, 1000)

  }

  useEffect(() => {
    if (userInfo.username.length <= 0) {
      router.push('/')
    }
  }, [userInfo])

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row">
      <div className='w-[20%] min-w-[200px] h-[100%] border-r border-r-[#afafaf]'>
        <div className='w-full text-center text-[2em] font-bold mt-[100px] text-[#afafaf]'>
          Gopher AI
        </div>
        <NavigationMenu className='justify-items-start !important flex-col !important'>
          <NavigationMenuList className='flex-col text-2xl text-[#afafaf] font-bold'>
            <NavigationMenuItem className='m-[20px] cursor-pointer' onClick={() => setMenu('agents')}>
              Agents
            </NavigationMenuItem>
            <NavigationMenuItem className='cursor-pointer' onClick={() => setMenu('settings')}>
              Settings
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='h-[100%] w-full flex flex-col'>
        <div className='w-full flex flex-col'>
          <div className='text-2xl ml-auto mr-[40px] mt-[20px] text-[#afafaf]'>Hello,{userInfo.username}</div>
          <Button className='ml-auto mr-[40px] mt-[20px] bg-[#afafaf]' onClick={logout}>
            log out
          </Button>
        </div>
        <div className='h-full flex justify-center'>
          {
            menu === 'agents' ?
              <AgentList clickEdit={clickEdit} deleteEvent={deleteEvent} agents={agents} setAgents={setAgents}
                         open={open} select={select} setSelect={setSelect} deleteItem={deleteItem} setOpen={setOpen}/>
              :
              <div className='text-2xl mt-[40px] font-semibold'>
                Your username: {userInfo.username}
              </div>
          }
        </div>
      </div>
    </div>
  )
}
