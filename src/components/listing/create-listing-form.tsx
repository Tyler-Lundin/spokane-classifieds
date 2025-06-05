"use client";
import { DUMMY_LISTINGS } from "@/data/listings.data";
import { ItemCondition, ListingType, NewListingForm } from "@/types/app.types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CreateListingFormProps {
  mode?: 'create' | 'edit';
  listingId?: string;
}

export default function CreateListingForm({ mode = 'create', listingId }: CreateListingFormProps) {
    const router = useRouter();
    const [step, setStep] = useState<'type' | 'details'>(mode === 'edit' ? 'details' : 'type');
    const [loading, setLoading] = useState(false);
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

    // Fetch listing data if in edit mode
    useEffect(() => {
        if (mode === 'edit' && listingId) {
            // Find the listing in DUMMY_LISTINGS
            const listing = DUMMY_LISTINGS.find(l => l.id === listingId);
            if (listing) {
                setNewListing({
                    categoryId: listing.categoryId,
                    title: listing.title,
                    description: listing.description,
                    price: listing.price || 0,
                    currency: listing.currency,
                    imageUrls: listing.imageUrls,
                    location: listing.location,
                    condition: listing.condition,
                    type: listing.type,
                    willTrade: listing.willTrade,
                    tradeFor: listing.tradeFor || [],
                    tags: listing.tags || [],
                    featured: listing.featured || false,
                    featuredStrength: listing.featuredStrength || 0,
                    featuredUntil: listing.featuredUntil || new Date(),
                });
                setImagePreviewUrls(listing.imageUrls);
            }
        }
    }, [mode, listingId]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (mode === 'edit') {
                // TODO: Implement edit submission
                console.log('Editing listing:', listingId, newListing);
            } else {
                // TODO: Implement create submission
                console.log('Creating new listing:', newListing);
            }
            
            // Redirect to dashboard after successful submission
            router.push('/dashboard');
        } catch (error) {
            console.error('Error submitting listing:', error);
            // TODO: Show error message to user
        } finally {
            setLoading(false);
        }
    };

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
                <h2 className="text-xl font-bold uppercase tracking-widest text-center text-black dark:text-white">
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
                            className="p-6 border-2 border-black dark:border-white hover:border-b-4 transition-all duration-200 bg-white dark:bg-black text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                            <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                                {typeLabels[value as ListingType]}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
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
                            <label htmlFor="price" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newListing.price}
                                onChange={(e) => setNewListing({ ...newListing, price: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="currency" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Currency
                            </label>
                            <select
                                id="currency"
                                name="currency"
                                value={newListing.currency}
                                onChange={(e) => setNewListing({ ...newListing, currency: e.target.value })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            >
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="condition" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Condition
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                value={newListing.condition}
                                onChange={(e) => setNewListing({ ...newListing, condition: e.target.value as ItemCondition })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
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
                            <label htmlFor="price" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newListing.price}
                                onChange={(e) => setNewListing({ ...newListing, price: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="year" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Year
                            </label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={newListing.year || ''}
                                onChange={(e) => setNewListing({ ...newListing, year: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="mileage" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Mileage
                            </label>
                            <input
                                type="number"
                                id="mileage"
                                name="mileage"
                                value={newListing.mileage || ''}
                                onChange={(e) => setNewListing({ ...newListing, mileage: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>
                    </>
                );
            case ListingType.JOB:
                return (
                    <>
                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="salary" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Salary
                            </label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                value={newListing.salary || ''}
                                onChange={(e) => setNewListing({ ...newListing, salary: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="company" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={newListing.company || ''}
                                onChange={(e) => setNewListing({ ...newListing, company: e.target.value })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="employmentType" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Employment Type
                            </label>
                            <select
                                id="employmentType"
                                name="employmentType"
                                value={newListing.employmentType || ''}
                                onChange={(e) => setNewListing({ ...newListing, employmentType: e.target.value as 'full-time' | 'part-time' | 'contract' | 'temporary' })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
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
                            <label htmlFor="rent" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Rent
                            </label>
                            <input
                                type="number"
                                id="rent"
                                name="rent"
                                value={newListing.rent || ''}
                                onChange={(e) => setNewListing({ ...newListing, rent: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="bedrooms" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                id="bedrooms"
                                name="bedrooms"
                                value={newListing.bedrooms || ''}
                                onChange={(e) => setNewListing({ ...newListing, bedrooms: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="bathrooms" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                id="bathrooms"
                                name="bathrooms"
                                value={newListing.bathrooms || ''}
                                onChange={(e) => setNewListing({ ...newListing, bathrooms: e.target.valueAsNumber })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                            />
                        </div>

                        <div className="flex flex-col gap-1 z-10 relative">
                            <label htmlFor="leaseType" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Lease Type
                            </label>
                            <select
                                id="leaseType"
                                name="leaseType"
                                value={newListing.leaseType || ''}
                                onChange={(e) => setNewListing({ ...newListing, leaseType: e.target.value as 'month-to-month' | '6-months' | '1-year' | '2-years' })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
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
        <form onSubmit={handleSubmit} className="space-y-8">
            {step === 'type' ? (
                renderTypeSelection()
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white">
                            {mode === 'edit' ? 'Edit Listing Details' : 'Listing Details'}
                        </h2>
                        {mode === 'create' && (
                            <button
                                type="button"
                                onClick={() => setStep('type')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                Change Type
                            </button>
                        )}
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="title" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                value={newListing.title}
                                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                                placeholder="What are you selling?"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="description" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                value={newListing.description}
                                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
                                className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                                placeholder="Describe your item in detail..."
                            />
                        </div>

                        {renderFieldsForType(newListing.type)}
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wide text-black dark:text-white">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="city" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    value={newListing.location.city}
                                    onChange={(e) => setNewListing({
                                        ...newListing,
                                        location: { ...newListing.location, city: e.target.value }
                                    })}
                                    className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="state" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    required
                                    value={newListing.location.state}
                                    onChange={(e) => setNewListing({
                                        ...newListing,
                                        location: { ...newListing.location, state: e.target.value }
                                    })}
                                    className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="zip" className="text-sm uppercase tracking-wide font-bold text-black dark:text-white">
                                    ZIP
                                </label>
                                <input
                                    type="text"
                                    id="zip"
                                    name="zip"
                                    required
                                    value={newListing.location.zip}
                                    onChange={(e) => setNewListing({
                                        ...newListing,
                                        location: { ...newListing.location, zip: e.target.value }
                                    })}
                                    className="bg-white dark:bg-black border border-black dark:border-white px-3 py-1 text-sm tracking-wide text-black dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold uppercase tracking-wide text-black dark:text-white">Images</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {imagePreviewUrls.map((url, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
                                            setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {imagePreviewUrls.length < 9 && (
                                <label className="relative aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="mt-2 block text-sm text-gray-600 dark:text-gray-400">
                                            Add Images
                                        </span>
                                    </div>
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Create Listing'}
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}
