
const Prayerhouse = () => {
  return (
    <>
      <div className="container" >
        <ol className="breadcrumb mt-4">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">교회소개</a></li>
          <li className="breadcrumb-item active">능력기도원</li>
        </ol>
        <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">등록일</th>
            <th scope="col">조회</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4</td>
            <td>길...</td>
            <td>송인철</td>
            <td>2008.07.15</td>
            <td>3665</td>
          </tr>
        </tbody>
      </table>
      <div className="col-lg-12 text-lg-end text-center" >
        <button type="button" className="btn btn-outline-dark btn-sm mb-4 justify-content-end">글쓰기</button>
      </div>
      </div>
    </>
  );
}

export default Prayerhouse;
