"use client";
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { handleSelectedMenu } from '@/utils/admin/utils';
import { Button, FloatingLabel, Form, Table } from 'react-bootstrap';
import { RoleData, RoleDatas } from '@/app/types/admin/role';
import { deleteRoleData, fetchRoleListData, insertRoleData, updateRoleData } from '@/app/api/admin/role';
import { useQueryResult } from '@/hooks/useQueryResult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, FieldError, useFieldArray, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Role = () => {
  
  const { data: items } = useQueryResult<RoleData[]>(['adminRoleListData'], useCallback(async () => fetchRoleListData(), [])); 
  const [ showAddForm, setShowAddForm ] = useState<boolean>(false);
  const [ , setRoleList ] = useState<RoleData[]>([]);
  const queryClient = useQueryClient();

  const roleForm = useForm<RoleDatas>({
      defaultValues: {
        roles: [],
    }
    });

  const { control, getValues, reset, clearErrors, trigger , formState: { errors } } = roleForm;    

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "roles",
  });

  const insertRoleMutation = useMutation({
    mutationFn: insertRoleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRoleListData'] });
    }
  });

  const updateRoleMutation = useMutation({
    mutationFn: updateRoleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminRoleListData'] });
    }
  });

  const deleteRoleMutation = useMutation({
      mutationFn: deleteRoleData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['adminRoleListData'] });
      }
    });

  // const handleSaveRole = () => {
  //   const { role_name, description } = getValues();
  //   insertRoleMutation.mutate({
  //     role_name,
  //     description
  //   });
    
  //   setShowAddForm(false);
  //   reset();

  // };

  const handleUpdateRole = async (index: number) => {
    const { roles } = getValues();
    const { role_id, role_name, description } = roles[index];

    clearErrors();
    const isVallid = await trigger();
    if (isVallid) {
      if ( role_name === '운영자' || role_name === '부운영자' ) {
        Swal.fire({
          icon : "error",
          text: "등급을 '운영자','부운영자'로 설정할 수 없습니다.",
          showCloseButton: true
        });
      }
  
      if ( role_id ) {
        updateRoleMutation.mutate({
          role_id,
          role_name,
          description
        });
      } else {
        insertRoleMutation.mutate({
          role_name,
          description
        });
      }
    }
  }

  const addRole = () => {
    setShowAddForm(!showAddForm);
    if ( showAddForm ) remove(0);
    else {
      prepend({
        role_name: '', 
        description: '', 
        isModify: true,
        edit_yn: 'Y',
      }, {shouldFocus: true});
    }
  };

  const handleDelRole = (index: number) => {
    const { roles } = getValues();
    const { role_id } = roles[index];

    if(role_id) deleteRoleMutation.mutate(role_id);
    remove(index);
  };

  const handleCancel = (index: number, modify: boolean) => {
    const { roles } = getValues();
    const { role_id } = roles[index];

    if ( role_id ) {
      handleShowModify(index, modify);
    } else {
      remove(index);
    }
  }

  const handleShowModify = (index: number, modify: boolean) => {
    if (fields && !!fields.length) {
      const roles = fields.map((a, idx)=> {
        if ( idx === index ) {
          return {
            ...a,
            isModify: modify,
          };
        } else {
          return a;
        }
      });

      reset({ roles: roles });
    }
  };

  const roleNodeList = () => {
    if (fields && !!fields.length) {
      return fields.map((a, idx) => {
        const { id, role_id, role_name, description, edit_yn, isModify } = a;
        return isModify ? <tr key={id || role_id || idx} >
          <td>
            <Controller
              name={`roles.${idx}.role_name`}
              control={control}
              key={id || role_id || idx}
              rules={{ 
                  required: "등급을 입력해주세요.",
              }}
              render={({
                  field,
              }) => (
                  <>
                  <FloatingLabel
                    controlId={`roleName${id || role_id || idx}`}
                    label='등급'
                  >
                    <Form.Control {...field} type='input' size='sm' placeholder='추가' />
                  </FloatingLabel>
                  </>
              )}
            />
          </td>
          <td>
          <Controller
              name={`roles.${idx}.description`}
              control={control}
              key={id || role_id || idx}
              render={({
                  field,
              }) => (
                  <>
                  <FloatingLabel
                    controlId={`description${id || role_id || idx}`}
                    label='설명'
                  >
                    <Form.Control {...field} type='input' size='sm' placeholder='추가 : 등급 설명' /> 
                  </FloatingLabel>
                  </>
              )}
            />
          </td>
          <td className='align-middle text-center' >
            <Button size='sm' onClick={()=> { handleUpdateRole(idx); }} variant='link' >{role_id ? '수정완료' : '저장'}</Button>|<Button size='sm' onClick={() => {handleCancel(idx, false)}} variant='link' >취소</Button>
          </td>
        </tr>
        : 
        <tr key={id || role_id || idx} >
          <td className='text-center'>{role_name}</td>
          <td>{description}</td>
          <td className='align-middle text-center'>
            {edit_yn === 'Y' ? <><Button size='sm' variant='link' onClick={()=>{ handleShowModify(idx, true); }} >수정</Button>|<Button size='sm' onClick={() => {handleDelRole(idx);}} variant='link' >삭제</Button></>: <></>}
          </td>
        </tr>;
      });
    } else {
      return <></>;
    }
  }

  useEffect(()=>{
    if (items && !!items.length) {
      reset({roles: items});
      setRoleList(items);
    }
  }, [items]);

  useEffect(() => {
    const { roles } = errors;
    
    if (roles && !!roles.length) {
        const firstErrorMessage = (roles as Record<string, FieldError>[]).flatMap(role =>
          Object.values(role)
        ).find(error => !!error?.message)?.message;
        
        Swal.fire({
          icon : "error",
          text: firstErrorMessage,
          showCloseButton: true
        });
    }
     
  }, [errors['roles'] && !!errors['roles'].length]);

  useEffect(()=> {
    handleSelectedMenu('/admin/role');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-2 px-5" >
        <ol className="breadcrumb mt-4">
          <li className="breadcrumb-item"><Link href="/" >Home</Link></li>
          <li className="breadcrumb-item"><Link href="/admin/menu/">회원 관리</Link></li>
          <li className="breadcrumb-item active">회원 구분/등급</li>
        </ol>
        <hr/>
        <div className='d-flex flex-row-reverse'>
          <div className='my-3 mx-1' >
            <button type="button" onClick={addRole} className="btn btn-primary px-3">등급추가</button>
          </div>
        </div>
        <div>
          <Table hover bordered >
            <thead>
              <tr>
                <th style={{ width: '25%' }} className='text-center' >등급</th>
                <th style={{ width: '55%' }} className='text-center th-lg'>설명</th>
                <th style={{ width: '15%' }} className='text-center'></th>
              </tr>
            </thead>
            <tbody>
              {roleNodeList()}
            </tbody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}

export default Role;
