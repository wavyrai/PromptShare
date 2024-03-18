'use client'
import { toast } from 'sonner'
import { Button } from "@/components/ui/button"
import React, { useEffect, useState, useRef } from 'react'
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LuCopy, LuArrowUpRight } from 'react-icons/lu'
import { ComboboxPopover } from '@/components/combobox'
import { useForm } from "react-hook-form"
import { useQueryState } from 'nuqs'
import {
  rolePresets,
  tasksPresets,
  outputPresets,
  fullPromptPresets
} from '@/components/presets'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Novatrix } from "uvcanvas"
import  LogoImage from "@/components/logoImage"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'

export default function Home() {
  const [fullStr, setFullStr] = useState('')
  const [role, setRole] = useQueryState('role')
  const [needs, setNeeds] = useQueryState('needs')
  const [tasks, setTasks] = useQueryState('tasks')
  const [process, setProcess] = useQueryState('process')
  const [exclusions, setExclusions] = useQueryState('exclusions')
  const [format, setFormat] = useQueryState('format')
  const [example, setExample] = useQueryState('example') 
  
  const form = useForm({defaultValues: {
    role: role,
    needs: needs,
    tasks: tasks,
    process: process,
    exclusions: exclusions,
    format: format,
    example: example,
  }})

  useEffect(() => { 
    console.log('logging data from use effect:')
    updateOutput({role, needs, tasks, process, exclusions, format, example})
  }, [role, needs, tasks, process, exclusions, format, example])

  const handlePresetSelect = (presetIdStr) => {
    const presetId = parseInt(presetIdStr, 10);
    const selectedPreset = fullPromptPresets.find(p => p.id === presetId);
    if (selectedPreset) {
      Object.keys(selectedPreset).forEach(key => {
        form.setValue(key, selectedPreset[key]);
        setOpen(false);
      });

    }
  };

  const [open, setOpen] = React.useState(false)
 
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])


  const updateOutput = (data) => {
    const promptText = `${data.role ? 'Act like a '+data.role+',' : ''}
      ${data.needs ? 'I need a '+data.needs+',' : ''}
      ${data.tasks ? 'you will '+data.tasks+',' : ''}
      ${data.process ? 'in the process, you should '+data.process+',' : ''}
      ${data.exclusions ? 'please '+data.exclusions+',' : ''}
      ${data.format ? 'output the final result in '+data.format+',' : ''}
      ${data.example ? 'here is an example: '+data.example+',' : ''}`;
    setFullStr(promptText)
  }

  const cardRef = useRef(null); // Ref for the card
  const [novatrixHeight, setNovatrixHeight] = useState('auto');


  useEffect(() => {
    if (cardRef.current) {
      // Set Novatrix height based on the card's current height
      setNovatrixHeight(`${cardRef.current.offsetHeight}px`);
    }
  }, [fullStr]); //

  form.watch((data, {}) => {
    console.log('logging data from form watch:') 
    console.log(data)
    updateOutput(data)
  })

  return (
    <div className='overflow-hidden'>
      <main className={'min-h-screen overflow-hidden mx-auto'}>
      <div className = "z-50 w-full">
        <div className="flex justify-between gap-4 mx-auto border border-gray-200 dark:border-dark-800/70 px-4 py-2 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 z-50">
        
        <div className="flex py-1.5 px-1 items-center justify-between">
        <div className={'flex items-center space-x-2'}>
            <Image src='/images/wavyr-logo.svg' height={25} width={25} alt="Wavyr Logo" />
            <h1 className="font-semibold text-md leading-7 text-black">SaaS Prompt Builder</h1>
          </div>
          </div>

          <div className={'flex flex-1 items-center justify-end space-x-4'}>
            <Button
            variant="outline"
            className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-2 py-2 relative h-10 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
            onClick={() => setOpen(true)}
          >
            <span className="hidden lg:inline">Search library...</span>
            <span className="inline lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-2 top-1.3 h-7 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <Link
          variant="outline"
          className="p-1"
          href="https://github.com/wavyrai/PromptShare">

            <div style={{ color: 'black' }}>
              <div className="h-4 w-4 ">
              <svg viewBox="0 0 438.549 438.549" >
                <path
                  fill="currentColor"
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                ></path>
              </svg>
              </div>
              </div>
          
          </Link>
          </div>
         
        </div>
        </div> 
    <div className="max-w-7xl grid grid-cols-2 gap-x-8 content-start mx-auto pt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >

        <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Search in library..." />
              <CommandList>
                {fullPromptPresets.length === 0 && <CommandEmpty>No prompts found.</CommandEmpty>}
                <CommandGroup heading="Library">
                  {fullPromptPresets.map((preset) => (
                   <CommandItem
                   key={preset.id}
                   onSelect={() => handlePresetSelect(preset.id.toString())}
                 >
                   {preset.title}
                 </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          <Form {...form} >
            <form onSubmit={(e) => { e.preventDefault() }} className="mt-4 space-y-4">
               <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">Act like a..</FormLabel>
                    <FormControl className="col-span-7">
                      <Input
                        className="text-black"
                        type="text"
                        placeholder="Frontend Engineer"
                        autoComplete="off"
                        {...form.register("role")}
                      />
                    </FormControl>
                    <ComboboxPopover
                      className="col-span-1"
                      presets={rolePresets}
                      onSelect={(v) => {form.setValue('role', v)}} 
                    />
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="needs"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 gap-x-2">
                    <FormLabel className="text-black col-span-8">I need a..</FormLabel>
                    <FormControl className="col-span-8">
                      <Input
                        className="text-black"
                        type="text"
                        placeholder="Landing page"
                        autoComplete="off"
                        {...form.register("needs")}
                      />
                    </FormControl>
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tasks"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">You will..</FormLabel>
                    <FormControl className="col-span-7">
                      <Textarea
                        className="text-black"
                        placeholder="Give me a structured layout"
                        autoComplete="off"
                        {...form.register("tasks")}
                      />
                    </FormControl>
                    <ComboboxPopover
                      className="col-span-1"
                      presets={tasksPresets}
                      onSelect={(v) => {form.setValue('tasks', v)}} 
                    />
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="process"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">In the process, you should..</FormLabel>
                    <FormControl className="col-span-8">
                      <Textarea
                        className="text-black"
                        placeholder="Make sure the styling, structure and components are all in place"
                        autoComplete="off"
                        {...form.register("process")}
                      />
                    </FormControl>
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exclusions"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">Please</FormLabel>
                    <FormControl className="col-span-8">
                      <Textarea
                        className="text-black"
                        placeholder="Do not leave comments in the code"
                        autoComplete="off"
                        {...form.register("exclusions")}
                      />
                    </FormControl>
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">Ouput the final result as...</FormLabel>
                    <FormControl className="col-span-7">
                      <Input
                        className="text-black"
                        type="text"
                        placeholder="HTML"
                        autoComplete="off"
                        {...form.register("format")}
                      />
                    </FormControl>
                    <ComboboxPopover
                      className="col-span-1"
                      presets={outputPresets}
                      onSelect={(v) => {form.setValue('format', v)}} 
                    />
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="example"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-8 gap-x-2">
                    <FormLabel className="text-black col-span-8">Here is an example</FormLabel>
                    <FormControl className="col-span-8">
                      <Textarea
                        className="text-black"
                        type="text"
                        placeholder="Design a landing page for a revolutionary SaaS product"
                        autoComplete="off"
                        {...form.register("example")}
                      />
                    </FormControl>
                    <FormMessage className="col-span-8" />
                  </FormItem>
                )}
              />
              <Button
                variant="outline" // Make sure this is a button, not a submit
                onClick={() => form.reset()} // Reset form fields to initial values
                className="p-4"
                href="http://localhost:3000"
              >
                Reset
              </Button>
            </form>
          </Form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        ><Card className="relative overflow-hidden rounded-md h-full" ref={cardRef}>
        <Novatrix className="absolute inset-0 z-0 h-full rounded-md"/>
          <div className="z-10 backdrop-blur-md rounded-md h-full bg-white/50">
          <CardHeader>
          <CardTitle className="text-sm"><span className="shadow-card-rest p-1 bg-white dark:bg-slate-800 text-black dark:text-white h-8 px-4 font-medium rounded-full">Output</span><CopyToClipboard
              text={fullStr}
              onCopy={() => toast.success('Copied to clipboard')}
            >
              <div className='cursor-pointer p-2 rounded-md bg-white/5 hover:bg-white/20 duration-500 transition-all absolute top-5 right-4'>
                <LuCopy className="w-4 h-4 text-black" />
              </div>
            </CopyToClipboard></CardTitle>
          </CardHeader>
          <CardContent>
          
     
          <div
            className="relative mt-2 bg-white/5 rounded-xl p-8 w-full text-black"
          >
            {fullStr}
          
          </div>
          <CopyToClipboard
            text={encodeURI(`https://prompt.wavyr.com/?role=${form.watch('role') || ''}&needs=${form.watch('needs') || ''}&tasks=${form.watch('tasks') || ''}&process=${form.watch('process') || ''}&exclusions=${form.watch('exclusions') || ''}&format=${form.watch('format') || ''}&example=${form.watch('example') || ''}`)}
            onCopy={() => toast.success('Copied to clipboard')}
          >
                <Button
                  className={
                    'border-2 font-semibold py-2 px-4 shadow-md focus:outline-none focus:ring ' +
                    'bg-gradient-to-b from-gray-700 to-black border-black text-white hover:from-gray-600 hover:to-gray-800 ' +
                    'dark:bg-gradient-to-b dark:from-gray-700 dark:to-black dark:border-gray-800 dark:text-white dark:hover:from-gray-600 dark:hover:to-gray-800 ' +
                    'group relative z-10 mt-5 ' +
                    'absolute bottom-0 left-4 right-4 mb-4 mx-auto' // Added styles for absolute positioning
                  }
                  variant={'custom'}
                  size={'md'}
                >
           <span className={'flex items-center space-x-2'}>
        <span className="font-semibold">Share your prompt</span>
      </span>
      <span className={'absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-sky-400/0 via-sky-300/90 to-sky-400/0 transition-opacity duration-500 group-hover:opacity-40'}>
      </span>
            </Button>
          </CopyToClipboard>
          </CardContent>
          </div>
          </Card>
        </motion.div>
        </div>
      </main>
      <div className='absolute bottom-4 px-3 py-3  text-white text-xs font-medium right-4 bg-gray-900 backdrop-blur-md rounded-md'>
      <div className='flex items-center space-x-1'>
        <div >
          <LogoImage className="h-8 w-8"></LogoImage>
        </div>
        <div>
          <a href="https://getaprototype.com" className='cursor-pointer duration-300 transition-all text-white hover:text-blue-500'>
            <p>Generated with</p>
            <p> Wavyr Prototyper</p>
          </a>
        </div>
      </div>
      </div>
    </div>
  )
}