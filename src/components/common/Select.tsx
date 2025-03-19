"use client"

import { ISelectData } from "@/app/types/common/select";
import React, { ChangeEvent, ReactNode } from "react";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CommonSelect = ({
    data,
    width = '200px',
    setSelectValue,
    handleChange, 
}:{
    data: ISelectData[],
    width?: string,
    setSelectValue: React.Dispatch<React.SetStateAction<ISelectData>>,
    handleChange?: ((e:ChangeEvent<HTMLInputElement>) => void) | undefined,
}):ReactNode => {
    const customStyles: StylesConfig = {
        control: (provided, state) => ({
          ...provided,
          width,
          backgroundColor: "white",
          boxShadow: "none",
          border: '1px solid #cccccc',
          ":hover": {
            ...provided[":hover"],
            border: '1px solid #cccccc',
          }
        }),
        option:(provided, {isFocused, isSelected}) => ({
            ...provided,
            ":active": {
                ...provided[":active"],
                background: isSelected ? '#E8E8E8' : 'transparent'
            },
            backgroundColor: isFocused ? '#E8E8E8' : 'transparent',
            color: 'hsl(0, 0%, 20%)'
        }),
        menu: (provided) => ({
            ...provided,
            width,
        })
    };

    const onChange = (e: any) => {
        setSelectValue(e);
        if (handleChange) handleChange(e);
    }

    return <Select
        options={data}
        isMulti={false}
        onChange={onChange}
        styles={customStyles}
        defaultValue={data[0]}
    />;
}

export default CommonSelect;