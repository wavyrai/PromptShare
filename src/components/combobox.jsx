"use client"

import React, { useState } from "react"
import { LuFolderOpen } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ComboboxPopover({ presets, className, onSelect }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
        <Button
      variant={'outline'}
      
    >
           
           <span className={'flex items-center space-x-2'}>
        <span className="">Options</span>

      </span>
   
            </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white/30 backdrop-blur-md" side="right" align="start">
          <Command>
            <CommandInput className="!border-0 !ring-0 input-sm h-10" placeholder="Search presets..." />
            <CommandList className="">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {presets.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.label}
                    onSelect={(label) => {
                      onSelect(label) 
                      setOpen(false)
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
