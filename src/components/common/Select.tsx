import { SelectData } from "@/app/types/common/select";
import React, { ReactNode, useState } from "react";
import { OnChangeValue, StylesConfig } from "react-select";
import Select from "react-select";

const ComSelect = ({
    data, 
}:{
    data: SelectData[],
}):ReactNode => {
    const customStyles: StylesConfig<SelectData> = {
        control: (provided) => ({
          ...provided,
          width: '200px',
          backgroundColor: "white",
          boxShadow: "none",
        }),
        option:(provided, {isFocused, isSelected}) => ({
            ...provided,
            ":active": {
                ...provided[":active"],
                background: isSelected ? '#E8E8E8' : 'transparent'
            },
            backgroundColor: isFocused ? '#E8E8E8' : 'transparent',
            color: isSelected ? 'hsl(0, 0%, 20%)' : 'hsl(0, 0%, 20%)'
        }),
        menu: (provided) => ({
            ...provided,
            width:'200px',
        }),
      };

    const [selectValue, setSelectValue] = useState<SelectData | null>(data[0]);

    const handleChange = (option: OnChangeValue<SelectData, false>) => {
        setSelectValue(option as SelectData);
    }

    return <Select
        options={data}
        isMulti={false}
        onChange={(e:OnChangeValue<SelectData, false>) => handleChange(e)}
        styles= {customStyles}
        defaultValue={data[0]}
    />;
}

export default ComSelect;