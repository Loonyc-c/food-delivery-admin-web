"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/provider/UserProvider";
import { getUserOrders } from "../_utils/axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

type OrderType = {
  _id: string;
  status: string;
  totalPrice: number;
  foodOrderItems: FoodOrderItemType[];
  createdAt: string;
  user: UserType;
};

type UserType = {
  address: string;
};

type FoodOrderItemType = {
  food: FoodType;
  _id: string;
  quantity: number;
};

type FoodType = {
  foodName: string;
  image: string;
};

const FoodOrder = () => {
  const { userId, email } = useUser();
  const [order, setOrder] = useState<OrderType[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await getUserOrders(userId);
        setOrder(response?.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [userId]);

  console.log(order);
  return (
    <div className="w-full h-auto cursor-default bg-white rounded-lg mt-6">
      <div className="p-3">
        <h1 className="text-[20px] font-semibold">Orders</h1>
        <p className="text-[12px] text-[#71717A]">{order.length} Items</p>
      </div>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.map((item) => {
            const formattedDate = item.createdAt.split("T")[0];

            return (
              <TableRow key={item._id}>
                <TableCell>{email}</TableCell>
                <TableCell className="flex gap-1 items-center">
                  <div>{item.foodOrderItems.length} Foods</div>
                  <Popover>
                    <PopoverTrigger>
                      <ChevronDown className="w-4" />
                    </PopoverTrigger>
                    <PopoverContent>
                      {item.foodOrderItems &&
                        item.foodOrderItems.map((orderItem) => {
                          let foodName = "Unknown food";
                          if (orderItem.food) {
                            if (typeof orderItem.food === "string") {
                              foodName = orderItem.food;
                            } else if (
                              typeof orderItem.food === "object" &&
                              orderItem.food.foodName
                            ) {
                              foodName = orderItem.food.foodName;
                            }
                          }

                          return (
                            <div
                              key={orderItem._id || Math.random()}
                              className="flex justify-between py-1 items-center rounded-lg cursor-default"
                            >
                              <div className="flex gap-3 items-center rounded-lg">
                                <img
                                  src={orderItem?.food?.image}
                                  className="w-8 h-8 object-cover rounded-md"
                                />
                                <span className="text-[12px] font-semibold">
                                  {foodName}
                                </span>
                              </div>
                              <span className="text-[12px] font-semibold">
                                x{orderItem.quantity}
                              </span>
                            </div>
                          );
                        })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>${item.totalPrice}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="max-w-[250px] overflow-hidden cursor-pointer text-ellipsis whitespace-nowrap text-[12px] text-[#71717A]">
                          {item.user.address}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.user.address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <div className="border rounded-full items-center flex justify-center w-[100px] font-semibold p-1">
                    {item.status}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default FoodOrder;
