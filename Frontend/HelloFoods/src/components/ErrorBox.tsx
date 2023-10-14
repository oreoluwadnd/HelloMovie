export default function ErrorBox({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="bg-100 w-full md:h-[92px]  rounded-2xl text-amber-400 py-8 px-[16.5px]">
      {errorMessage}
    </div>
  );
}
