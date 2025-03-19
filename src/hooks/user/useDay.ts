"use client"

import { ISelectData } from '@/app/types/common/select';
import { IDate, initDay } from '@/app/types/user/user';
import dayjs from 'dayjs';
import { useState, useEffect, useCallback } from 'react';

const useDay = (data: IDate):ISelectData[] => {
    const [days, setDays] = useState<ISelectData[]>(initDay);

    const dayData = useCallback(() => {
        const selectDate = dayjs(`${data.year}-${data.month}-01`);
        const lastDay = selectDate.daysInMonth();
        let tempDays:ISelectData[] = initDay;

        for ( let i=1; i <= lastDay; i++ ) {
            tempDays = [
                ...tempDays,
                { label: `${i}`, value: `${i}` },
            ];
        }
        
        setDays(tempDays);
    }, [data.year, data.month]);
    
    useEffect(() => {
        if (data.month) dayData();
    }, [data.year, data.month]);

    return days;
};

export default useDay;
