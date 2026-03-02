import Image from "next/image";

export default function BackGround() {
    return (
        <div className="absolute top-0 left-0 right-0 z-0 w-full h-screen hidden lg:block">
<div className="absolute bottom-0 right-0 z-0">
  <div className="flex flex-col justify-end items-end"> 
  <Image src="/Pattern.png" alt="banner background" width={900} height={1000} />  
    <div className="flex flex-row"> <Image src="/Pattern.png" alt="banner background" width={900} height={1000} className="-mr-100"/> 
    <Image src="/Pattern.png" alt="banner background" width={900} height={1000} /></div>
    </div>
</div>
      <div className="relative h-screen max-w-7xl mx-auto ">
      <div className="absolute bottom-0 right-0 z-10">
        <Image src="/men.png" alt="men" width={500} height={600} />
        <div className="absolute bottom-0 right-0 z-10">
        
  <div className="w-0 h-0 
                  border-l-280 border-l-transparent
                  border-b-150 border-b-gray-100">
  </div>
</div>
</div>
      </div>
      
    </div>
  );
}