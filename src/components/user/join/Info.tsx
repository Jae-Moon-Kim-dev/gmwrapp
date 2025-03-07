import Image from 'next/image';
import React, { ReactNode } from 'react';

const Info = ({className}:{className:string}):ReactNode => {
    return <div className={className} id="infoInput">
        <ul className="tab_memJoin">
			<li>01. 약관동의 </li>
			<li>02. 본인인증</li>
			<li className="on">03. 정보입력</li>
			<li>04. 가입완료</li>
		</ul>
			
		<h2 className="hide">정보입력</h2>
		<section className="sct infoInp">
			<h3>입력사항</h3>
			<div className="guideTxt">
				<Image src="url('/images/common/ico_check.png')" alt="체크표시" width={13} height={13} />는 필수 입력 사항입니다.
			</div>
			
			<table className="layoutTbl line">
				<colgroup>
					<col style={{width: "200px"}} />
					<col style={{width: "auto"}} />
				</colgroup>
				<tbody>
					<tr>
						<td className="tit">
                            <Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<label htmlFor="mj_name" className="compulsory">이름</label>
						</td>
						<td className="cont">
							<input type="text" className="inputJo w70 requ" id="memName" name="memName" placeholder="홍길동" alt="이름" />
							<div className="inputWrap" style={{marginTop:"8px"}}>
								<input type="radio" name="sex" id="gender_1" value="M" checked={true} style={{WebkitAppearance:"radio"}} />
								<label htmlFor="gender_1">남</label>
								
								<input type="radio" name="sex" id="gender_2" value="F" style={{WebkitAppearance:"radio"}} />
								<label htmlFor="gender_2">여</label>
							</div>
						</td>
					</tr>
					
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<label htmlFor="mailID" className="compulsory">이메일</label>
						</td>
						<td className="cont">
							<input type="text" className="inputJo s100 requ" id="mailID" name="mailID" title="이메일 아이디" placeholder="onmam" alt="이메일" />
							<div className="divTxt">@</div>
							<input type="text" className="inputJo s100 requ" title="이메일 주소 직접입력" id="mailAddr" name="mailAddr" placeholder="onmam.com" alt="이메일" />
							<div className="selCloneJo sel_email_clone" id="sel_email_clone" style={{minWidth: "102.4px"}}><span className="ctrl"><span className="arrow"></span></span><strong>직접 입력</strong><ul style={{height: "120px"}}><li className="on"><button type="button" value="">직접 입력</button></li><li className=""><button type="button" value="daum.net">daum.net</button></li><li className=""><button type="button" value="gmail.com">gmail.com</button></li><li className=""><button type="button" value="nate.com">nate.com</button></li><li className=""><button type="button" value="naver.com">naver.com</button></li><li className=""><button type="button" value="hotmail.com">hotmail.com</button></li></ul></div><select className="selectJo selectHide" title="이메일 주소" id="sel_email" name="emailSel" onChange={() => {}}> {/**emailsel() */}
							<option value="">직접 입력</option>
							<option value="daum.net">daum.net</option>
							<option value="gmail.com">gmail.com</option>
							<option value="nate.com">nate.com</option>
							<option value="naver.com">naver.com</option>
							<option value="hotmail.com">hotmail.com</option>
							</select>
						</td>
					</tr>
					
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<span className="compulsory">휴대폰 번호</span>
						</td>
						<td className="cont">
							<div className="selCloneJo celNum1_clone disabled" id="celNum1_clone" style={{minWidth: "55.4px"}}><span className="ctrl"><span className="arrow"></span></span><strong>010</strong><ul style={{height:"120px;"}}><li className="on"><button type="button" value="010" disabled={false}>010</button></li><li className=""><button type="button" value="011" disabled={false}>011</button></li><li className=""><button type="button" value="016" disabled={false}>016</button></li><li className=""><button type="button" value="017" disabled={false}>017</button></li><li className=""><button type="button" value="019" disabled={false}>019</button></li><li className=""><button type="button" value="131" disabled={false}>131</button></li><li className=""><button type="button" value="135" disabled={false}>135</button></li><li className=""><button type="button" value="138" disabled={false}>138</button></li><li className=""><button type="button" value="137" disabled={false}>137</button></li><li className=""><button type="button" value="150" disabled={false}>150</button></li></ul></div><select className="selectJo selectHide" title="휴대폰 앞번호" id="celNum1" name="celNum1">
							<option value="010" selected={true}>010</option>
							<option value="011">011</option>
							<option value="016">016</option>
							<option value="017">017</option>
							<option value="019">019</option>
							<option value="131">131</option>
							<option value="135">135</option>
							<option value="138">138</option>
							<option value="137">137</option>
							<option value="150">150</option>
							</select>
							<div className="divTxt">-</div>
							<input type="text" className="inputJo w70 requ num" alt="휴대폰 번호" id="celNum2" name="celNum2" readOnly={true} value="9879" maxLength={4} onKeyDown={(event) => {if(event.keyCode < 45 || event.keyCode > 57) return;}} />
							<div className="divTxt">-</div>
							<input type="text" className="inputJo w70 requ num" alt="휴대폰 번호" id="celNum3" name="celNum3" readOnly={true} value="3110" maxLength={4} onKeyDown={(event) => {if(event.keyCode < 45 || event.keyCode > 57) return;}} />
								
							<div className="inputWrap" style={{marginTop: "8px"}}>
								<input type="radio" name="celType" id="phType_1" value="1" checked={true} style={{WebkitAppearance:"radio"}} />
								<label htmlFor="phType_1">스마트폰</label>
								
								<input type="radio" name="celType" id="phType_2" value="0" style={{WebkitAppearance:"radio"}} />
								<label htmlFor="phType_2">일반폰</label>
							</div>
						</td>
					</tr>
					
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<span className="compulsory">생년월일</span>
						</td>
						<td className="cont">
							<div className="selCloneJo sel_year1_clone" id="sel_year1_clone" style={{minWidth: "62.4px"}}><span className="ctrl"><span className="arrow"></span></span><strong>년도</strong><ul style={{height: "120px"}}><li className="on"><button type="button" value="">년도</button></li><li className=""><button type="button" value="2025">2025</button></li><li className=""><button type="button" value="2024">2024</button></li><li className=""><button type="button" value="2023">2023</button></li><li className=""><button type="button" value="2022">2022</button></li><li className=""><button type="button" value="2021">2021</button></li><li className=""><button type="button" value="2020">2020</button></li><li className=""><button type="button" value="2019">2019</button></li><li className=""><button type="button" value="2018">2018</button></li><li className=""><button type="button" value="2017">2017</button></li><li className=""><button type="button" value="2016">2016</button></li><li className=""><button type="button" value="2015">2015</button></li><li className=""><button type="button" value="2014">2014</button></li><li className=""><button type="button" value="2013">2013</button></li><li className=""><button type="button" value="2012">2012</button></li><li className=""><button type="button" value="2011">2011</button></li><li className=""><button type="button" value="2010">2010</button></li><li className=""><button type="button" value="2009">2009</button></li><li className=""><button type="button" value="2008">2008</button></li><li className=""><button type="button" value="2007">2007</button></li><li className=""><button type="button" value="2006">2006</button></li><li className=""><button type="button" value="2005">2005</button></li><li className=""><button type="button" value="2004">2004</button></li><li className=""><button type="button" value="2003">2003</button></li><li className=""><button type="button" value="2002">2002</button></li><li className=""><button type="button" value="2001">2001</button></li><li className=""><button type="button" value="2000">2000</button></li><li className=""><button type="button" value="1999">1999</button></li><li className=""><button type="button" value="1998">1998</button></li><li className=""><button type="button" value="1997">1997</button></li><li className=""><button type="button" value="1996">1996</button></li><li className=""><button type="button" value="1995">1995</button></li><li className=""><button type="button" value="1994">1994</button></li><li className=""><button type="button" value="1993">1993</button></li><li className=""><button type="button" value="1992">1992</button></li><li className=""><button type="button" value="1991">1991</button></li><li className=""><button type="button" value="1990">1990</button></li><li className=""><button type="button" value="1989">1989</button></li><li className=""><button type="button" value="1988">1988</button></li><li className=""><button type="button" value="1987">1987</button></li><li className=""><button type="button" value="1986">1986</button></li><li className=""><button type="button" value="1985">1985</button></li><li className=""><button type="button" value="1984">1984</button></li><li className=""><button type="button" value="1983">1983</button></li><li className=""><button type="button" value="1982">1982</button></li><li className=""><button type="button" value="1981">1981</button></li><li className=""><button type="button" value="1980">1980</button></li><li className=""><button type="button" value="1979">1979</button></li><li className=""><button type="button" value="1978">1978</button></li><li className=""><button type="button" value="1977">1977</button></li><li className=""><button type="button" value="1976">1976</button></li><li className=""><button type="button" value="1975">1975</button></li><li className=""><button type="button" value="1974">1974</button></li><li className=""><button type="button" value="1973">1973</button></li><li className=""><button type="button" value="1972">1972</button></li><li className=""><button type="button" value="1971">1971</button></li><li className=""><button type="button" value="1970">1970</button></li><li className=""><button type="button" value="1969">1969</button></li><li className=""><button type="button" value="1968">1968</button></li><li className=""><button type="button" value="1967">1967</button></li><li className=""><button type="button" value="1966">1966</button></li><li className=""><button type="button" value="1965">1965</button></li><li className=""><button type="button" value="1964">1964</button></li><li className=""><button type="button" value="1963">1963</button></li><li className=""><button type="button" value="1962">1962</button></li><li className=""><button type="button" value="1961">1961</button></li><li className=""><button type="button" value="1960">1960</button></li><li className=""><button type="button" value="1959">1959</button></li><li className=""><button type="button" value="1958">1958</button></li><li className=""><button type="button" value="1957">1957</button></li><li className=""><button type="button" value="1956">1956</button></li><li className=""><button type="button" value="1955">1955</button></li><li className=""><button type="button" value="1954">1954</button></li><li className=""><button type="button" value="1953">1953</button></li><li className=""><button type="button" value="1952">1952</button></li><li className=""><button type="button" value="1951">1951</button></li><li className=""><button type="button" value="1950">1950</button></li><li className=""><button type="button" value="1949">1949</button></li><li className=""><button type="button" value="1948">1948</button></li><li className=""><button type="button" value="1947">1947</button></li><li className=""><button type="button" value="1946">1946</button></li><li className=""><button type="button" value="1945">1945</button></li><li className=""><button type="button" value="1944">1944</button></li><li className=""><button type="button" value="1943">1943</button></li><li className=""><button type="button" value="1942">1942</button></li><li className=""><button type="button" value="1941">1941</button></li><li className=""><button type="button" value="1940">1940</button></li><li className=""><button type="button" value="1939">1939</button></li><li className=""><button type="button" value="1938">1938</button></li><li className=""><button type="button" value="1937">1937</button></li><li className=""><button type="button" value="1936">1936</button></li><li className=""><button type="button" value="1935">1935</button></li><li className=""><button type="button" value="1934">1934</button></li><li className=""><button type="button" value="1933">1933</button></li><li className=""><button type="button" value="1932">1932</button></li><li className=""><button type="button" value="1931">1931</button></li><li className=""><button type="button" value="1930">1930</button></li><li className=""><button type="button" value="1929">1929</button></li><li className=""><button type="button" value="1928">1928</button></li><li className=""><button type="button" value="1927">1927</button></li><li className=""><button type="button" value="1926">1926</button></li><li className=""><button type="button" value="1925">1925</button></li><li className=""><button type="button" value="1924">1924</button></li><li className=""><button type="button" value="1923">1923</button></li><li className=""><button type="button" value="1922">1922</button></li><li className=""><button type="button" value="1921">1921</button></li><li className=""><button type="button" value="1920">1920</button></li><li className=""><button type="button" value="1919">1919</button></li><li className=""><button type="button" value="1918">1918</button></li><li className=""><button type="button" value="1917">1917</button></li><li className=""><button type="button" value="1916">1916</button></li><li className=""><button type="button" value="1915">1915</button></li></ul></div><select className="selectJo requ selectHide" title="년도 선택" id="sel_year1" name="sel_year1" onChange={() => {}}> {/*setSelDay('1');*/}
							<option value="">년도</option>
														<option value="2025">2025</option>
														<option value="2024">2024</option>
														<option value="2023">2023</option>
														<option value="2022">2022</option>
														<option value="2021">2021</option>
														<option value="2020">2020</option>
														<option value="2019">2019</option>
														<option value="2018">2018</option>
														<option value="2017">2017</option>
														<option value="2016">2016</option>
														<option value="2015">2015</option>
														<option value="2014">2014</option>
														<option value="2013">2013</option>
														<option value="2012">2012</option>
														<option value="2011">2011</option>
														<option value="2010">2010</option>
														<option value="2009">2009</option>
														<option value="2008">2008</option>
														<option value="2007">2007</option>
														<option value="2006">2006</option>
														<option value="2005">2005</option>
														<option value="2004">2004</option>
														<option value="2003">2003</option>
														<option value="2002">2002</option>
														<option value="2001">2001</option>
														<option value="2000">2000</option>
														<option value="1999">1999</option>
														<option value="1998">1998</option>
														<option value="1997">1997</option>
														<option value="1996">1996</option>
														<option value="1995">1995</option>
														<option value="1994">1994</option>
														<option value="1993">1993</option>
														<option value="1992">1992</option>
														<option value="1991">1991</option>
														<option value="1990">1990</option>
														<option value="1989">1989</option>
														<option value="1988">1988</option>
														<option value="1987">1987</option>
														<option value="1986">1986</option>
														<option value="1985">1985</option>
														<option value="1984">1984</option>
														<option value="1983">1983</option>
														<option value="1982">1982</option>
														<option value="1981">1981</option>
														<option value="1980">1980</option>
														<option value="1979">1979</option>
														<option value="1978">1978</option>
														<option value="1977">1977</option>
														<option value="1976">1976</option>
														<option value="1975">1975</option>
														<option value="1974">1974</option>
														<option value="1973">1973</option>
														<option value="1972">1972</option>
														<option value="1971">1971</option>
														<option value="1970">1970</option>
														<option value="1969">1969</option>
														<option value="1968">1968</option>
														<option value="1967">1967</option>
														<option value="1966">1966</option>
														<option value="1965">1965</option>
														<option value="1964">1964</option>
														<option value="1963">1963</option>
														<option value="1962">1962</option>
														<option value="1961">1961</option>
														<option value="1960">1960</option>
														<option value="1959">1959</option>
														<option value="1958">1958</option>
														<option value="1957">1957</option>
														<option value="1956">1956</option>
														<option value="1955">1955</option>
														<option value="1954">1954</option>
														<option value="1953">1953</option>
														<option value="1952">1952</option>
														<option value="1951">1951</option>
														<option value="1950">1950</option>
														<option value="1949">1949</option>
														<option value="1948">1948</option>
														<option value="1947">1947</option>
														<option value="1946">1946</option>
														<option value="1945">1945</option>
														<option value="1944">1944</option>
														<option value="1943">1943</option>
														<option value="1942">1942</option>
														<option value="1941">1941</option>
														<option value="1940">1940</option>
														<option value="1939">1939</option>
														<option value="1938">1938</option>
														<option value="1937">1937</option>
														<option value="1936">1936</option>
														<option value="1935">1935</option>
														<option value="1934">1934</option>
														<option value="1933">1933</option>
														<option value="1932">1932</option>
														<option value="1931">1931</option>
														<option value="1930">1930</option>
														<option value="1929">1929</option>
														<option value="1928">1928</option>
														<option value="1927">1927</option>
														<option value="1926">1926</option>
														<option value="1925">1925</option>
														<option value="1924">1924</option>
														<option value="1923">1923</option>
														<option value="1922">1922</option>
														<option value="1921">1921</option>
														<option value="1920">1920</option>
														<option value="1919">1919</option>
														<option value="1918">1918</option>
														<option value="1917">1917</option>
														<option value="1916">1916</option>
														<option value="1915">1915</option>
														</select>
							<div className="divTxt">년</div>
								
							<div className="selCloneJo sel_month1_clone" id="sel_month1_clone" style={{minWidth: "48.4px"}}><span className="ctrl"><span className="arrow"></span></span><strong>월</strong><ul style={{height:"120px"}}><li className="on"><button type="button" value="">월</button></li><li className=""><button type="button" value="1">1</button></li><li className=""><button type="button" value="2">2</button></li><li className=""><button type="button" value="3">3</button></li><li className=""><button type="button" value="4">4</button></li><li className=""><button type="button" value="5">5</button></li><li className=""><button type="button" value="6">6</button></li><li className=""><button type="button" value="7">7</button></li><li className=""><button type="button" value="8">8</button></li><li className=""><button type="button" value="9">9</button></li><li className=""><button type="button" value="10">10</button></li><li className=""><button type="button" value="11">11</button></li><li className=""><button type="button" value="12">12</button></li></ul></div><select className="selectJo requ selectHide" title="월 선택" id="sel_month1" name="sel_month1" onChange={() => {}}>{/*setSelDay('1') */}
							<option value="">월</option>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
														<option value="11">11</option>
														<option value="12">12</option>
														</select>
							<div className="divTxt">월</div>
							<div className="selCloneJo sel_day1_clone" id="sel_day1_clone" style={{minWidth: "47.4px"}}><span className="ctrl"><span className="arrow"></span></span><strong>일</strong><ul style={{height: "24px"}}><li className="on"><button type="button" value="">일</button></li></ul></div><select className="selectJo requ selectHide" title="일 선택" name="sel_day1" id="sel_day1" onChange={()=> {}}>{/**birthdayCheck('1') */}
							<option value="">일</option>
							
							</select>
							<div className="divTxt">일</div>
						</td>
					</tr>
					
					<tr className="parentTr" style={{display:"none"}}>
						<td className="tit">
						</td>
						<td className="cont">
							<div className="guideTxt_14">
							만 14세 미만의 어린이는 보호자 동의가 필요합니다. <br />
							보호자 이름, 휴대전화정보, DI(중복가입확인정보)는 보호자 동의 확인을 위하여 아동의 정보와 함께 저장됩니다.
							</div>
						</td>
					</tr>
						
					<tr className="parentTr" style={{display:"none"}}>
						<td className="tit optInp">
							<label htmlFor="parentNm">보호자 이름</label>
						</td>
						<td className="cont">
							<input type="text" className="inputJo w70" id="parentNm" name="parentNm" placeholder="홍길동" />
							<div className="inputWrap">
								<input type="radio" name="parentSex" id="gender2_1" value="M" checked={true} style={{WebkitAppearance:"radio"}} />
								<label htmlFor="gender2_1">남</label>
								
								<input type="radio" className="inputJo" name="parentSex" id="gender2_2" value="F" style={{WebkitAppearance:"radio"}} />
								<label htmlFor="gender2_2" className="label-radio parentSex">여</label>
							</div>
						</td>
					</tr>
					
					<tr className="parentTr" style={{display:"none"}}>
						<td className="tit optInp">생년월일</td>
						<td className="cont">
							<div className="selCloneJo sel_year2_clone" id="sel_year2_clone" style={{minWidth:"8.399999999999999px"}}><span className="ctrl"><span className="arrow"></span></span><strong>년도</strong><ul style={{height:"120px"}}><li className="on"><button type="button" value="">년도</button></li><li className=""><button type="button" value="2025">2025</button></li><li className=""><button type="button" value="2024">2024</button></li><li className=""><button type="button" value="2023">2023</button></li><li className=""><button type="button" value="2022">2022</button></li><li className=""><button type="button" value="2021">2021</button></li><li className=""><button type="button" value="2020">2020</button></li><li className=""><button type="button" value="2019">2019</button></li><li className=""><button type="button" value="2018">2018</button></li><li className=""><button type="button" value="2017">2017</button></li><li className=""><button type="button" value="2016">2016</button></li><li className=""><button type="button" value="2015">2015</button></li><li className=""><button type="button" value="2014">2014</button></li><li className=""><button type="button" value="2013">2013</button></li><li className=""><button type="button" value="2012">2012</button></li><li className=""><button type="button" value="2011">2011</button></li><li className=""><button type="button" value="2010">2010</button></li><li className=""><button type="button" value="2009">2009</button></li><li className=""><button type="button" value="2008">2008</button></li><li className=""><button type="button" value="2007">2007</button></li><li className=""><button type="button" value="2006">2006</button></li><li className=""><button type="button" value="2005">2005</button></li><li className=""><button type="button" value="2004">2004</button></li><li className=""><button type="button" value="2003">2003</button></li><li className=""><button type="button" value="2002">2002</button></li><li className=""><button type="button" value="2001">2001</button></li><li className=""><button type="button" value="2000">2000</button></li><li className=""><button type="button" value="1999">1999</button></li><li className=""><button type="button" value="1998">1998</button></li><li className=""><button type="button" value="1997">1997</button></li><li className=""><button type="button" value="1996">1996</button></li><li className=""><button type="button" value="1995">1995</button></li><li className=""><button type="button" value="1994">1994</button></li><li className=""><button type="button" value="1993">1993</button></li><li className=""><button type="button" value="1992">1992</button></li><li className=""><button type="button" value="1991">1991</button></li><li className=""><button type="button" value="1990">1990</button></li><li className=""><button type="button" value="1989">1989</button></li><li className=""><button type="button" value="1988">1988</button></li><li className=""><button type="button" value="1987">1987</button></li><li className=""><button type="button" value="1986">1986</button></li><li className=""><button type="button" value="1985">1985</button></li><li className=""><button type="button" value="1984">1984</button></li><li className=""><button type="button" value="1983">1983</button></li><li className=""><button type="button" value="1982">1982</button></li><li className=""><button type="button" value="1981">1981</button></li><li className=""><button type="button" value="1980">1980</button></li><li className=""><button type="button" value="1979">1979</button></li><li className=""><button type="button" value="1978">1978</button></li><li className=""><button type="button" value="1977">1977</button></li><li className=""><button type="button" value="1976">1976</button></li><li className=""><button type="button" value="1975">1975</button></li><li className=""><button type="button" value="1974">1974</button></li><li className=""><button type="button" value="1973">1973</button></li><li className=""><button type="button" value="1972">1972</button></li><li className=""><button type="button" value="1971">1971</button></li><li className=""><button type="button" value="1970">1970</button></li><li className=""><button type="button" value="1969">1969</button></li><li className=""><button type="button" value="1968">1968</button></li><li className=""><button type="button" value="1967">1967</button></li><li className=""><button type="button" value="1966">1966</button></li><li className=""><button type="button" value="1965">1965</button></li><li className=""><button type="button" value="1964">1964</button></li><li className=""><button type="button" value="1963">1963</button></li><li className=""><button type="button" value="1962">1962</button></li><li className=""><button type="button" value="1961">1961</button></li><li className=""><button type="button" value="1960">1960</button></li><li className=""><button type="button" value="1959">1959</button></li><li className=""><button type="button" value="1958">1958</button></li><li className=""><button type="button" value="1957">1957</button></li><li className=""><button type="button" value="1956">1956</button></li><li className=""><button type="button" value="1955">1955</button></li><li className=""><button type="button" value="1954">1954</button></li><li className=""><button type="button" value="1953">1953</button></li><li className=""><button type="button" value="1952">1952</button></li><li className=""><button type="button" value="1951">1951</button></li><li className=""><button type="button" value="1950">1950</button></li><li className=""><button type="button" value="1949">1949</button></li><li className=""><button type="button" value="1948">1948</button></li><li className=""><button type="button" value="1947">1947</button></li><li className=""><button type="button" value="1946">1946</button></li><li className=""><button type="button" value="1945">1945</button></li><li className=""><button type="button" value="1944">1944</button></li><li className=""><button type="button" value="1943">1943</button></li><li className=""><button type="button" value="1942">1942</button></li><li className=""><button type="button" value="1941">1941</button></li><li className=""><button type="button" value="1940">1940</button></li><li className=""><button type="button" value="1939">1939</button></li><li className=""><button type="button" value="1938">1938</button></li><li className=""><button type="button" value="1937">1937</button></li><li className=""><button type="button" value="1936">1936</button></li><li className=""><button type="button" value="1935">1935</button></li><li className=""><button type="button" value="1934">1934</button></li><li className=""><button type="button" value="1933">1933</button></li><li className=""><button type="button" value="1932">1932</button></li><li className=""><button type="button" value="1931">1931</button></li><li className=""><button type="button" value="1930">1930</button></li><li className=""><button type="button" value="1929">1929</button></li><li className=""><button type="button" value="1928">1928</button></li><li className=""><button type="button" value="1927">1927</button></li><li className=""><button type="button" value="1926">1926</button></li><li className=""><button type="button" value="1925">1925</button></li><li className=""><button type="button" value="1924">1924</button></li><li className=""><button type="button" value="1923">1923</button></li><li className=""><button type="button" value="1922">1922</button></li><li className=""><button type="button" value="1921">1921</button></li><li className=""><button type="button" value="1920">1920</button></li><li className=""><button type="button" value="1919">1919</button></li><li className=""><button type="button" value="1918">1918</button></li><li className=""><button type="button" value="1917">1917</button></li><li className=""><button type="button" value="1916">1916</button></li><li className=""><button type="button" value="1915">1915</button></li></ul></div><select className="selectJo selectHide" title="년도 선택" id="sel_year2" name="sel_year2" onChange={() => {}}>{/*setSelDay('2')*/}
							<option value="">년도</option>
														<option value="2025">2025</option>
														<option value="2024">2024</option>
														<option value="2023">2023</option>
														<option value="2022">2022</option>
														<option value="2021">2021</option>
														<option value="2020">2020</option>
														<option value="2019">2019</option>
														<option value="2018">2018</option>
														<option value="2017">2017</option>
														<option value="2016">2016</option>
														<option value="2015">2015</option>
														<option value="2014">2014</option>
														<option value="2013">2013</option>
														<option value="2012">2012</option>
														<option value="2011">2011</option>
														<option value="2010">2010</option>
														<option value="2009">2009</option>
														<option value="2008">2008</option>
														<option value="2007">2007</option>
														<option value="2006">2006</option>
														<option value="2005">2005</option>
														<option value="2004">2004</option>
														<option value="2003">2003</option>
														<option value="2002">2002</option>
														<option value="2001">2001</option>
														<option value="2000">2000</option>
														<option value="1999">1999</option>
														<option value="1998">1998</option>
														<option value="1997">1997</option>
														<option value="1996">1996</option>
														<option value="1995">1995</option>
														<option value="1994">1994</option>
														<option value="1993">1993</option>
														<option value="1992">1992</option>
														<option value="1991">1991</option>
														<option value="1990">1990</option>
														<option value="1989">1989</option>
														<option value="1988">1988</option>
														<option value="1987">1987</option>
														<option value="1986">1986</option>
														<option value="1985">1985</option>
														<option value="1984">1984</option>
														<option value="1983">1983</option>
														<option value="1982">1982</option>
														<option value="1981">1981</option>
														<option value="1980">1980</option>
														<option value="1979">1979</option>
														<option value="1978">1978</option>
														<option value="1977">1977</option>
														<option value="1976">1976</option>
														<option value="1975">1975</option>
														<option value="1974">1974</option>
														<option value="1973">1973</option>
														<option value="1972">1972</option>
														<option value="1971">1971</option>
														<option value="1970">1970</option>
														<option value="1969">1969</option>
														<option value="1968">1968</option>
														<option value="1967">1967</option>
														<option value="1966">1966</option>
														<option value="1965">1965</option>
														<option value="1964">1964</option>
														<option value="1963">1963</option>
														<option value="1962">1962</option>
														<option value="1961">1961</option>
														<option value="1960">1960</option>
														<option value="1959">1959</option>
														<option value="1958">1958</option>
														<option value="1957">1957</option>
														<option value="1956">1956</option>
														<option value="1955">1955</option>
														<option value="1954">1954</option>
														<option value="1953">1953</option>
														<option value="1952">1952</option>
														<option value="1951">1951</option>
														<option value="1950">1950</option>
														<option value="1949">1949</option>
														<option value="1948">1948</option>
														<option value="1947">1947</option>
														<option value="1946">1946</option>
														<option value="1945">1945</option>
														<option value="1944">1944</option>
														<option value="1943">1943</option>
														<option value="1942">1942</option>
														<option value="1941">1941</option>
														<option value="1940">1940</option>
														<option value="1939">1939</option>
														<option value="1938">1938</option>
														<option value="1937">1937</option>
														<option value="1936">1936</option>
														<option value="1935">1935</option>
														<option value="1934">1934</option>
														<option value="1933">1933</option>
														<option value="1932">1932</option>
														<option value="1931">1931</option>
														<option value="1930">1930</option>
														<option value="1929">1929</option>
														<option value="1928">1928</option>
														<option value="1927">1927</option>
														<option value="1926">1926</option>
														<option value="1925">1925</option>
														<option value="1924">1924</option>
														<option value="1923">1923</option>
														<option value="1922">1922</option>
														<option value="1921">1921</option>
														<option value="1920">1920</option>
														<option value="1919">1919</option>
														<option value="1918">1918</option>
														<option value="1917">1917</option>
														<option value="1916">1916</option>
														<option value="1915">1915</option>
														</select>
							<div className="divTxt">년</div>
								
							<div className="selCloneJo sel_month2_clone" id="sel_month2_clone" style={{minWidth:"8.399999999999999px"}}><span className="ctrl"><span className="arrow"></span></span><strong>월</strong><ul style={{height: "120px"}}><li className="on"><button type="button" value="">월</button></li><li className=""><button type="button" value="1">1</button></li><li className=""><button type="button" value="2">2</button></li><li className=""><button type="button" value="3">3</button></li><li className=""><button type="button" value="4">4</button></li><li className=""><button type="button" value="5">5</button></li><li className=""><button type="button" value="6">6</button></li><li className=""><button type="button" value="7">7</button></li><li className=""><button type="button" value="8">8</button></li><li className=""><button type="button" value="9">9</button></li><li className=""><button type="button" value="10">10</button></li><li className=""><button type="button" value="11">11</button></li><li className=""><button type="button" value="12">12</button></li></ul></div><select className="selectJo selectHide" title="월 선택" id="sel_month2" name="sel_month2" onChange={() => {}}>{/** setSelDay('2') */}
							<option value="">월</option>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
														<option value="6">6</option>
														<option value="7">7</option>
														<option value="8">8</option>
														<option value="9">9</option>
														<option value="10">10</option>
														<option value="11">11</option>
														<option value="12">12</option>
														</select>
							<div className="divTxt">월</div>
							<div className="selCloneJo sel_day2_clone" id="sel_day2_clone" style={{minWidth:"8.399999999999999px"}}><span className="ctrl"><span className="arrow"></span></span><strong>일</strong><ul style={{height: "24px"}}><li className="on"><button type="button" value="일">일</button></li></ul></div><select className="selectJo selectHide" title="일 선택" id="sel_day2" name="sel_day2" onChange={() => {}}> {/**birthdayCheck('2') */}
							<option>일</option>
							</select>
							<div className="divTxt">일</div>
						</td>
					</tr>
					
					<tr className="parentTr" style={{display:"none"}}>
						<td className="tit optInp">휴대폰 번호</td>
						<td className="cont">
							<div className="selCloneJo parentCelNum1_clone" id="parentCelNum1_clone" style={{minWidth:"8.399999999999999px"}}><span className="ctrl"><span className="arrow"></span></span><strong>010</strong><ul style={{height: "120px"}}><li className="on"><button type="button" value="010">010</button></li><li className=""><button type="button" value="011">011</button></li><li className=""><button type="button" value="016">016</button></li><li className=""><button type="button" value="017">017</button></li><li className=""><button type="button" value="019">019</button></li><li className=""><button type="button" value="131">131</button></li><li className=""><button type="button" value="135">135</button></li><li className=""><button type="button" value="138">138</button></li><li className=""><button type="button" value="137">137</button></li><li className=""><button type="button" value="150">150</button></li></ul></div><select className="selectJo selectHide" title="휴대폰 앞번호" id="parentCelNum1" name="parentCelNum1">
							<option value="010">010</option>
							<option value="011">011</option>
							<option value="016">016</option>
							<option value="017">017</option>
							<option value="019">019</option>
							<option value="131">131</option>
							<option value="135">135</option>
							<option value="138">138</option>
							<option value="137">137</option>
							<option value="150">150</option>
							</select>
							<div className="divTxt">-</div>
							<input type="text" id="parentCelNum2" name="parentCelNum2" className="inputJo w70" title="휴대폰 중간번호" maxLength={4} onKeyDown={(event) => {if(event.keyCode < 45 || event.keyCode > 57) return;}} />
							<div className="divTxt">-</div>
							<input type="text" id="parentCelNum3" name="parentCelNum3" className="inputJo w70" title="휴대폰 끝번호" maxLength={4} onKeyDown={(event) => {if(event.keyCode < 45 || event.keyCode > 57) return;}} />
								
							<input type="button" className="btn mj sml" value="인증" onClick={() => {}} />{/**sendSms(this); */}
						</td>
					</tr>
					
					<tr className="parentTr" style={{display:"none"}}>
						<td className="tit optInp">
							<label htmlFor="cerNum">인증번호</label>
						</td>
						<td className="cont">
							<input type="text" className="inputJo w140" id="cerNum" name="cerSmsNum" title="인증번호" />
							<input type="button" className="btn mj sml" value="확인" onClick={() => {}} /> {/**certSms(this); */}
							<div className="divTxt_guide2">
								<em className="smsTime"></em>
							</div>
						</td>
					</tr>
					
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<label htmlFor="mj_id" className="compulsory">아이디</label>
						</td>
						<td className="cont">
							<input type="text" className="inputJo w140 requ" id="memId" name="memId" onBlur={() => {}} alt="아이디" />{/**idCheck(); */}
						</td>
					</tr>
						
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<label htmlFor="mj_id" className="compulsory">비밀번호</label>
						</td>
						<td className="cont">
							<input type="password" className="inputJo w140 engnum requ" id="memPwd" name="memPwd" maxLength={15} />
							<div className="divTxt_guide">
								<em>비밀번호는 영문, 숫자만 사용할 수 있습니다. (6~15자)</em>
							</div>
						</td>
					</tr>
					
					<tr>
						<td className="tit">
							<Image src="url('/images/common/ico_check.png')" width={13} height={13} alt="필수" />
							<label htmlFor="mj_id_com" className="compulsory">비밀번호 확인</label>
						</td>
						<td className="cont">
							<input type="password" className="inputJo w140 requ" id="memPwdConfirm" name="memPwdConfirm" />
							<div className="divTxt_guide">
								<em>한번 더 입력해주세요. </em>
							</div>
						</td>
					</tr>
					
					<tr>
						<td className="tit optInp">
							수신동의
						</td>
						<td className="cont">
							<div className="divTxt">
								<input type="checkbox" id="chkEmail" name="chkEmail" checked={true} style={{WebkitAppearance: "checkbox"}} />
								<label htmlFor="chkEmail">e-mail 수신동의</label>
								
								<input type="checkbox" id="chkSms" name="chkSms" checked={true} style={{WebkitAppearance: "checkbox"}} />
								<label htmlFor="chkSms">sms 수신동의</label>
							</div>
							<div className="divTxt">* 동의 시 온맘닷컴의 소식을 수신하실 수 있습니다.</div>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
		<div className="btnWrap mgtS">
			<input type="button" className="btn mj big" id="addInp" value="추가 정보 입력" />
			<input type="button" className="btn big" value="입력 완료" onClick={() => {}} /> {/**saveInfo(); */}
		</div>

		<section className="sct infoInp addInp mgtM">
			<h3>추가입력사항</h3>
			<div className="guideTxt2">
				* 추가입력은 선택사항으로 입력 가능한 부분만 기록하셔도 무방합니다.
			</div>
				
			<table className="layoutTbl line">
				<colgroup>
					<col style={{width: "200px"}} />
					<col style={{width: "auto"}} />
				</colgroup>
				<tbody>
					<tr>
						<td className="tit optInp">국적</td>
						<td className="cont">
							<div className="selCloneJo sel_country_clone" id="sel_country_clone" style={{minWidth:"8.399999999999999px"}}><span className="ctrl"><span className="arrow"></span></span><strong>선택</strong><ul style={{height: "120px"}}><li className="on"><button type="button" value="0">선택</button></li><li className=""><button type="button" value="82">대한민국(82)</button></li><li className=""><button type="button" value="1">미국(1)</button></li><li className=""><button type="button" value="81">일본(81)</button></li><li className=""><button type="button" value="86">중국(86)</button></li><li className=""><button type="button" value="44">영국(44)</button></li><li className=""><button type="button" value="1">캐나다(1)</button></li><li className=""><button type="button" value="63">필리핀(63)</button></li><li className=""><button type="button" value="852">홍콩(852)</button></li></ul></div><select className="selectJo selectHide" title="국적 선택" id="sel_country" name="country" onChange={()=>{}}> {/**selectCountry(this) */}
								<option value="0" selected={true}>선택</option>
								<option value="82">대한민국(82)</option>
								<option value="1">미국(1)</option>
								<option value="81">일본(81)</option>
								<option value="86">중국(86)</option>
								<option value="44">영국(44)</option>
								<option value="1">캐나다(1)</option>
								<option value="63">필리핀(63)</option>
								<option value="852">홍콩(852)</option>
							</select>
						</td>
					</tr>
					
					<tr>
						<td className="tit optInp">우편번호 (Zip Code)</td>
						<td className="cont">
							<input type="text" className="inputJo w140" title="우편번호" id="zipcode" name="zipcode" readOnly={true} />
							<input type="button" className="btn mj sml btn_postLayPop" id="zipSearch" value="검색" onClick={() => {}} /> {/**execDaumPostCode() */}
						</td>
					</tr>
					<tr>
						<td className="tit optInp">주소</td>
						<td className="cont">
							<input type="text" className="inputJo w320" title="주소" id="address" name="addr1" readOnly={true} />
						</td>
					</tr>
					<tr>
						<td className="tit"></td>
						<td className="cont">
							<input type="text" className="inputJo w320" title="상세주소" id="address2" name="addr2" />
						</td>
					</tr>
					
					<tr>
						<td className="tit optInp">전화번호</td>
						<td className="cont">
							<input type="text" className="inputJo w140" name="telNum" maxLength={13} title="전화번호" />
						</td>
					</tr>
				</tbody>
			</table>
		</section>
    </div>;
}

export default Info;