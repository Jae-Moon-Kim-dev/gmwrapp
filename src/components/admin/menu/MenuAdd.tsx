import React, { ReactNode, useEffect } from 'react';
import * as S from '@/styles/admin/menu/AdminMenu.styled';
import { Controller, useForm, useFormContext, useWatch } from 'react-hook-form';
import CommonSelect from '@/components/common/Select';
import { ISelectData } from '@/app/types/common/select';
import { fetchMenuTypeData, fetchVisibleData } from '@/app/api/admin/menu';
import { useQueryResult } from '@/hooks/useQueryResult';
import { MenuItem } from '@/app/types/admin/menu/menu';


const MenuAdd = ({items}: {items: MenuItem[] | undefined}):ReactNode => {
    const { data: visibleData } = useQueryResult<ISelectData[]>(['adminMenuVisibleData'], fetchVisibleData);
    const { data: menuTypeData } = useQueryResult<ISelectData[]>(['adminMenuMenuTypeData'], fetchMenuTypeData);

    const { control, setValue, getValues, reset } = useFormContext();

    const menu_type = useWatch({
        control,
        name: 'menu_type',
    });

    const topMenus = () => {
        return items?.filter(item => item.parentId === null || item.parentId === '').map(item => {
            return {
                label: item.label,
                value: item.id,
            }
        });
    }

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
                    handleChange={(e: ISelectData) => {
                        onChange(e);
                        setValue("menu_type", e.value);
                    }} 
                    /> 
                )}
                />
            </S.Cont>
            </div>
            {menu_type === 'page' &&
                <div className="row" >
                    <S.Tit className='col-2'>
                        <label htmlFor="menu_type" className="compulsory">상위 메뉴</label>
                    </S.Tit>
                    <S.Cont className='col-10'>
                        <Controller
                        name='parent_menu_id'
                        control={control}
                        render={({
                            field, 
                            field: {onChange},
                        }) => (
                            <CommonSelect 
                            {...field} 
                            width='150px' 
                            data={(topMenus() as (ISelectData[] | undefined))} 
                            handleChange={(e: ISelectData) => {
                                onChange(e);
                                setValue("parent_menu_id", e.value);
                            }} 
                            /> 
                        )}
                        />
                    </S.Cont>
                </div>
            }
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

export default MenuAdd;