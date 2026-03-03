import { User } from '@/app/types/user/user';
import dayjs from 'dayjs';
import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const InputField = ({
    user
}:{
    user: User
}) => {
    
    const { control, setValue } = useFormContext();
    const adminYn = useWatch({
        control,
        name: 'admin_yn',
    });

    return <>
        <Row className='py-1' >
        <Form.Group as={Col} xs="8" controlId="board_title" >
          <Row>
            <Form.Label column xs="3" className='fs-6 fw-bolder' >제목</Form.Label>
            <Col xs="9">
              <Controller
                name='board_title'
                control={control}
                rules={{ 
                  required: "제목을 입력하세요.",
                }}
                render={({
                    field: { value, onChange},
                }) => (
                    <Form.Control 
                      type="text"
                      value={value}
                      alt="제목"
                      onChange={onChange}
                    />
                )}
                />
            </Col>
          </Row>
        </Form.Group>
        <Col xs="2" className="form-check mt-1" >
        <Controller
          name='noti_yn'
          control={control}
          render={({
              field: { value, onChange},
          }) => (
            <input 
              className="form-check-input mt-2" 
              type="checkbox" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange();
                if ( e.currentTarget.checked ) {
                  setValue("noti_yn","Y");
                } else {
                  setValue("noti_yn","N");
                }
              }} 
              value={value} 
              name='noti_yn' 
              id="noti_yn" 
            />
          )}
            />
          <label className="form-check-label fs-6 p-1" htmlFor="noti_yn">
            공지로 등록
          </label>
        </Col>
      </Row>
      <Row className='py-1' >
        <Form.Group as={Col} xs="4" controlId="board_user_name" >
          <Row>
            <Form.Label as={Col} column xs="6" className='fs-6 fw-bolder' >작성자</Form.Label>
            <Col xs="6">
              <Controller
                name='board_user_name'
                control={control}
                render={({
                    field: { value, onChange},
                }) => (
                    <Form.Control 
                      type="text"
                      value={ adminYn === 'Y' ? '운영자' : user?.name}
                      alt="작성자"
                      readOnly
                      onChange={onChange}
                    />
                )}
                />
            </Col>
          </Row>
        </Form.Group>
        <Col xs="2" className="form-check mt-1" >
        <Controller
          name='admin_yn'
          control={control}
          render={({
              field: { value, onChange},
          }) => (
            <input 
              className="form-check-input mt-2" 
              type="checkbox" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange();
                if ( e.currentTarget.checked ) {
                  setValue("admin_yn","Y");
                } else {
                  setValue("admin_yn","N");
                }
              }} 
              value={value} 
              name='admin_yn' 
              id="admin_yn" 
            />
          )}
          />
          <label className="form-check-label fs-6 p-1" htmlFor="admin_yn">
            운영자
          </label>
        </Col>
        <Form.Group as={Col} xs="2">
          <Form.Label column className="fs-6 fw-bolder">
            작성일
          </Form.Label>
        </Form.Group>
        <Form.Group as={Col} xs="2" className='my-2' >
          <span className='fs-6' >
            {dayjs().format("YYYY.MM.DD")}
          </span>
        </Form.Group>
      </Row>
    </>;
}

export default InputField;