"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SearchIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  PlusIcon,
  FilterIcon,
} from "lucide-react"

const invoices = [
  {
    id: "INV-001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
    date: "2025-02-15",
  },
  {
    id: "INV-002",
    status: "Pending",
    method: "PayPal",
    amount: "$150.00",
    date: "2025-02-14",
  },
  {
    id: "INV-003",
    status: "Paid",
    method: "Bank Transfer",
    amount: "$350.00",
    date: "2025-02-13",
  },
  {
    id: "INV-004",
    status: "Unpaid",
    method: "Credit Card",
    amount: "$450.00",
    date: "2025-02-12",
  },
  {
    id: "INV-005",
    status: "Paid",
    method: "PayPal",
    amount: "$550.00",
    date: "2025-02-11",
  },
  {
    id: "INV-006",
    status: "Pending",
    method: "Bank Transfer",
    amount: "$200.00",
    date: "2025-02-10",
  },
]

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Paid"
      ? "mint"
      : status === "Pending"
        ? "lemon"
        : "pink"
  return <Badge variant={variant as "mint" | "lemon" | "pink"}>{status}</Badge>
}

export function DataTableBlock() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Invoices</CardTitle>
            <CardDescription>
              Manage your recent invoices and payments.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <DownloadIcon className="size-3.5" />
              Export
            </Button>
            <Button size="sm" variant="blue">
              <PlusIcon className="size-3.5" />
              New Invoice
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Input placeholder="Search invoices..." leadingIcon={<SearchIcon />} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <FilterIcon className="size-3.5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Unpaid</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Method</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-semibold">{inv.id}</TableCell>
                <TableCell>
                  <StatusBadge status={inv.status} />
                </TableCell>
                <TableCell className="hidden text-y2k-ink/70 sm:table-cell">
                  {inv.method}
                </TableCell>
                <TableCell className="hidden text-y2k-ink/70 md:table-cell">
                  {inv.date}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {inv.amount}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="size-7 p-0">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                      <DropdownMenuItem>Send reminder</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}
