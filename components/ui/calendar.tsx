"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-card p-2 [--cell-size:--spacing(8)] rounded-md border-2 border-y2k-ink",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-1 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-1", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between gap-1 px-0.5",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none rounded-[4px]! border-2 border-y2k-ink bg-white text-y2k-ink hover:bg-y2k-mint",
          "aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none rounded-[4px]! border-2 border-y2k-ink bg-white text-y2k-ink hover:bg-y2k-mint",
          "aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-8",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-bold",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-[4px] border-2 border-y2k-ink bg-white",
          "has-focus:border-y2k-pink has-focus:ring-2 has-focus:ring-y2k-pink",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute inset-0 bg-card opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "font-bold text-y2k-ink select-none",
          captionLayout === "label"
            ? "text-sm"
            : "flex h-8 items-center gap-1 rounded-[4px] pr-1 pl-2 text-sm [&>svg]:size-3.5 [&>svg]:text-y2k-ink/60",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex border-b border-y2k-ink/15", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 rounded-md text-[0.7rem] font-bold uppercase text-y2k-ink/50 select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full gap-px", defaultClassNames.week),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.7rem] text-y2k-ink/50 select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative size-(--cell-size) p-0 text-center select-none",
          "[&:first-child[data-selected=true]_button]:rounded-l-[4px]",
          "[&:last-child[data-selected=true]_button]:rounded-r-[4px]",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-[4px]",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-[4px]", defaultClassNames.range_end),
        today: cn(
          "rounded-[4px] border-2 border-y2k-blue bg-y2k-blue/15 text-y2k-ink data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-y2k-ink/35 aria-selected:text-y2k-ink/35",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-y2k-ink/30 opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex size-(--cell-size) items-center justify-center rounded-[4px] p-0 text-sm leading-none font-normal",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-y2k-pink group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-y2k-pink",
        "data-[range-end=true]:rounded-[4px] data-[range-end=true]:rounded-r-[4px] data-[range-end=true]:bg-y2k-pink data-[range-end=true]:text-y2k-ink data-[range-end=true]:font-bold data-[range-end=true]:border-2 data-[range-end=true]:border-y2k-ink",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-y2k-blue/15 data-[range-middle=true]:text-y2k-ink",
        "data-[range-start=true]:rounded-[4px] data-[range-start=true]:rounded-l-[4px] data-[range-start=true]:bg-y2k-pink data-[range-start=true]:text-y2k-ink data-[range-start=true]:font-bold data-[range-start=true]:border-2 data-[range-start=true]:border-y2k-ink",
        "data-[selected-single=true]:rounded-[4px] data-[selected-single=true]:bg-y2k-lemon data-[selected-single=true]:text-y2k-ink data-[selected-single=true]:font-bold data-[selected-single=true]:border-2 data-[selected-single=true]:border-y2k-ink",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton, type CalendarProps }
