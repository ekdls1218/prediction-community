export default function Header() {
  return (
    <div className="my-5 pb-5 flex items-center justify-between px-6">
      <h1 className="font-pyeongchang font-bold text-5xl text-primary-color">과연 맞을까?</h1>
      <nav className="flex space-x-6 text-gray-700 text-lg">
        <a href="/login" className="hover:text-primary-color">로그인</a>
        <a href="/signup" className="hover:text-primary-color">회원가입</a>
      </nav>
    </div>
  );
}