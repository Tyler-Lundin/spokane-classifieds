import Image from "next/image";


export default function ImageDisplay({ imageUrl }: { imageUrl?: string }) {


    if (!imageUrl) return <div className="w-full h-full aspect-square bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        <span className="text-sm text-gray-500">No image</span>
    </div>;

    return(
        <div className="w-full h-full aspect-square rounded-md overflow-hidden">
            <Image src={imageUrl} alt="Listing Image" width={400} height={192} className="object-cover w-full h-full aspect-square contrast-90 dark:contrast-50" />
        </div>
    )
}