"use client"
import {DialogFooter, DialogContent} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import { useState, Dispatch, SetStateAction, useEffect} from "react";
import { useUserInfoContext} from '../app/context/userinfo';
import { useRouter } from 'next/navigation';

interface DialogCpnProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function DialogCpn(props: DialogCpnProps) {
  const {setOpen, open} = props;
  const {userInfo,setUserInfo} = useUserInfoContext();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setUserInfo({ username: name, password: ''});
      router.push('/homepage');
    }, 2000);
  };

  useEffect(()=>{
    if(!open){
      setName('');
      setPassword('');
    }
  },[open])

  return (
    <DialogContent className="sm:max-w-[425px]">
      <div className="mt-[20px] grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Username
          </Label>
          <Input id="name" className="col-span-3" placeholder='Enter your username' disabled={loading}
                 onChange={e => setName(e.target.value)}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Password
          </Label>
          <Input id="username" type='password' className="col-span-3" placeholder='Enter your password' disabled={loading}
                 onChange={e => setPassword(e.target.value)}/>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={login} disabled={loading || name.length <= 0 || password.length <= 0}>
          {
            loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          }
          Login
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
