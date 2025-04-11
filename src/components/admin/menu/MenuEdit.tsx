import React, { ReactNode, useEffect } from 'react';
import * as S from '@/styles/admin/menu/AdminMenu.styled';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import CommonSelect from '@/components/common/Select';
import { ISelectData } from '@/app/types/common/select';
import { fetchMenuTypeData, fetchVisibleData } from '@/app/api/admin/menu';
import { useQueryResult } from '@/hooks/useQueryResult';
import { MenuItemApiData } from '@/app/types/admin/menu/menu';


const MenuEdit = ({item}: {item:MenuItemApiData | undefined}):ReactNode => {
    const { data: visibleData } = useQueryResult<ISelectData[]>(['adminMenuVisibleData'], fetchVisibleData);
    const { data: menuTypeData } = useQueryResult<ISelectData[]>(['adminMenuMenuTypeData'], fetchMenuTypeData);

    const { control, setValue } = useFormContext();

    const menu_type = useWatch({
        control,
        name: 'menu_type',
    });

    useEffect(() => {

        if ( item ) {
            setValue("menu_id", item.menu_id ? item.menu_id.toString() : '');
            setValue("parent_menu_id", item.parent_menu_id ? item.parent_menu_id.toString() : '');
            setValue("menu_name", item.menu_name ? item.menu_name : '');
            setValue("menu_url", item.menu_url ? item.menu_url : '');
            setValue("menu_type", item.menu_type ? item.menu_type : '');
            setValue("visible_yn", item.visible_yn ? item.visible_yn : 'Y');
        }
    }, [item]);

    return <>
        <S.LayoutTbl>
            <div className="row" >
            <S.Tit className='col-2'>
                <label htmlFor="menu_type" className="compulsory">메뉴 종류</label>
            </S.Tit>
            <S.Cont className='col-10'>
                <Controller
                name='menu_type'
                control={control}
                // rules={{ 
                //   required: "이름 입력하세요.",
                //   maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                // }}
                render={({
                    field, 
                    field: {onChange},
                }) => (
                    <CommonSelect 
                    {...field} 
                    width='150px' 
                    data={(menuTypeData as (ISelectData[] | undefined))} 
                    isDisabled={item?.parent_menu_id === null} 
                    handleChange={(e: ISelectData) => {
                        onChange(e);
                        setValue("menu_type", e.value);
                    }} 
                    /> 
                )}
                />
            </S.Cont>
            </div>
            <div className="row" >
            <S.Tit className='col-2'>
                <label htmlFor="menu_name" className="compulsory">이름</label>
            </S.Tit>
            <S.Cont className='col-10'>
                <Controller
                name='menu_name'
                control={control}
                rules={{ 
                    required: "이름 입력하세요.",
                    maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                }}
                render={({
                    field: {value, ref, onChange},
                }) => (
                    <>
                    <S.InputJo
                        ref={ref}
                        value={value}
                        type="text" 
                        id="menu_name"
                        alt="이름"
                        onChange={onChange}
                    />
                    </>
                )}
                />
            </S.Cont>
            </div>
            <div className="row" >
            <S.Tit className='col-2'>
                <label htmlFor="menu_url" className="compulsory">URL</label>
            </S.Tit>
            <S.Cont className='col-10'>
                <Controller
                name='menu_url'
                control={control}
                rules={{ 
                    required: "URL을 입력하세요.",
                    maxLength: { value: 100, message: "최대 100글자 이하로 입력해 주세요." }
                }}
                render={({
                    field: {value, ref, onChange},
                }) => (
                    <>
                    <S.InputJo
                        ref={ref}
                        value={value}
                        type="text" 
                        id="menu_url"
                        alt="이름"
                        onChange={onChange}
                    />
                    </>
                )}
                />
            </S.Cont>
            </div>
            { menu_type === 'page' && 
            <div className="row" >
                <S.Tit className='col-2'>
                <label htmlFor="visible_yn" className="compulsory">공개</label>
                </S.Tit>
                <S.Cont className='col-10'>
                <Controller
                    name='visible_yn'
                    control={control}
                    // rules={{ 
                    //   required: "이름 입력하세요.",
                    //   maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
                    // }}
                    render={({
                    field, 
                    field: {onChange},
                    }) => (
                    <CommonSelect {...field} width='100px' data={visibleData && (visibleData as (ISelectData[] | undefined))} handleChange={(e: ISelectData) => {
                        onChange(e);
                        setValue("visible_yn", e.value);
                    }} /> 
                    // setSelectValue={setInfoMonth2}
                    // data={monthData()}
                    )}
                />
                </S.Cont>
            </div>
            } 
        </S.LayoutTbl>
    </>;
}

export default MenuEdit;