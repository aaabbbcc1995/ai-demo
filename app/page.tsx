"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

export default function IndexPage() {

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
      </div>
    </div>
  )
}
