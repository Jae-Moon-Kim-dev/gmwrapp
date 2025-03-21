"use client"

import CommonSelect from '@/components/common/Select';
import Image from 'next/image';
import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import * as S from '@/styles/user/join/UserInfo.styled';
import { ISelectData } from '@/app/types/common/select';
import dayjs from 'dayjs';
import { TabContext } from '@/context/TabProvider';
import { Controller, FieldPath, useForm, useWatch } from 'react-hook-form';
import useDay from '@/hooks/user/useDay';
import CommonModal from '@/components/common/Modal';
import { InfoData, initInfoData } from '@/app/types/user/user';

const Info = ({className}:{className:string}):ReactNode => {
	const { setTab } = useContext(TabContext);

	const [modalShow, setModalShow] = useState<boolean>(true);
	const [infoYear, setInfoYear] = useState<ISelectData>({ label: '년도', value: '' });
	const [infoMonth, setInfoMonth] = useState<ISelectData>({ label: '월', value: '' });
	const [infoDay, setInfoDay] = useState<ISelectData>({ label: '일', value: '' });
	const [infoYear2, setInfoYear2] = useState<ISelectData>({ label: '년도', value: '' });
	const [infoMonth2, setInfoMonth2] = useState<ISelectData>({ label: '월', value: '' });
	
	const dayDatas = useDay({year: infoYear.value, month: infoMonth.value});
	const dayDatas2 = useDay({year: infoYear2.value, month: infoMonth2.value});
	
	const form = useForm({
		defaultValues: initInfoData
	  });

	const { control, trigger, setValue, formState: { errors }, clearErrors, reset } = form;
	const gender1 = useWatch({
		control,
		name: 'gender1',
	});
	const gender2 = useWatch({
		control,
		name: 'gender2',
	});
	const selMailAddr = useWatch({
		control,
		name: 'selMailAddr',
	});
	const memPwd = useWatch({
		control,
		name: 'memPwd',
	});

	const goNextPage = async () => {
		clearErrors();
		await trigger();
		setModalShow(true);
		setTab('complete');
	}

	const handleCombChange = (e: ISelectData, name: FieldPath<InfoData>):void => {
		setValue(name, e.value);
	}

	const handleNumberOnly = (e: React.KeyboardEvent<HTMLInputElement>, name: FieldPath<InfoData>) => {
		e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
		setValue(name, e.currentTarget.value);
	}

	const emailData = [
		{ label: '직접 입력', value: ''},
		{ label: 'daum.net', value: 'daum.net'},
		{ label: 'gmail.com', value: 'gmail.com'},
		{ label: 'nate.com', value: 'nate.com'},
		{ label: 'naver.com', value: 'naver.com'},
		{ label: 'hotmail.com', value: 'hotmail.com'},
	];

	const yearData = () => {
		let years:ISelectData[] = [{ label: '년도', value: '' }];
		const nowDate = dayjs();
		for ( let i=nowDate.year(); i >= (nowDate.year()-110); i-- )
		{
			years = [
				...years,
				{ label: `${i}`, value: `${i}` },
			];
		}

		return years;
	}

	const monthData = () => {
		let months:ISelectData[] = [{ label: '월', value: '' }];
		for ( let i=1; i <= 12; i++ )
		{
			months = [
				...months,
				{ label: `${i}`, value: `${i}` },
			];
		}

		return months;
	}

	const isYoungOld = useCallback(():boolean => {
		const selectDate = dayjs(`${infoYear.value}-${infoMonth.value}-${infoDay.value}`);
		const pointDate = dayjs().subtract(14, 'year');
	
		if ( pointDate.isBefore(selectDate) ) {
			return true;
		} else {
			return false;
		}
	}, [infoYear, infoMonth, infoDay]);

	useEffect(() => {
		isYoungOld();
	}, [infoYear, infoMonth, infoDay, isYoungOld]);

	useEffect(() => {
		if ( !isYoungOld() ) {
			reset({
				parentNm: "",
				gender2: "M",
				selYear2: "",
				selMonth2: "",
				selDay2: "",
				parentCelNum1: "010",
				parentCelNum2: "",
				parentCelNum3: "",
			});
		}
	}, [isYoungOld, reset]);

	return <S.InfoContainer className={className} id="infoInput">
        <S.MiddleTitle className="sct infoInp">
			<div className='row'>
				<div className='col-2'>
					<h3>입력사항</h3>
				</div>
				<div className='col-6'>&nbsp;</div>
				<div className='col-4 text-end pt-2' >
					<Image src="/images/common/ico_check.png" alt="체크표시" width={13} height={13} />는 필수 입력 사항입니다.
				</div>
			</div>

			<S.LayoutTbl>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="memName" className="compulsory">이름</label>
					</S.Tit>
					<S.Cont className='col-2'>
						<Controller
							name='memName'
							control={control}
							rules={{ 
								required: "이름 입력하세요.",
								maxLength: { value: 10, message: "최대 10글자 이하로 입력해 주세요." }
							}}
							render={({
								field: {ref, value, onChange},
							}) => (
								<>
									<S.InputJo
										ref={ref}
										value={value}
										type="text" 
										id="memName" 
										placeholder="홍길동" 
										alt="이름"
										onChange={onChange}
									/>
								</>
							)}
						/>
					</S.Cont>
					<S.RadioWrap className="col-7 inputWrap">
						<Controller
							name='gender1'
							control={control}
							render={({field: {ref, name, onChange}}) => (
								<>
									<input ref={ref} name={name} type="radio" checked={ gender1 === 'M' } onChange={onChange} id="gender_1" value="M" />
									<label htmlFor="gender_1">남</label>
									
									<input ref={ref} name={name} type="radio" checked={ gender1 === 'F' } onChange={onChange} id="gender_2" value="F" />
									<label htmlFor="gender_2">여</label>
								</>
							)}
						/>
					</S.RadioWrap>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="mailID" className="compulsory">이메일</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex' >
							<div>
								<Controller
									name='mailID'
									control={control}
									rules={{ 
										required: "이메일 아이디를 입력하세요." ,
										maxLength: { value: 20, message: "최대 20글자 이하로 입력해 주세요." }
									}}
									render={({field: {ref, value, onChange}}) => (
										<S.InputJo ref={ref} value={value} type="text" onChange={onChange} id="mailID" alt="이메일" />
									)}
								/>	
								<span className='pe-1' >@</span>
								<Controller
									name='mailAddr'
									control={control}
									rules={{ required: "이메일 주소를 입력하세요."}}
									render={({field , field: {onChange}}) => (
										<S.InputJo {...field} type="text" onChange={onChange} disabled={!!selMailAddr} className='pe-1' id="mailAddr" alt="이메일" />
									)}
								/>

							</div>
							<div className='ps-2'>
								<Controller
									name='selMailAddr'
									control={control}
									render={({field , field: {name, onChange}}) => (
										<CommonSelect {...field} data={emailData} handleChange={(e: ISelectData) => {
											onChange(e);
											handleCombChange(e, name);
											setValue('mailAddr', e.value);
										}} />
									)}
								/>
							</div>
						</div>
					</S.Cont>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="celNum" className="compulsory">휴대폰 번호</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex' >
							<span className='py-2' id="celNum" >010</span>
							<span className='py-2 px-1'>-</span>
							<Controller
								name='celNum2'
								control={control}
								rules={{ required: "휴대폰 번호를 입력하세요." }}
								render={({field , field: {name, onChange}}) => (
									<S.InputJo {...field} type="text" onKeyUp={(e) => handleNumberOnly(e, name)} onKeyDown={(e) => handleNumberOnly(e, name)} onChange={onChange} maxLength={4} className='mx-1' alt="휴대폰 번호" />
								)}
							/>
							<span className='py-2 px-1'>-</span>
							<Controller
								name='celNum3'
								control={control}
								rules={{ required: "휴대폰 번호를 입력하세요." }}
								render={({field , field: {name, onChange}}) => (
									<S.InputJo {...field} type="text" onKeyUp={(e) => handleNumberOnly(e, name)} onKeyDown={(e) => handleNumberOnly(e, name)} onChange={onChange} maxLength={4} className='mx-1' alt="휴대폰 번호" />
								)}
							/>
						</div>
					</S.Cont>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="sel_year1" className="compulsory">생년월일</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex' id="sel_year1" >
							<Controller
								name='selYear1'
								control={control}
								rules={{ required: "생년월일을 입력해 주세요." }}
								render={({field , field: {name, onChange}}) => (
									<CommonSelect {...field} width='100px' data={yearData()} handleChange={(e: ISelectData) => {
										onChange(e);
										handleCombChange(e, name);
									}} setSelectValue={setInfoYear} />
								)}
							/>
							<div className='p-2' >년</div>
							<Controller
								name='selMonth1'
								control={control}
								rules={{ required: "생년월일을 입력해 주세요." }}
								render={({field , field: {name, onChange}}) => (
									<CommonSelect {...field} width='100px' data={monthData()} handleChange={(e: ISelectData) => {
										onChange(e);
										handleCombChange(e, name);
									}} setSelectValue={setInfoMonth} />
								)}
							/>
							<div className='p-2' >월</div>
							<Controller
								name='selDay1'
								control={control}
								rules={{ required: "생년월일을 입력해 주세요." }}
								render={({field , field: {name, onChange}}) => (
									<CommonSelect {...field} width='100px' data={dayDatas} handleChange={(e: ISelectData) => {
										onChange(e);
										handleCombChange(e, name);
									}} setSelectValue={setInfoDay} />
								)}
							/>
							<div className='p-2' >일</div>
						</div>
					</S.Cont>
				</div>
				{ isYoungOld() &&
					<>
						<div className='row'>
							<div className='col-3'>
								
							</div>
							<div className='col-9' >
								<S.GuideTxt className='py-3' >
									만 14세 미만의 어린이는 보호자 동의가 필요합니다. <br/>
									보호자 이름, 휴대전화정보, DI(중복가입확인정보)는 보호자 동의 확인을 위하여 아동의 정보와 함께 저장됩니다.
								</S.GuideTxt>
							</div>
						</div>
						<div className='row'>
							<S.Tit className='col-3'>
								<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
								<label htmlFor="parentNm" className="compulsory">보호자 이름</label>
							</S.Tit>
							<S.Cont className='col-2'>
								<Controller
									name='parentNm'
									control={control}
									rules={{ required: isYoungOld() ? '보호자 이름 입력하세요.' : false }}
									render={({field , field: {onChange}}) => (
										<S.InputJo {...field} type="text" onChange={onChange} id="parentNm" placeholder="홍길동" alt="이름" />
									)}
								/>
							</S.Cont>
							<S.RadioWrap className="col-7 inputWrap">
								<Controller
									name='gender2'
									control={control}
									render={({field , field: {onChange}}) => (
										<>
											<input {...field} type="radio" onChange={onChange} checked={ gender2 === 'M' } id="gender2_1" value="M" />
											<label htmlFor="gender2_1">남</label>
											
											<input {...field} type="radio" onChange={onChange} checked={ gender2 === 'F' } id="gender2_2" value="F" />
											<label htmlFor="gender2_2">여</label>
										</>
									)}
								/>
							</S.RadioWrap>
						</div>
						<div className='row'>
							<S.Tit className='col-3'>
								<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
								<label htmlFor="sel_year2" className="compulsory">생년월일</label>
							</S.Tit>
							<S.Cont className='col-9'>
								<div className='d-flex' id="sel_year2" >
								<Controller
									name='selYear2'
									control={control}
									rules={{ required: isYoungOld() ? '보호자 생년월일을 입력해 주세요.' : false }}
									render={({field , field: {name, onChange}}) => (
										<CommonSelect {...field} width='100px' data={yearData()} handleChange={(e: ISelectData) => {
											onChange(e);
											handleCombChange(e, name);
										}} setSelectValue={setInfoYear2} />
									)}
								/>
								<div className='p-2' >년</div>
								<Controller
									name='selMonth2'
									control={control}
									rules={{ required: isYoungOld() ? '보호자 생년월일을 입력해 주세요.' : false }}
									render={({field , field: {name, onChange}}) => (
										<CommonSelect {...field} width='100px' data={monthData()} handleChange={(e: ISelectData) => {
											onChange(e);
											handleCombChange(e, name);
										}} setSelectValue={setInfoMonth2} />
									)}
								/>
								<div className='p-2' >월</div>
								<Controller
									name='selDay2'
									control={control}
									rules={{ required: isYoungOld() ? '보호자 생년월일을 입력해 주세요.' : false }}
									render={({field , field: {name, onChange}}) => (
										<CommonSelect {...field} width='100px' data={dayDatas2} handleChange={(e: ISelectData) => {
											onChange(e);
											handleCombChange(e, name);
										}} />
									)}
								/>
								<div className='p-2' >일</div>
								</div>
							</S.Cont>
						</div>
						<div className='row'>
							<S.Tit className='col-3'>
								<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
								<label htmlFor="parentCelNum1" className="compulsory">휴대폰 번호</label>
							</S.Tit>
							<S.Cont className='col-9'>
								<div className='d-flex' >
									<span className='py-2' id="parentCelNum1" >010</span>
									<span className='py-2 px-1'>-</span>
									<Controller
										name='parentCelNum2'
										control={control}
										rules={{ required: isYoungOld() ? '보호자 휴대폰 번호를 입력하세요.' : false }}
										render={({field , field: {name, onChange}}) => (
											<S.InputJo {...field} type="text" onChange={onChange} onKeyUp={(e) => handleNumberOnly(e, name)} onKeyDown={(e) => handleNumberOnly(e, name)} maxLength={4} className='mx-1' alt="휴대폰 번호" />
										)}
									/>
									<span className='py-2 px-1'>-</span>
									<Controller
										name='parentCelNum3'
										control={control}
										rules={{ required: isYoungOld() ? '보호자 휴대폰 번호를 입력하세요.' : false }}
										render={({field , field: {name, onChange}}) => (
											<S.InputJo {...field} type="text" onChange={onChange} onKeyUp={(e) => handleNumberOnly(e, name)} onKeyDown={(e) => handleNumberOnly(e, name)} maxLength={4} className='mx-1' alt="휴대폰 번호" />
										)}
									/>
								</div>
							</S.Cont>
						</div>
					</>
				}
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="mj_id" className="compulsory">아이디</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<Controller
							name='memId'
							control={control}
							rules={{ 
								required: "아이디를 입력해 주세요.",
								minLength: { value: 6, message: "아이디는 최소 6글자 이상 25글자 이하로 입력하세요." },
								maxLength: { value: 25, message: "아이디는 최소 6글자 이상 25글자 이하로 입력하세요." },
								validate: {
									hasFirstEng: value => /(^[a-zA-Z])/.test(value) || "아이디의 첫글자는 영문이어야 합니다.",
									hasEngNumber: value => /^([a-zA-Z0-9-_])+$/.test(value) || "아이디는 영문, 숫자, -, _ 만 사용할 수 있습니다.",
								}
							}}
							render={({field , field: {onChange}}) => (
								<S.InputJo {...field} type="text" onChange={onChange} id="memId" alt="아이디" />
							)}
						/>{/**onBlur={() => {}} idCheck(); */}
					</S.Cont>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="mj_id" className="compulsory">비밀번호</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex'>
							<Controller
								name='memPwd'
								control={control}
								rules={{ 
									required: "비밀번호를 입력해 주세요.",
									minLength: { value: 6, message: "비밀번호는 최소 6글자 이상 15글자 이하로 입력하세요." },
									maxLength: { value: 15, message: "비밀번호는 최소 6글자 이상 15글자 이하로 입력하세요." }
								}}
								render={({field , field: {onChange}}) => (
									<S.InputJo {...field} type="password" onChange={onChange} id="memPwd" alt="비밀번호" />
								)}
							/>
							<S.NotiTxt className='p-2' >비밀번호는 영문, 숫자만 사용할 수 있습니다. (6~15자)</S.NotiTxt>
						</div>
					</S.Cont>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="mj_id" className="compulsory">비밀번호 확인</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex'>
							<Controller
								name='memPwdConfirm'
								control={control}
								rules={{ 
									required: "비밀번호를 한번더 입력해 주세요.",
									minLength: { value: 6, message: "비밀번호는 최소 6글자 이상 15글자 이하로 입력하세요." },
									maxLength: { value: 15, message: "비밀번호는 최소 6글자 이상 15글자 이하로 입력하세요." },
									validate: value => value === memPwd || "비밀번호가 일치하지 않습니다."
								}}
								render={({field , field: {onChange}}) => (
									<S.InputJo {...field} type="password" onChange={onChange} id="memPwdConfirm" alt="비밀번호" />
								)}
							/>
							<S.NotiTxt className='p-2' >한번 더 입력해주세요.</S.NotiTxt>
						</div>
					</S.Cont>
				</div>
			</S.LayoutTbl>
		</S.MiddleTitle>
		<S.InfoButtonWrapBox>
			<S.InfoButton onClick={goNextPage} >입력 완료</S.InfoButton> {/**saveInfo(); */}
		</S.InfoButtonWrapBox>
		{
			Object.values(errors).find(error => !!error) &&  
				<CommonModal 
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					show={modalShow}
					onHide={() => { setModalShow(false); }}
					bodyContent={<p className='p-3 fw-bold' >{Object.values(errors).find(error => !!error)?.message}</p>}
					closeLabel='확인'
				/>
		}
    </S.InfoContainer>;
}

export default Info;