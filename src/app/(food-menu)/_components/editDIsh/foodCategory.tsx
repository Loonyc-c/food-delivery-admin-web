'use client'

import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const FoodCategoryEdit = () => {

  

return(
    <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

    )
}

export default FoodCategoryEdit