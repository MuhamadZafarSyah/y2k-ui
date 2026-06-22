"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BarChart, LineChart, DonutChart } from "@/components/ui/chart"
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonButton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toggle, ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import {
  SearchIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  HeartIcon,
  StarIcon,
  SendIcon,
  SettingsIcon,
  UserIcon,
  LogOutIcon,
  HelpCircleIcon,
  CreditCardIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
} from "@/components/ui/scroll-area"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ToggleGroup as ToggleGroupPrimitive, ToggleGroupItem as ToggleGroupItemPrimitive } from "@/components/ui/toggle-group"

import { Label } from "@/components/ui/label"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Spinner } from "@/components/ui/spinner"
import { Kbd } from "@/components/ui/kbd"
import { NativeSelect } from "@/components/ui/native-select"
import { InputGroup } from "@/components/ui/input-group"
import { Empty } from "@/components/ui/empty"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Form, FormField, FormLabel, FormControl, FormMessage, FormSubmit } from "@/components/ui/form"
import {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxPopup,
  ComboboxItem,
} from "@/components/ui/combobox"
import { DirectionProvider } from "@/components/ui/direction"
import { Item, ItemLabel, ItemIndicator } from "@/components/ui/item"
import { DatePicker, DatePickerTrigger, DatePickerContent } from "@/components/ui/date-picker"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function CardDefaultDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-[#1b1b3a]/80">
          You have 3 unread messages from the Y2K support crew.
        </p>
        <div className="flex gap-1.5">
          <Badge variant="blue">new</Badge>
          <Badge variant="pink">v0.2</Badge>
          <Badge variant="mint">beta</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-[#1b1b3a]/70">Last seen 2h ago</span>
        <Button size="sm" variant="lemon">Open</Button>
      </CardFooter>
    </Card>
  )
}

export function BadgeColorsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">default</Badge>
      <Badge variant="blue">blue</Badge>
      <Badge variant="pink">pink</Badge>
      <Badge variant="lilac">lilac</Badge>
      <Badge variant="mint">mint</Badge>
      <Badge variant="lemon">lemon</Badge>
      <Badge variant="outline">outline</Badge>
    </div>
  )
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="blue">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>kawaii tip ✨</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="mint">Save</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your work (Ctrl+S)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function SwitchDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <div className="flex w-72 flex-col gap-3">
      <label className="flex items-center justify-between gap-4 text-sm text-[#1b1b3a]">
        <span>Wi-Fi</span>
        <Switch checked={a} onCheckedChange={setA} />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm text-[#1b1b3a]">
        <span>Notifications</span>
        <Switch checked={b} onCheckedChange={setB} />
      </label>
    </div>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <label className="text-xs font-semibold text-[#1b1b3a]">Username</label>
        <Input defaultValue="kawaii_user" />
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <label className="text-xs font-semibold text-[#1b1b3a]">New password</label>
        <Input type="password" placeholder="••••••••" />
      </TabsContent>
      <TabsContent value="settings" className="text-[#1b1b3a]/80">
        <p>Settings panel placeholder.</p>
      </TabsContent>
    </Tabs>
  )
}

export function InputBasicDemo() {
  return (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Default text input" />
      <Input type="email" placeholder="you@y2k.ui" leadingIcon={<MailIcon />} />
    </div>
  )
}

export function InputIconsDemo() {
  const [show, setShow] = React.useState(false)
  return (
    <div className="flex w-80 flex-col gap-3">
      <Input placeholder="Search the docs…" leadingIcon={<SearchIcon />} />
      <Input
        type={show ? "text" : "password"}
        placeholder="Password"
        leadingIcon={<MailIcon />}
        trailingIcon={
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="inline-flex"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        }
      />
      <Input placeholder="Add a tag" trailingIcon={<PlusIcon />} />
    </div>
  )
}

export function InputPrefixSuffixDemo() {
  const [price, setPrice] = React.useState(150000)
  return (
    <div className="flex w-80 flex-col gap-3">
      <Input
        type="number"
        prefix="Rp"
        suffix="IDR"
        placeholder="0"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value || 0))}
        leadingIcon={<DownloadIcon />}
      />
      <Input type="number" prefix="$" suffix="USD" placeholder="0" />
      <Input type="number" suffix="kg" placeholder="0" />
      <Input type="text" prefix="@" placeholder="username" />
    </div>
  )
}

