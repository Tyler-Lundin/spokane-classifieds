import { NavLink } from "@/types/nav.types";
import { House, List, Mail, Plus, ScrollText, User } from "lucide-react";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: <House className="w-4 h-4" /> },
  { label: "Listings", href: "/listings", icon: <ScrollText className="w-4 h-4" /> },
  { label: "Categories", href: "/categories", icon: <List className="w-4 h-4" /> },
  { label: "Post", href: "/listings/new", icon: <Plus className="w-4 h-4" /> },
  { label: "Dashboard", href: "/dashboard", icon: <User className="w-4 h-4" /> },
  { label: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" /> },
];