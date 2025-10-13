import MyEditForm from "@/components/my/MyEditForm";

export default function MyEditPage() {
  return (
    <div className="flex justify-center items-start w-full h-screen py-10">
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">
          내 정보 수정하기
        </h2>
        <MyEditForm />
      </div>
    </div>
  );
}