export function ButtonBasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="pink">Pink</Button>
      <Button variant="mint">Mint</Button>
      <Button variant="lemon">Lemon</Button>
      <Button variant="blue">Blue</Button>
      <Button variant="lilac">Lilac</Button>
    </div>
  )
}

export function ButtonIconsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="mint" leadingIcon={<PlusIcon />}>New file</Button>
      <Button variant="blue" trailingIcon={<ArrowRightIcon />}>Continue</Button>
      <Button variant="pink" leadingIcon={<HeartIcon />}>Like</Button>
      <Button variant="lemon" trailingIcon={<StarIcon />}>Star</Button>
      <Button variant="outline" leadingIcon={<DownloadIcon />}>Download</Button>
      <Button variant="ghost" leadingIcon={<SendIcon />}>Send</Button>
    </div>
  )
}

export function ButtonLoaderDemo() {
  const [loading, setLoading] = React.useState(false)
  const trigger = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading={loading} onClick={trigger} leadingIcon={<CheckIcon />}>
        Save changes
      </Button>
      <Button
        loading={loading}
        loadingText="Saving…"
        onClick={trigger}
        variant="mint"
      >
        Save
      </Button>
      <Button
        loading={loading}
        loadingText="Uploading"
        onClick={trigger}
        variant="blue"
        trailingIcon={<DownloadIcon />}
      >
        Upload
      </Button>
    </div>
  )
}

export function AlertDemo() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use this alert to share a quick info message.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes were saved successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Careful</AlertTitle>
        <AlertDescription>You have unsaved changes.</AlertDescription>
      </Alert>
    </div>
  )
}

export function CheckboxDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  const [c, setC] = React.useState(true)
  return (
    <div className="flex flex-col gap-3 text-sm text-[#1b1b3a]">
      <label className="flex items-center gap-2">
        <Checkbox checked={a} onCheckedChange={(v) => setA(!!v)} />
        Accept terms & conditions
      </label>
      <label className="flex items-center gap-2">
        <Checkbox checked={b} onCheckedChange={(v) => setB(!!v)} />
        Subscribe to newsletter
      </label>
      <label className="flex items-center gap-2 opacity-50">
        <Checkbox checked={c} disabled />
        Disabled option
      </label>
    </div>
  )
}

