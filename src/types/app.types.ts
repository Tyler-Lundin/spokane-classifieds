// Classifieds App - Comprehensive Type Definitions

// Core App Entry Point
export interface App {
    User: User;
    Notification: Notification;
    Listing: Listing;
    Category: Category;
    Message: Message;
    Conversation: Conversation;
    SavedSearch: SavedSearch;
    Report: Report;
    Location: Location;
    Favorite: Favorite;
    Review: Review;
    ListingView: ListingView;
    Promotion: Promotion;
    Setting: UserSetting;
  }
  
  // User Model
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordHash: string;
    avatarUrl?: string;
    isVerified: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Notification
  export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum NotificationType {
    MESSAGE = "message",
    ALERT = "alert",
    LISTING = "listing",
    SYSTEM = "system",
  }
  
  // Listing
  export interface Listing {
    id: string;
    userId: string;
    categoryId: string;
    title: string;
    type: ListingType;
    willTrade?: boolean;
    tradeFor?: string[] | null;
    description: string;
    price?: number;
    currency?: string;
    imageUrls: string[];
    location: Location;
    status: ListingStatus;
    condition: ItemCondition;
    tags?: string[];
    featured?: boolean;
    featuredStrength?: number;
    featuredUntil?: Date;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
    // Vehicle specific fields
    year?: number;
    mileage?: number;
    // Job specific fields
    salary?: number;
    company?: string;
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'temporary';
    // Housing specific fields
    rent?: number;
    bedrooms?: number;
    bathrooms?: number;
    leaseType?: 'month-to-month' | '6-months' | '1-year' | '2-years';
    // Service specific fields
    serviceType?: 'personal' | 'business';
    serviceDescription?: string;
    // Other specific fields
    otherType?: string;
    otherDescription?: string;
    // Event specific fields
    eventDate?: Date;
    eventLocation?: string;
    eventDescription?: string;
  }

  export interface NewListingForm {
    title: string;
    categoryId: string;
    type: ListingType;
    willTrade?: boolean;
    tradeFor?: string[] | null;
    description: string;
    price?: number;
    currency?: string;
    imageUrls: string[];
    location: Location;
    condition: ItemCondition;
    tags?: string[];
    featured?: boolean;
    featuredStrength?: number;
    featuredUntil?: Date;
    // Vehicle specific fields
    year?: number;
    mileage?: number;
    // Job specific fields
    salary?: number;
    company?: string;
    employmentType?: 'full-time' | 'part-time' | 'contract' | 'temporary';
    // Housing specific fields
    rent?: number;
    bedrooms?: number;
    bathrooms?: number;
    leaseType?: 'month-to-month' | '6-months' | '1-year' | '2-years';
  } 
  
  export enum ListingType {
    ITEM = "item",
    VEHICLE = "vehicle",
    JOB = "job",
    HOUSING = "housing",
    SERVICE = "service",
    OTHER = "other",
  }

  export enum ListingStatus {
    ACTIVE = "active",
    PENDING = "pending",
    SOLD = "sold",
    EXPIRED = "expired",
  }
  
  export enum ItemCondition {
    NEW = "new",
    LIKE_NEW = "like_new",
    USED = "used",
    FOR_PARTS = "for_parts",
  }
  
  // Category
  export interface Category {
    id: string;
    name: string;
    slug: string;
    type: CategoryType;
    parentId?: string;
    iconUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum CategoryType {
    PRODUCT = "product",
    SERVICE = "service",
    JOB = "job",
    HOUSING = "housing",
    EVENT = "event",
    OTHER = "other",
  }
  
  // Messaging System
  export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Conversation {
    id: string;
    participantIds: string[];
    listingId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Saved Searches
  export interface SavedSearch {
    id: string;
    userId: string;
    query: string;
    categoryId?: string;
    filters: Record<string, any>;
    frequency: "daily" | "weekly" | "instant";
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Reports (Abuse / Spam / Scams)
  export interface Report {
    id: string;
    reporterId: string;
    listingId?: string;
    messageId?: string;
    reason: string;
    notes?: string;
    createdAt: Date;
  }
  
  // Geolocation
  export interface Location {
    city: string;
    state: string;
    zip: string;
    latitude?: number;
    longitude?: number;
  }
  
  // Favorites
  export interface Favorite {
    id: string;
    userId: string;
    listingId: string;
    createdAt: Date;
  }
  
  // Reviews
  export interface Review {
    id: string;
    reviewerId: string;
    revieweeId: string;
    listingId?: string;
    rating: number; // 1-5
    comment: string;
    createdAt: Date;
  }
  
  // Tracking Views
  export interface ListingView {
    id: string;
    listingId: string;
    viewerId?: string;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
  }
  
  // Featured/Promoted Listings
  export interface Promotion {
    id: string;
    listingId: string;
    type: PromotionType;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
  }
  
  export enum PromotionType {
    FEATURED = "featured",
    TOP = "top",
    HIGHLIGHTED = "highlighted",
  }
  
  // User Preferences
  export interface UserSetting {
    id: string;
    userId: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    darkMode: boolean;
    preferredCurrency: string;
    createdAt: Date;
    updatedAt: Date;
  }
  