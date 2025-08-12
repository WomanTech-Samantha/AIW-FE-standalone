export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>
        
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 개인정보의 처리목적</h2>
            <p>All-in-WOM(이하 '회사')은 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>회원가입 및 관리</li>
              <li>Instagram 계정 연동 및 콘텐츠 관리</li>
              <li>서비스 제공 및 개선</li>
              <li>고객 지원</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 수집하는 개인정보 항목</h2>
            <p>회사는 다음과 같은 개인정보를 수집합니다:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>필수항목: 이메일, 비밀번호, 이름</li>
              <li>선택항목: 전화번호, 프로필 이미지</li>
              <li>Instagram 연동: Instagram 사용자 ID, 사용자명, 계정 유형</li>
              <li>자동수집: 서비스 이용기록, 접속 IP 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 개인정보의 처리 및 보유기간</h2>
            <p>회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>회원정보: 회원탈퇴 시까지</li>
              <li>Instagram 연동정보: 연동해제 시까지</li>
              <li>서비스 이용기록: 3개월</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p>회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Instagram API: 콘텐츠 게시 및 관리 목적</li>
              <li>클라우드 서비스: 데이터 저장 및 처리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. 정보주체의 권리·의무 및 행사방법</h2>
            <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>개인정보 처리정지 요구권</li>
              <li>개인정보 열람요구권</li>
              <li>개인정보 정정·삭제요구권</li>
              <li>개인정보 처리정지 요구권</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. 개인정보보호책임자</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p><strong>개인정보보호책임자</strong></p>
              <p>성명: 개발팀</p>
              <p>이메일: privacy@allinwom.com</p>
              <p>연락처: 개발 중</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. 개인정보 처리방침 변경</h2>
            <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
          </section>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              시행일자: 2025년 1월 1일<br />
              최종 개정일: 2025년 1월 10일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}