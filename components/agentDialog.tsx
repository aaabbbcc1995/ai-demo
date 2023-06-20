"use client"
import {DialogContent, DialogFooter} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {agentProps, Status} from "@/app/homepage/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AgentDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAgents: Dispatch<SetStateAction<agentProps[]>>;
  agents: agentProps[];
  open: boolean;
  select: number | undefined;
  setSelect: Dispatch<SetStateAction<number|undefined>>;
}

export default function AgentDialog(props: AgentDialogProps) {
  const {setOpen, open, setAgents, agents, select, setSelect} = props;
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<Status>(Status.Off);
  const [loading, setLoading] = useState<boolean>(false);

  const create = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setAgents([...agents, {id: agents?.length, status: status, name: name}]);
    }, 1000);
  };

  const save = () =>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setAgents(prevAgents => prevAgents.map(agent => {
        if (agent.id + 1 === select ) {
          return {
            ...agent,
            status: status,
            name: name
          };
        }
        return agent;
      }))
    }, 1000);
  }

  useEffect(()=>{
    if(select){
      setName(agents[select-1].name);
      setStatus(agents[select-1].status);
    }
  },[select])

  useEffect(()=>{
    if(!open){
      setName('');
      setStatus(Status.Off);
      setSelect(undefined);
    }
  },[open])

  return (
    <DialogContent className="sm:max-w-[425px]">
      <div className="mt-[20px] grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Agent Name
          </Label>
          <Input id="name" className="col-span-3" placeholder='Enter your agent name' disabled={loading}  value={name}
                 onChange={e => setName(e.target.value)}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Status
          </Label>
          <Select onValueChange={e=>setStatus(e === 'on'? Status.On : Status.Off)} value={status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value={Status.On}>On</SelectItem>
                <SelectItem value={Status.Off}>Off</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={select? save:create} disabled={loading ||  name?.length <=0 || status.length <= 0}>
          {
            loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          }
          {select? 'Save': 'Create'}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