export function AvatarDemo() {
  return (
    <div className="flex items-end gap-3">
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback className="bg-[#ff8fcf]">XL</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback className="bg-[#ffe45e]">YL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#ff8fcf]">KA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#8ff0d0]">MI</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#b69cff]">+5</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}

export function ProgressDemo() {
  const [value, setValue] = React.useState(33)
  React.useEffect(() => {
    const t = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 1))
    }, 80)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="w-80 space-y-4">
      <Progress value={value} />
      <Progress label="Loading assets" showValue value={value} />
      <Progress
        label="Upload progress"
        showValue
        trailingLabel="24 / 36 MB"
        value={66}
        indicatorClassName="bg-[#8ff0d0]"
      />
    </div>
  )
}

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Pick a flavor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
        <SelectItem value="lemon">Lemon</SelectItem>
        <SelectItem value="mint">Mint</SelectItem>
        <SelectItem value="lychee">Lychee</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-80 rounded-md border-2 border-[#1b1b3a] bg-white"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is y2k-ui?</AccordionTrigger>
        <AccordionContent>
          A modern Y2K / kawaii-retro component library for React. Flat windows,
          thick navy outlines, pastel fills. No glassmorphism, no Win98 bevel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Run <code className="rounded bg-[#d7dde8] px-1">npx y2k-ui-lib@latest init</code>
          then add components with{" "}
          <code className="rounded bg-[#d7dde8] px-1">npx y2kui add &lt;name&gt;</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. Built on Radix primitives, so keyboard navigation, focus
          management, and ARIA roles are inherited out of the box.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function PopoverDemo() {
  return (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="blue">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the size of the component you&apos;re previewing.
            </PopoverDescription>
          </PopoverHeader>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <Button size="sm" variant="lemon">SM</Button>
            <Button size="sm" variant="pink">MD</Button>
            <Button size="sm" variant="mint">LG</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="lemon" className="grid gap-2 text-sm text-[#1b1b3a]">
      <label className="flex items-center gap-2">
        <RadioGroupItem value="blueberry" />
        Blueberry
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="lemon" />
        Lemon
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="strawberry" />
        Strawberry
      </label>
    </RadioGroup>
  )
}

export function SliderDemo() {
  return (
    <Slider value={[42]} onValueChange={() => { }} className="w-72" />
  )
}

export function SliderWithLabelDemo() {
  const [v, setV] = React.useState([42])
  return (
    <div className="flex w-72 flex-col gap-4">
      <Slider
        label="Volume"
        showValue
        trailingLabel="dB"
        value={v}
        onValueChange={(x) => setV(x as number[])}
        min={0}
        max={100}
      />
      <Slider
        label="Sweetness"
        showValue
        value={[30, 70]}
        min={0}
        max={100}
        step={5}
        variant="pink"
      />
    </div>
  )
}

export function TextareaDemo() {
  return (
    <Textarea
      className="w-80"
      placeholder="Tell us about your project…"
      rows={4}
    />
  )
}

export function SeparatorDemo() {
  return (
    <div className="flex w-72 flex-col items-stretch gap-2 text-xs font-semibold text-[#1b1b3a]">
      <span>Light</span>
      <Separator variant="default" />
      <span>Bold</span>
      <Separator variant="pink" />
      <span>Cute</span>
    </div>
  )
}

export function AccordionPastelDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="one"
      variant="mint"
      className="w-80"
    >
      <AccordionItem value="one">
        <AccordionTrigger>Mint shell</AccordionTrigger>
        <AccordionContent>
          Use variants to tint the outer panel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>
          Content keeps a clean white reading surface.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function RadioGroupColorsDemo() {
  return (
    <RadioGroup
      defaultValue="lilac"
      className="grid grid-cols-2 gap-3 text-sm text-[#1b1b3a]"
    >
      <label className="flex items-center gap-2">
        <RadioGroupItem value="blue" variant="blue" />
        Blue
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="pink" variant="pink" />
        Pink
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="mint" variant="mint" />
        Mint
      </label>
      <label className="flex items-center gap-2">
        <RadioGroupItem value="lilac" variant="lilac" />
        Lilac
      </label>
    </RadioGroup>
  )
}

export function SliderPinkDemo() {
  return (
    <Slider variant="pink" defaultValue={[28]} className="w-72" />
  )
}

export function SliderRangeDemo() {
  return (
    <Slider
      variant="mint"
      defaultValue={[20, 75]}
      min={0}
      max={100}
      step={5}
      className="w-72"
    />
  )
}

export function TextareaPastelDemo() {
  return (
    <Textarea
      variant="pink"
      placeholder="Pink textarea"
      rows={3}
      className="w-80"
    />
  )
}

export function TextareaDisabledDemo() {
  return (
    <Textarea
      placeholder="Disabled"
      rows={3}
      className="w-80"
      disabled
    />
  )
}

export function SeparatorVerticalDemo() {
  return (
    <div className="flex h-32 w-72 items-stretch gap-3 rounded-md border-2 border-[#1b1b3a] bg-white px-3 py-2 text-sm text-[#1b1b3a]">
      <span className="self-center">Pixel</span>
      <Separator orientation="vertical" variant="pink" />
      <span className="self-center">Pastel</span>
      <Separator orientation="vertical" variant="mint" />
      <span className="self-center">Retro</span>
    </div>
  )
}

export function SeparatorColorsDemo() {
  return (
    <div className="flex w-72 flex-col items-stretch gap-2 text-xs font-semibold text-[#1b1b3a]">
      <span>Default ink</span>
      <Separator variant="default" />
      <span>Blue</span>
      <Separator variant="blue" />
      <span>Pink</span>
      <Separator variant="pink" />
      <span>Mint</span>
      <Separator variant="mint" />
      <span>Lemon</span>
      <Separator variant="lemon" />
    </div>
  )
}

/* ─── Chart Demos ─── */

export function BarChartDemo() {
  const data = [
    { label: "Mon", value: 120 },
    { label: "Tue", value: 250 },
    { label: "Wed", value: 180 },
    { label: "Thu", value: 320 },
    { label: "Fri", value: 210 },
  ]
  return <BarChart data={data} className="w-120!" />
}

export function LineChartDemo() {
  const data = [
    { label: "Jan", value: 80 },
    { label: "Feb", value: 195 },
    { label: "Mar", value: 130 },
    { label: "Apr", value: 280 },
    { label: "May", value: 220 },
    { label: "Jun", value: 350 },
  ]
  return <LineChart data={data} className="w-120!" />
}

export function DonutChartDemo() {
  const data = [
    { label: "Blue", value: 450, color: "var(--y2k-blue)" },
    { label: "Pink", value: 280, color: "var(--y2k-pink)" },
    { label: "Mint", value: 180, color: "var(--y2k-mint)" },
    { label: "Lemon", value: 120, color: "var(--y2k-lemon)" },
  ]
  return <DonutChart data={data} className="w-120!" />
}

/* ─── Skeleton Demos ─── */

export function SkeletonDemo() {
  return (
    <div className="w-80 space-y-4">
      <SkeletonCard />
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="flex gap-2">
        <SkeletonButton />
        <SkeletonButton className="w-24" />
      </div>
    </div>
  )
}

/* ─── Table Demo ─── */

export function TableDemo() {
  return (
    <Table className="w-80">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>StarBoy</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>1,250</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MoonChild</TableCell>
          <TableCell>Idle</TableCell>
          <TableCell>890</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SunFlower</TableCell>
          <TableCell>Online</TableCell>
          <TableCell>2,100</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

/* ─── Breadcrumb Demo ─── */

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ─── Toggle Demo ─── */

export function ToggleDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Toggle>Toggle</Toggle>
        <Toggle variant="pink">Pink</Toggle>
        <Toggle variant="mint">Mint</Toggle>
      </div>
      <ToggleGroup type="multiple" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold">B</ToggleGroupItem>
        <ToggleGroupItem value="italic">I</ToggleGroupItem>
        <ToggleGroupItem value="underline">U</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}

/* ─── Dropdown Menu Demo ─── */

export function HoverCardDemo() {
  return (
    <div className="flex gap-3">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="blue">@kawaii_dev</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border-2 border-[#1b1b3a] bg-[#ffe45e] text-sm font-bold text-[#1b1b3a]">
              KD
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-[#1b1b3a]">@kawaii_dev</h4>
              <p className="text-xs text-[#1b1b3a]/70">
                Y2K UI designer &amp; pixel art enthusiast. Building pastel-
                flavoured components since 2025.
              </p>
              <div className="flex gap-2 pt-1">
                <span className="rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] px-1.5 py-0.5 text-[10px] font-semibold text-[#1b1b3a]">
                  design
                </span>
                <span className="rounded border-2 border-[#1b1b3a] bg-[#ff8fcf] px-1.5 py-0.5 text-[10px] font-semibold text-[#1b1b3a]">
                  react
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="cursor-help border-b-2 border-dotted border-[#b69cff] text-sm font-medium text-[#1b1b3a]">
            Y2K
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-64" side="top">
          <p className="font-bold text-[#1b1b3a]">What is Y2K?</p>
          <p className="mt-1 text-xs text-[#1b1b3a]/70">
            A design aesthetic inspired by the late 90s / early 2000s web —
            pastel colours, thick outlines, flat panels, and retro-futuristic
            flair.
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

/* ─── ScrollArea Demo ─── */

const LONG_ITEMS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  label: `Item ${i + 1}`,
  color: [
    "bg-[#8ed1fc]",
    "bg-[#ff8fcf]",
    "bg-[#b69cff]",
    "bg-[#8ff0d0]",
    "bg-[#ffe45e]",
  ][i % 5],
}))

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-60 w-72">
      <ScrollAreaViewport>
        <div className="space-y-1.5 p-3">
          <h4 className="font-heading text-sm font-bold text-[#1b1b3a]">
            Scrollable List
          </h4>
          <p className="text-xs text-[#1b1b3a]/70">
            This panel scrolls — try it out!
          </p>
          <div className="mt-2 space-y-1">
            {LONG_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded border-2 border-[#1b1b3a] ${item.color} px-2.5 py-1.5 text-sm font-semibold text-[#1b1b3a]`}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] bg-white text-[10px] font-bold">
                  {item.id}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </ScrollAreaViewport>
      <Scrollbar orientation="vertical" />
    </ScrollArea>
  )
}

/* ─── Pagination Demo ─── */

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function PaginationEllipsisDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function DropdownMenuDemo() {
  const [bookmarks, setBookmarks] = React.useState<string[]>(["lemon"])
  const [sortBy, setSortBy] = React.useState("name")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="blue">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="size-4" />
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon className="size-4" />
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon className="size-4" />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <HelpCircleIcon className="size-4" />
              Help
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>FAQ</DropdownMenuItem>
                <DropdownMenuItem>Contact support</DropdownMenuItem>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[#1b1b3a]/60">
          Bookmarks
        </DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={bookmarks.includes("lemon")}
          onCheckedChange={(checked) => {
            setBookmarks(
              checked
                ? [...bookmarks, "lemon"]
                : bookmarks.filter((b) => b !== "lemon")
            )
          }}
        >
          Lemon
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={bookmarks.includes("mint")}
          onCheckedChange={(checked) => {
            setBookmarks(
              checked
                ? [...bookmarks, "mint"]
                : bookmarks.filter((b) => b !== "mint")
            )
          }}
        >
          Mint
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={bookmarks.includes("pink")}
          onCheckedChange={(checked) => {
            setBookmarks(
              checked
                ? [...bookmarks, "pink"]
                : bookmarks.filter((b) => b !== "pink")
            )
          }}
        >
          Pink
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[#1b1b3a]/60">
          Sort by
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[#ff8fcf]">
          <LogOutIcon className="size-4" />
          Log out
          <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ─── Sonner Toast Demo ─── */

export function SonnerDemo() {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="lemon"
          onClick={() =>
            toast.success("Changes saved", {
              description: "Your preferences have been updated.",
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="pink"
          onClick={() =>
            toast.error("Connection lost", {
              description: "Check your network and try again.",
            })
          }
        >
          Error toast
        </Button>
        <Button
          variant="blue"
          onClick={() =>
            toast.info("New update", {
              description: "Y2K UI v0.3 is ready to install.",
            })
          }
        >
          Info toast
        </Button>
      </div>
      <Toaster />
    </>
  )
}

/* ─── Sheet Demo ─── */

export function SheetDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="blue">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right" title="settings.sys">
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>
            Adjust your Y2K interface settings.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] px-3 py-2 text-xs font-semibold">
            <span>Sound Effects</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] px-3 py-2 text-xs font-semibold">
            <span>Retro Cursor</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] px-3 py-2 text-xs font-semibold">
            <span>Auto-Update</span>
            <Switch defaultChecked />
          </div>
          <Progress value={68} label="Theme Sync" showValue />
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="lemon" className="flex-1" onClick={() => setOpen(false)}>
            Save
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/* ─── Menubar Demo ─── */

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As… <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
          <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
          <MenubarItem>Copy <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
          <MenubarItem>Paste <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
          <MenubarItem>Zoom Out <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Sidebar <MenubarShortcut>⌘B</MenubarShortcut></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

/* ─── Context Menu Demo ─── */

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-24 w-full cursor-context-menu items-center justify-center rounded border-2 border-dashed border-[#1b1b3a] bg-[#d7dde8]/30 text-xs font-semibold text-[#1b1b3a]/60">
          Right-click anywhere
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem inset={false}>
          <DownloadIcon className="size-3.5" /> Download
        </ContextMenuItem>
        <ContextMenuItem inset={false}>
          <HeartIcon className="size-3.5" /> Add to Favorites
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset={false}>
          <SettingsIcon className="size-3.5" /> Properties
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

/* ─── Toggle Group Demo ─── */

export function ToggleGroupDemo() {
  return (
    <ToggleGroupPrimitive type="single" defaultValue="bold">
      <ToggleGroupItemPrimitive value="bold" size="sm">B</ToggleGroupItemPrimitive>
      <ToggleGroupItemPrimitive value="italic" size="sm"><span className="italic">I</span></ToggleGroupItemPrimitive>
      <ToggleGroupItemPrimitive value="underline" size="sm"><span className="underline">U</span></ToggleGroupItemPrimitive>
      <ToggleGroupItemPrimitive value="strike" size="sm"><span className="line-through">S</span></ToggleGroupItemPrimitive>
    </ToggleGroupPrimitive>
  )
}

/* ─── Collapsible Demo ─── */

export function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show Details</CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-2">
          <p className="text-xs text-[#1b1b3a]/70">
            Y2K UI is a collection of retro-future components built on Radix primitives
            with thick navy outlines, pastel fills, and a whole lot of personality.
          </p>
          <div className="flex gap-1.5">
            <Badge variant="blue" size="sm">v0.2</Badge>
            <Badge variant="pink" size="sm">15+ components</Badge>
            <Badge variant="mint" size="sm">MIT</Badge>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ─── Label Demo ─── */

export function LabelDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="name">Full Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  )
}

/* ─── Spinner Demo ─── */

export function SpinnerDemo() {
  return (
    <div className="flex items-end gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-[10px] font-semibold text-[#1b1b3a]/60">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-[10px] font-semibold text-[#1b1b3a]/60">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-[10px] font-semibold text-[#1b1b3a]/60">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-[10px] font-semibold text-[#1b1b3a]/60">xl</span>
      </div>
    </div>
  )
}

/* ─── KBD Demo ─── */

export function KbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Kbd>⌘K</Kbd>
      <Kbd>Ctrl + S</Kbd>
      <Kbd>⇧⌘P</Kbd>
      <Kbd>⌥⌘I</Kbd>
    </div>
  )
}

/* ─── Native Select Demo ─── */

export function NativeSelectDemo() {
  return (
    <NativeSelect className="w-60">
      <option>Pilih warna</option>
      <option>Blue</option>
      <option>Pink</option>
      <option>Mint</option>
      <option>Lemon</option>
    </NativeSelect>
  )
}

/* ─── Input Group Demo ─── */

export function InputGroupDemo() {
  return (
    <div className="flex flex-col gap-3">
      <InputGroup>
        <Input placeholder="Search…" className="w-48!" wrapperClassName="border-0 rounded-none" />
        <Button size="sm">Go</Button>
      </InputGroup>
    </div>
  )
}

/* ─── Empty Demo ─── */

export function EmptyDemo() {
  return (
    <Empty
      icon={<SearchIcon />}
      title="No results found"
      description="Try adjusting your search terms or filters."
      action={<Button size="sm">Clear filters</Button>}
    />
  )
}

/* ─── Button Group Demo ─── */

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button size="sm">Left</Button>
      <Button size="sm" variant="pink">Center</Button>
      <Button size="sm" variant="mint">Right</Button>
    </ButtonGroup>
  )
}

/* ─── Alert Dialog Demo ─── */

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. All your data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ─── Command Demo ─── */

export function CommandDemo() {
  return (
    <Command className="w-72">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Search</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

/* ─── Navigation Menu Demo ─── */

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-48 gap-1 p-2">
              <NavigationMenuLink href="#">Product A</NavigationMenuLink>
              <NavigationMenuLink href="#">Product B</NavigationMenuLink>
              <NavigationMenuLink href="#">Product C</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-48 gap-1 p-2">
              <NavigationMenuLink href="#">Getting Started</NavigationMenuLink>
              <NavigationMenuLink href="#">Components</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/* ─── Calendar Demo ─── */

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar selected={date} onSelect={setDate} mode="single" />
}

/* ─── Drawer Demo ─── */

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="blue">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Make changes to your profile here.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-3">
          <Label htmlFor="uname">Username</Label>
          <Input id="uname" defaultValue="kawaii_user" />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

/* ─── Input OTP Demo ─── */

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

/* ─── Carousel Demo ─── */

export function CarouselDemo() {
  const items = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"]
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, i) => (
          <CarouselItem key={i}>
            <div className="flex h-32 items-center justify-center rounded border-2 border-[#1b1b3a] bg-white text-sm font-semibold text-[#1b1b3a]">
              {item}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

/* ─── Resizable Demo ─── */

export function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-48 rounded border-2 border-[#1b1b3a]">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm font-semibold text-[#1b1b3a]">Left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center text-sm font-semibold text-[#1b1b3a]">Right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

/* ─── Field Demo ─── */

export function FieldDemo() {
  return (
    <Field className="w-72">
      <FieldLabel htmlFor="email-f">Email</FieldLabel>
      <FieldControl>
        <Input id="email-f" type="email" placeholder="you@example.com" />
      </FieldControl>
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  )
}

/* ─── Form Demo ─── */

/* ─── Combobox Demo ─── */

export function ComboboxDemo() {
  const fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Lemon", "Lychee", "Mango", "Mint", "Orange", "Peach", "Strawberry"]
  return (
    <Combobox defaultValue="apple">
      <ComboboxTrigger className="w-48">
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxPopup>
        {fruits.map((fruit) => (
          <ComboboxItem key={fruit.toLowerCase()} value={fruit.toLowerCase()}>
            {fruit}
          </ComboboxItem>
        ))}
      </ComboboxPopup>
    </Combobox>
  )
}

/* ─── Aspect Ratio Demo ─── */

export function AspectRatioDemo() {
  return (
    <div className="w-72">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] text-sm font-bold text-[#1b1b3a]">
          16:9
        </div>
      </AspectRatio>
    </div>
  )
}

/* ─── Direction Provider Demo ─── */

export function DirectionDemo() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr")
  return (
    <div className="flex flex-col items-center gap-3">
      <DirectionProvider dir={dir}>
        <div className="flex w-64 items-center justify-between rounded border-2 border-[#1b1b3a] bg-white px-3 py-2 text-sm text-[#1b1b3a]">
          <span>{dir === "ltr" ? "←" : "→"}</span>
          <span className="font-semibold">{dir === "ltr" ? "Left to Right" : "Right to Left"}</span>
          <span>{dir === "ltr" ? "→" : "←"}</span>
        </div>
      </DirectionProvider>
      <div className="flex gap-2">
        <Button size="sm" variant={dir === "ltr" ? "lemon" : "outline"} onClick={() => setDir("ltr")}>LTR</Button>
        <Button size="sm" variant={dir === "rtl" ? "lemon" : "outline"} onClick={() => setDir("rtl")}>RTL</Button>
      </div>
    </div>
  )
}

/* ─── Item Demo ─── */



export function ItemDemo() {
  return (
    <div className="w-56 rounded border-2 border-[#1b1b3a] bg-white p-1">
      <Item selected>
        <ItemIndicator><CheckIcon /></ItemIndicator>
        <ItemLabel>Selected item</ItemLabel>
      </Item>
      <Item>
        <ItemIndicator />
        <ItemLabel>Regular item</ItemLabel>
      </Item>
      <Item>
        <ItemIndicator />
        <ItemLabel>Another item</ItemLabel>
      </Item>
      <Item disabled>
        <ItemIndicator />
        <ItemLabel>Disabled item</ItemLabel>
      </Item>
    </div>
  )
}

/* ─── Sidebar Demo ─── */

export function SidebarDemo() {
  return (
    <div className="w-72 overflow-hidden rounded border-2 border-[#1b1b3a]">
      <SidebarProvider defaultOpen>
        <div className="flex h-64">
          <Sidebar collapsible="none">
            <SidebarHeader>
              <SidebarTrigger />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>General</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Analytics</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Reports</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Profile</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Preferences</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <span className="px-2 text-xs font-semibold text-[#1b1b3a]/50">v1.0.0</span>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex items-center justify-center bg-white p-4">
            <p className="text-sm font-semibold text-[#1b1b3a]/60">Main content</p>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export function FormDemo() {
  return (
    <Form className="w-72 space-y-3">
      <FormField name="email" serverInvalid>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" required placeholder="you@example.com" />
        </FormControl>
        <FormMessage>Email is required</FormMessage>
      </FormField>
      <FormSubmit asChild>
        <Button type="submit">Submit</Button>
      </FormSubmit>
    </Form>
  )
}

// ── DatePicker Demo ──────────────────────────────────────────────

export function DatePickerDemo() {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Content />
    </DatePicker>
  )
}

export function DatePickerWithRangeDemo() {
  return (
    <DatePicker>
      <DatePicker.Trigger placeholder="Pick date range" />
      <DatePicker.Content numberOfMonths={2} />
    </DatePicker>
  )
}

export function DatePickerDisabledDemo() {
  return (
    <DatePicker>
      <DatePicker.Trigger />
      <DatePicker.Content disabled={{ before: new Date() }} />
    </DatePicker>
  )
}