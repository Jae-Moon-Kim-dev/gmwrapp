"use client"

import ComSelect from '@/components/common/Select';
import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import * as S from '@/styles/user/join/UserInfo.styled';
import { SelectData } from '@/app/types/common/select';
import dayjs from 'dayjs';

const Info = ({className}:{className:string}):ReactNode => {
	const [infoEmail, setInfoEmail] = useState<SelectData>({ label: '직접 입력', value: ''});
	const [infoYear, setInfoYear] = useState<SelectData>({ label: '년도', value: '' });
	const [infoMonth, setInfoMonth] = useState<SelectData>({ label: '월', value: '' });
	const [infoDay, setInfoDay] = useState<SelectData>({ label: '일', value: '' });
	const [infoYear2, setInfoYear2] = useState<SelectData>({ label: '년도', value: '' });
	const [infoMonth2, setInfoMonth2] = useState<SelectData>({ label: '월', value: '' });
	const [infoDay2, setInfoDay2] = useState<SelectData>({ label: '일', value: '' });
	const [dayDatas, setDayDatas] = useState<SelectData[]>([{ label: '일', value: '' }]);
	const [dayDatas2, setDayDatas2] = useState<SelectData[]>([{ label: '일', value: '' }]);

	const emailData = [
		{ label: '직접 입력', value: ''},
		{ label: 'daum.net', value: 'daum.net'},
		{ label: 'gmail.com', value: 'gmail.com'},
		{ label: 'nate.com', value: 'nate.com'},
		{ label: 'naver.com', value: 'naver.com'},
		{ label: 'hotmail.com', value: 'hotmail.com'},
	];

	const yearData = () => {
		let years:SelectData[] = [{ label: '년도', value: '' }];
		if ( typeof window !== 'undefined' ) {
			const nowDate = dayjs();
			for ( let i=nowDate.year(); i >= (nowDate.year()-110); i-- )
			{
				years = [
					...years,
					{ label: `${i}`, value: `${i}` },
				];
			}
		}

		return years;
	}

	const monthData = () => {
		let months:SelectData[] = [{ label: '월', value: '' }];
		if ( typeof window !== 'undefined' ) {
			for ( let i=1; i <= 12; i++ )
			{
				months = [
					...months,
					{ label: `${i}`, value: `${i}` },
				];
			}
		}

		return months;
	}

	const dayData = () => {
		const selectDate = dayjs(`${infoYear.value}-${infoMonth.value}-01`);
		const lastDay = selectDate.daysInMonth();
		let days:SelectData[] = [{ label: '일', value: '' }];

		for ( let i=1; i <= lastDay; i++ )
			{
				days = [
					...days,
					{ label: `${i}`, value: `${i}` },
				];
			}
		
		setDayDatas(days);
	}

	const dayData2 = () => {
		const selectDate = dayjs(`${infoYear2.value}-${infoMonth2.value}-01`);
		const lastDay = selectDate.daysInMonth();
		let days:SelectData[] = [{ label: '일', value: '' }];

		for ( let i=1; i <= lastDay; i++ )
			{
				days = [
					...days,
					{ label: `${i}`, value: `${i}` },
				];
			}
		
		setDayDatas2(days);
	}

	const isYoungOld = ():boolean => {
		const selectDate = dayjs(`${infoYear.value}-${infoMonth.value}-${infoDay.value}`);
		const pointDate = dayjs().subtract(14, 'year');
	
		if ( pointDate.isBefore(selectDate) ) return true;
		else return false;
	}

	useEffect(() => {
		if (infoMonth) dayData();
	}, [infoMonth]);

	useEffect(() => {
		if (infoMonth2) dayData2();
	}, [infoMonth2]);

	useEffect(() => {
		isYoungOld();
	}, [infoDay]);

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
						<S.InputJo type="text" id="memName" name="memName" placeholder="홍길동" alt="이름" />
					</S.Cont>
					<S.RadioWrap className="col-7 inputWrap">
						<input type="radio" name="sex" id="gender_1" value="M" checked={true} />
						<label htmlFor="gender_1">남</label>
						
						<input type="radio" name="sex" id="gender_2" value="F" />
						<label htmlFor="gender_2">여</label>
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
								<S.InputJo type="text" id="mailID" name="mailID" alt="이메일" />
								<span className='pe-1' >@</span>
								<S.InputJo type="text" className='pe-1' id="mailAddr" name="mailAddr" alt="이메일" />
							</div>
							<div className='ps-2'>
								<ComSelect data={emailData} setSelectValue={setInfoEmail} />
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
							<S.InputJo type="text" className='mx-1' maxLength={4} name="celNum" alt="휴대폰 번호" />
							<span className='py-2 px-1'>-</span>
							<S.InputJo type="text" className='mx-1' maxLength={4} name="celNum" alt="휴대폰 번호" />
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
							<ComSelect data={yearData()} width="100px" setSelectValue={setInfoYear} />{/** sel_year1 */}
							<div className='py-2 px-2' >년</div>
							<ComSelect data={monthData()} width="100px" setSelectValue={setInfoMonth} />{/** sel_month1 */}
							<div className='py-2 px-2' >월</div>
							<ComSelect data={dayDatas} width="100px" setSelectValue={setInfoDay} />{/** sel_day1 */}
							<div className='py-2 px-2' >일</div>
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
								<S.InputJo type="text" id="parentNm" name="parentNm" placeholder="홍길동" alt="이름" />
							</S.Cont>
							<S.RadioWrap className="col-7 inputWrap">
								<input type="radio" name="sex" id="gender2_1" value="M" checked={true} />
								<label htmlFor="gender2_1">남</label>
								
								<input type="radio" name="sex" id="gender2_2" value="F" />
								<label htmlFor="gender2_2">여</label>
							</S.RadioWrap>
						</div>
						<div className='row'>
							<S.Tit className='col-3'>
								<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
								<label htmlFor="sel_year2" className="compulsory">생년월일</label>
							</S.Tit>
							<S.Cont className='col-9'>
								<div className='d-flex' id="sel_year2" >
									<ComSelect data={yearData()} width="100px" setSelectValue={setInfoYear2} />{/** sel_year2 */}
									<div className='py-2 px-2' >년</div>
									<ComSelect data={monthData()} width="100px" setSelectValue={setInfoMonth2} />{/** sel_month2 */}
									<div className='py-2 px-2' >월</div>
									<ComSelect data={dayDatas2} width="100px" setSelectValue={setInfoDay2} />{/** sel_day2 */}
									<div className='py-2 px-2' >일</div>
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
									<S.InputJo type="text" className='mx-1' maxLength={4} id="parentCelNum2" name="parentCelNum2" alt="휴대폰 번호" />
									<span className='py-2 px-1'>-</span>
									<S.InputJo type="text" className='mx-1' maxLength={4} id="parentCelNum3" name="parentCelNum3" alt="휴대폰 번호" />
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
						<S.InputJo type="text" id="memId" name="memId" alt="아이디" />{/**onBlur={() => {}} idCheck(); */}
					</S.Cont>
				</div>
				<div className='row'>
					<S.Tit className='col-3'>
						<Image src="/images/common/ico_check.png" width={13} height={13} alt="필수" />
						<label htmlFor="mj_id" className="compulsory">비밀번호</label>
					</S.Tit>
					<S.Cont className='col-9'>
						<div className='d-flex'>
							<S.InputJo type="password" id="memPwd" name="memPwd" alt="비밀번호" maxLength={15} />
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
							<S.InputJo type="password" id="memPwdConfirm" name="memPwdConfirm" alt="비밀번호" maxLength={15} />
							<S.NotiTxt className='p-2' >한번 더 입력해주세요.</S.NotiTxt>
						</div>
					</S.Cont>
				</div>
			</S.LayoutTbl>
		</S.MiddleTitle>
		<S.InfoButtonWrapBox>
			<S.InfoButton onClick={() => {}} >입력 완료</S.InfoButton> {/**saveInfo(); */}
		</S.InfoButtonWrapBox>
    </S.InfoContainer>;
}

export default Info;