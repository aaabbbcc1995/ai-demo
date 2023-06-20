"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import DialogCpn from "@/components/dialog";
import { useState } from "react";

export default function IndexPage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-[#afafaf]">
      <div
        className='flex h-[50vh] min-h-[500px] w-[60vw] min-w-[650px] flex-col items-center justify-center rounded-[30px] bg-[white] shadow-2xl'>
        <div className='mb-[5vh] text-[40px] font-bold text-[#afafaf]'>
          Welcome to the Gopher AI!
        </div>
        <Avatar className='h-[100px] w-[100px]'>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
          <AvatarFallback>^_^</AvatarFallback>
        </Avatar>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='mt-[7vh] bg-[#afafaf]'>
              Sign in with Google
            </Button>
          </DialogTrigger>
          <DialogCpn setOpen={setOpen} open={open}/>
        </Dialog>
      </div>
    </div>
  )
}
