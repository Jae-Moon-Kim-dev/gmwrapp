"use client"

import { ISelectData } from "@/app/types/common/select";
import React, { ReactNode } from "react";
import { StylesConfig } from "react-select";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CommonSelect = ({
    data,
    width = '200px',
    setSelectValue,
    handleChange,
    value,
    isDisabled, 
}:{
    data?: ISelectData[],
    width?: string,
    setSelectValue?: React.Dispatch<React.SetStateAction<ISelectData>> | undefined,
    handleChange?: ((e:ISelectData) => void) | undefined,
    value?: string,
    isDisabled?: boolean
}):ReactNode => {
    const customStyles: StylesConfig = {
        control: (provided) => ({
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

    const onChange = (e: unknown) => {
        if (setSelectValue) setSelectValue(e as ISelectData);
        if (handleChange) handleChange(e as ISelectData);
    }

    return <Select
        options={data}
        onChange={onChange}
        styles={customStyles}
        defaultValue={data && data[0]}
        isDisabled={isDisabled}
        value={data && data.find((a) => (a.value === value))}
    />;
}

export default CommonSelect;