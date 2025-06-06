"use client";

import { ListingType, ItemCondition } from "@/types/app.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/categories.data";
import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown, Filter } from 'lucide-react';
import styles from './listing-filters.module.css';

interface Filters {
  categoryId: string;
  type: ListingType | 'all';
  minPrice: string;
  maxPrice: string;
  condition: ItemCondition | 'all';
  willTrade: boolean;
  hasPhotos: boolean;
  city: string;
  state: string;
  search: string;
  sortBy: 'price' | 'date' | 'views';
  sortOrder: 'asc' | 'desc';
}

export default function ListingFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  
  const [filters, setFilters] = useState<Filters>({
    categoryId: searchParams.get('categoryId') || 'all',
    type: searchParams.get('type') as ListingType || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    condition: searchParams.get('condition') as ItemCondition || 'all',
    willTrade: searchParams.get('willTrade') === 'true',
    hasPhotos: searchParams.get('hasPhotos') === 'true',
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    search: searchParams.get('search') || '',
    sortBy: (searchParams.get('sortBy') as 'price' | 'date' | 'views') || 'date',
    sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  });

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== false) {
        params.set(key, value.toString());
      }
    });

    router.push(`/listings?${params.toString()}`);
  }, [filters, router]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <Collapsible.Trigger className={`w-full flex items-center justify-between p-4 bg-white dark:bg-black border-b ${styles.trigger}`}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <span className="font-medium">FILTERS</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 ${styles.chevron}`}
          data-state={isOpen ? 'open' : 'closed'}
        />
      </Collapsible.Trigger>

      <Collapsible.Content className={styles.collapsibleContent}>
        <div className="space-y-4 p-4 bg-white dark:bg-black rounded-lg shadow">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <Input
              type="text"
              placeholder="Search listings..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ search: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={filters.categoryId} onValueChange={(value: string) => updateFilters({ categoryId: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="text-black dark:text-white bg-white dark:bg-black">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select value={filters.type} onValueChange={(value: ListingType | 'all') => updateFilters({ type: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(ListingType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Min Price</label>
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ minPrice: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Price</label>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ maxPrice: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Condition</label>
            <Select value={filters.condition} onValueChange={(value: ItemCondition | 'all') => updateFilters({ condition: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                <SelectItem value="all">Any Condition</SelectItem>
                {Object.values(ItemCondition).map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="City"
                value={filters.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ city: e.target.value })}
              />
              <Input
                type="text"
                placeholder="State"
                value={filters.state}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilters({ state: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="willTrade"
              checked={filters.willTrade}
              onCheckedChange={(checked: boolean) => 
                updateFilters({ willTrade: checked })
              }
            />
            <label htmlFor="willTrade" className="text-sm font-medium">
              Will Trade
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasPhotos"
              checked={filters.hasPhotos}
              onCheckedChange={(checked: boolean) => 
                updateFilters({ hasPhotos: checked })
              }
            />
            <label htmlFor="hasPhotos" className="text-sm font-medium">
              Has Photos
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <div className="grid grid-cols-2 gap-4">
              <Select value={filters.sortBy} onValueChange={(value: 'price' | 'date' | 'views') => updateFilters({ sortBy: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.sortOrder} onValueChange={(value: 'asc' | 'desc') => updateFilters({ sortOrder: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={() => {
              setFilters({
                categoryId: 'all',
                type: 'all',
                minPrice: '',
                maxPrice: '',
                condition: 'all',
                willTrade: false,
                hasPhotos: false,
                city: '',
                state: '',
                search: '',
                sortBy: 'date',
                sortOrder: 'desc',
              });
            }}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
} 