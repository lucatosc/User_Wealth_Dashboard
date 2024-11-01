"use client"
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export const Dispatch = (Data: any) => {
    const dispatch = useDispatch();
    dispatch(setUser(Data))
}