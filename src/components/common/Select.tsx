import { SelectData } from "@/app/types/common/select";
import React, { ReactNode } from "react";
import { ActionMeta, SingleValue, StylesConfig } from "react-select";
import Select from "react-select";

const ComSelect = ({
    data,
    width = '200px',
    setSelectValue,
    handleChange, 
}:{
    data: SelectData[],
    width?: string,
    setSelectValue: React.Dispatch<React.SetStateAction<SelectData>>,
    handleChange?: (() => void) | undefined,
}):ReactNode => {
    const customStyles: StylesConfig<SelectData> = {
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
        }),
      };

      const onChange = (e: any) => {
        console.log('ComSelect-handleChange');
        setSelectValue(e);
        if (handleChange) handleChange();
    }

    return <Select
        options={data}
        isMulti={false}
        onChange={onChange}
        styles= {customStyles}
        defaultValue={data[0]}
    />;
}

export default ComSelect;