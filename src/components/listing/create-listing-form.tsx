"use client";
import { CATEGORIES } from "@/data/categories.data";
import { ItemCondition, Listing, ListingStatus, ListingType, NewListingForm } from "@/types/app.types";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CreateListingForm() {
    const [step, setStep] = useState<'type' | 'details'>('type');
    const [newListing, setNewListing] = useState<NewListingForm>({
        categoryId: "",
        title: "",
        description: "",
        price: 0,
        currency: "USD",
        imageUrls: [],
        location: {
            city: "",
            state: "",
            zip: "",
        },
        condition: ItemCondition.NEW,
        type: ListingType.ITEM,
        willTrade: false,
        tradeFor: [],
        tags: [],
        featured: false,
        featuredStrength: 0,
        featuredUntil: new Date(),
    });

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = 9 - selectedImages.length;
        
        if (remainingSlots <= 0) {
            alert("Maximum 9 images allowed");
            return;
        }

        const newFiles = files.slice(0, remainingSlots);
        setSelectedImages(prev => [...prev, ...newFiles]);

        // Create preview URLs
        const previews = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviewUrls(prev => [...prev, ...previews]);
    };

    useEffect(() => {
        return () => {
            imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviewUrls]);

    const renderTypeSelection = () => {
        const typeLabels: Record<ListingType, string> = {
            [ListingType.ITEM]: "Item for Sale",
            [ListingType.VEHICLE]: "Vehicle Listing",
            [ListingType.JOB]: "Job Opportunity",
            [ListingType.HOUSING]: "Housing",
            [ListingType.SERVICE]: "Service",
            [ListingType.OTHER]: "Other",
        };

        return (
            <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-widest text-center">
                    What would you like to list?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(ListingType).map(([key, value]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setNewListing(prev => ({ ...prev, type: value as ListingType }));
                                setStep('details');
                            }}
                            className="p-6 border-2 border-black hover:border-b-4 transition-all duration-200 bg-white hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                                {typeLabels[value as ListingType]}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {getTypeDescription(value as ListingType)}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const getTypeDescription = (type: ListingType): string => {
        switch (type) {
            case ListingType.ITEM:
                return "List items for sale, trade, or give away";
            case ListingType.VEHICLE:
                return "Sell or trade cars, trucks, motorcycles, and more";
            case ListingType.JOB:
                return "Post job openings and employment opportunities";
            case ListingType.HOUSING:
                return "List apartments, houses, rooms, and other housing";
            case ListingType.SERVICE:
                return "Offer professional services and expertise";
            case ListingType.OTHER:
                return "List anything else that doesn't fit the above categories";
            default:
                return "";
        }
    };

    const renderFieldsForType = (type: ListingType) => {
        switch (type) {
            case ListingType.ITEM:
                return (
                    <>
                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="price" className="text-sm uppercase tracking-wide font-bold">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newListing.price}
                                onChange={(e) => setNewListing({ ...newListing, price: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="currency" className="text-sm uppercase tracking-wide font-bold">
                                Currency
                            </label>
                            <select
                                id="currency"
                                name="currency"
                                value={newListing.currency}
                                onChange={(e) => setNewListing({ ...newListing, currency: e.target.value })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            >
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="condition" className="text-sm uppercase tracking-wide font-bold">
                                Condition
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                value={newListing.condition}
                                onChange={(e) => setNewListing({ ...newListing, condition: e.target.value as ItemCondition })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            >
                                {Object.entries(ItemCondition).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                );
            case ListingType.VEHICLE:
                return (
                    <>
                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="price" className="text-sm uppercase tracking-wide font-bold">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newListing.price}
                                onChange={(e) => setNewListing({ ...newListing, price: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="year" className="text-sm uppercase tracking-wide font-bold">
                                Year
                            </label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={newListing.year || ''}
                                onChange={(e) => setNewListing({ ...newListing, year: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="mileage" className="text-sm uppercase tracking-wide font-bold">
                                Mileage
                            </label>
                            <input
                                type="number"
                                id="mileage"
                                name="mileage"
                                value={newListing.mileage || ''}
                                onChange={(e) => setNewListing({ ...newListing, mileage: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>
                    </>
                );
            case ListingType.JOB:
                return (
                    <>
                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="salary" className="text-sm uppercase tracking-wide font-bold">
                                Salary
                            </label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                value={newListing.salary || ''}
                                onChange={(e) => setNewListing({ ...newListing, salary: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="company" className="text-sm uppercase tracking-wide font-bold">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={newListing.company || ''}
                                onChange={(e) => setNewListing({ ...newListing, company: e.target.value })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="employmentType" className="text-sm uppercase tracking-wide font-bold">
                                Employment Type
                            </label>
                            <select
                                id="employmentType"
                                name="employmentType"
                                value={newListing.employmentType || ''}
                                onChange={(e) => setNewListing({ ...newListing, employmentType: e.target.value as 'full-time' | 'part-time' | 'contract' | 'temporary' })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            >
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="contract">Contract</option>
                                <option value="temporary">Temporary</option>
                            </select>
                        </div>
                    </>
                );
            case ListingType.HOUSING:
                return (
                    <>
                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="rent" className="text-sm uppercase tracking-wide font-bold">
                                Rent
                            </label>
                            <input
                                type="number"
                                id="rent"
                                name="rent"
                                value={newListing.rent || ''}
                                onChange={(e) => setNewListing({ ...newListing, rent: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="bedrooms" className="text-sm uppercase tracking-wide font-bold">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={newListing.bedrooms || ''}
                                onChange={(e) => setNewListing({ ...newListing, bedrooms: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="bathrooms" className="text-sm uppercase tracking-wide font-bold">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={newListing.bathrooms || ''}
                                onChange={(e) => setNewListing({ ...newListing, bathrooms: e.target.valueAsNumber })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="leaseType" className="text-sm uppercase tracking-wide font-bold">
                                Lease Type
                            </label>
                            <select
                                id="leaseType"
                                name="leaseType"
                                value={newListing.leaseType || ''}
                                onChange={(e) => setNewListing({ ...newListing, leaseType: e.target.value as 'month-to-month' | '6-months' | '1-year' | '2-years' })}
                                className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                            >
                                <option value="month-to-month">Month to Month</option>
                                <option value="6-months">6 Months</option>
                                <option value="1-year">1 Year</option>
                                <option value="2-years">2 Years</option>
                            </select>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <form
            className="max-w-2xl mx-auto border border-black dark:invert bg-[#f5f2e8] p-6 shadow-lg font-serif text-gray-900 space-y-6 relative h-full"
        >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 z-0 pointer-events-none" />

            <h1 className="text-2xl font-bold uppercase tracking-widest text-center border-b border-black pb-2 z-10 relative">
                Create New Listing
            </h1>

            {step === 'type' ? (
                renderTypeSelection()
            ) : (
                <>
                    <div className="flex items-center gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setStep('type')}
                            className="text-sm uppercase tracking-wide hover:underline"
                        >
                            ← Back to Type Selection
                        </button>
                    </div>

                    {/* FIELD GROUP */}
                    <div className="flex flex-col gap-1 z-10 relative">
                        <label htmlFor="title" className="text-sm uppercase tracking-wide font-bold">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newListing.title}
                            onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                            className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                        />
                    </div>

                    <div className="flex flex-col gap-1 z-10 relative">
                        <label htmlFor="description" className="text-sm uppercase tracking-wide font-bold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newListing.description}
                            onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                            rows={3}
                            className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                        />
                    </div>

                    {/* Conditionally render fields based on type */}
                    {renderFieldsForType(newListing.type)}

                    <div className="flex flex-col gap-1 z-10 relative">
                        <label htmlFor="images" className="text-sm uppercase tracking-wide font-bold">
                            Images ({selectedImages.length}/9)
                        </label>
                        <div className="border border-black p-4 bg-[#fefcf9]">
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                                disabled={selectedImages.length >= 9}
                            />
                            <label 
                                htmlFor="images" 
                                className={`block text-center py-2 border-2 border-dashed border-black cursor-pointer transition-colors duration-200 ${
                                    selectedImages.length >= 9 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'hover:bg-black hover:text-white'
                                }`}
                            >
                                {selectedImages.length >= 9 
                                    ? 'Maximum images reached' 
                                    : 'Click to upload images'}
                            </label>
                            
                            {/* Image Previews */}
                            {imagePreviewUrls.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {imagePreviewUrls.map((url, index) => (
                                        <div key={url} className="relative aspect-square border border-black">
                                            <Image
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                                    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
                                                }}
                                                className="absolute top-1 right-1 bg-black/50 text-white p-1 hover:bg-black/75"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <fieldset className="flex flex-col gap-1 z-10 relative">
                        <legend className="text-sm uppercase tracking-wide font-bold">Location</legend>
                        <input
                            type="text"
                            placeholder="City"
                            value={newListing.location.city}
                            onChange={(e) =>
                                setNewListing({ ...newListing, location: { ...newListing.location, city: e.target.value } })
                            }
                            className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            value={newListing.location.state}
                            onChange={(e) =>
                                setNewListing({ ...newListing, location: { ...newListing.location, state: e.target.value } })
                            }
                            className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                        />
                        <input
                            type="text"
                            placeholder="ZIP"
                            value={newListing.location.zip}
                            onChange={(e) =>
                                setNewListing({ ...newListing, location: { ...newListing.location, zip: e.target.value } })
                            }
                            className="bg-transparent border border-black px-3 py-1 text-sm tracking-wide"
                        />
                    </fieldset>

                    <div className="flex justify-center absolute bottom-0 left-1/2 w-fit h-fit -translate-x-1/2 bg-[#f5f2e8] translate-y-1/2">
                        <button type="submit" className="text-black border-b-6 border-t-1 border-x-1 hover:border-b-2 transition-all duration-300 px-4 py-1 text-2xl uppercase tracking-wide font-bold">
                            Create Listing
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}
