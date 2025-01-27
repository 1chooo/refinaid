import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Github } from "lucide-react"


export function VisitGitHub() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-10 h-10 bg-background"
            variant="outline"
            size="icon"
            onClick={() => window.open('https://github.com/1chooo/refinaid', '_blank')}
          >
            <Github className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Get Source Code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
