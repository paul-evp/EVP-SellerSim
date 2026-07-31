import { Menu, Search, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center px-4 gap-4"
      style={{ backgroundColor: '#131921' }}
      data-testid="top-bar"
    >
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-white hover:bg-white/10"
          data-testid="button-menu-toggle"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-light">seller central</span>
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            TRAINING MODE
          </span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search (Amazon Seller Central)"
            className="pl-10 bg-white border-0 h-9"
            data-testid="input-search"
          />
        </div>
      </div>

      {/* Right: Store selector + Notifications + User menu */}
      <div className="flex items-center gap-4">
        {/* Store Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-white text-xs">Selling in:</span>
          <Select defaultValue="acme">
            <SelectTrigger className="bg-transparent border-white/20 text-white h-8 w-48" data-testid="select-store">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme">Acme Home Goods</SelectItem>
              <SelectItem value="trailhead">Trailhead Outdoors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 relative"
          data-testid="button-notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            3
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 gap-2 h-auto py-1"
              data-testid="button-user-menu"
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-gray-600 text-white text-xs">
                  TA
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">Training Account</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem data-testid="menu-item-account">My Account</DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-switch">Switch Accounts</DropdownMenuItem>
            <DropdownMenuItem data-testid="menu-item-signout">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
