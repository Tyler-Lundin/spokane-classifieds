import Image from "next/image";


export default function ListingImagesDisplay({ images }: { images: string[] }) {
    return (
        <div className="flex flex-col gap-4">
            {images.map((image) => (
                <Image key={image} src={image} alt="Listing Image" width={600} height={600} className="w-full h-full object-cover" />
            ))}
        </div>
    )
}