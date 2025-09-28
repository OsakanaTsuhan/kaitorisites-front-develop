export default function PageHeader({title}: {title: string}) {
  return (
    <div className="w-2/3 lg:w-1/2 mx-auto text-center mb-12 flex items-center justify-center">
      {/* <h1 className="text-4xl md:text-5xl font-bold  leading-tight bg-gradient-to-r from-gradation-from to-gradation-to text-transparent bg-clip-text ">{title}</h1> */}
      <h1 className="text-4xl md:text-5xl font-bold text-fruit-gradient leading-tight text-transparent bg-clip-text ">{title}</h1>
    </div>
  );
}
