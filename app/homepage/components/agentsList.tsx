import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import AgentDialog from "@/components/agentDialog";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Loader2} from "lucide-react";
import {agentProps, Status} from "@/app/homepage/page";
import {Dispatch, SetStateAction} from "react";

interface AgentListProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAgents: Dispatch<SetStateAction<agentProps[]>>;
  agents: agentProps[];
  select: number | undefined;
  setSelect: Dispatch<SetStateAction<number | undefined>>;
  deleteItem: number | undefined;
  clickEdit: (agent: agentProps) => void;
  deleteEvent: (agent: agentProps) => void;
}

export default function AgentList(props: AgentListProps) {
  const {open, setOpen, setAgents, agents, select, setSelect, deleteItem, clickEdit, deleteEvent} = props;

  return (
    <div className='w-[80%]'>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='mt-[20px] mb-[20px] ml-auto'>Add new agent</Button>
        </DialogTrigger>
        <AgentDialog setOpen={setOpen} open={open} setAgents={setAgents} agents={agents} select={select}
                     setSelect={setSelect}/>
      </Dialog>
      {agents.length === 0 ?
        <div className='text-center m-[40px]'>Empty agent list.</div> :
        <Table className='border border-[#afafaf]'>
          <TableCaption>A list of your agents.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                Name
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead className="text-center w-[200px]">
                Modify
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell className="font-medium">
                  {agent.name}
                </TableCell>
                <TableCell className={agent.status === Status.On ? 'text-green-500' : 'text-red-500'}>
                  {agent.status.toUpperCase()}
                </TableCell>
                <TableCell className='flex flex-row justify-evenly'>
                  <Button className='bg-[#afafaf]' onClick={() => clickEdit(agent)}>
                    Edit
                  </Button>
                  <Button className='bg-[red]' onClick={() => deleteEvent(agent)} disabled={deleteItem === agent.id}>
                    {
                      deleteItem === agent.id && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    }
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
    </div>
  )
}
