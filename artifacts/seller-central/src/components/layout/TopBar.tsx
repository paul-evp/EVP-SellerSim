import { Menu, Search, Bell, ChevronDown, HelpCircle, Settings2 } from "lucide-react";
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
      className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center px-3 sm:px-5 gap-3 border-b border-white/10"
      style={{ backgroundColor: "#172a3d" }}
      data-testid="top-bar"
    >
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-white hover:bg-white/10 h-9 w-9"
          data-testid="button-menu-toggle"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#f28b32] text-xs font-black tracking-tight text-[#172a3d]"
            aria-hidden="true"
          >
            EH
          </div>
          <span className="text-white text-sm font-semibold tracking-tight hidden sm:inline">EVP Hub Sim</span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search your workspace"
            className="pl-10 bg-[#f7f8f8] border-0 h-9 text-slate-700 placeholder:text-slate-500 rounded-sm"
            data-testid="input-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-[11px] hidden xl:inline">Store:</span>
          <Select defaultValue="evp-sarisari">
            <SelectTrigger className="bg-transparent border-white/20 text-white h-8 w-32 sm:w-40 text-xs" data-testid="select-store">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evp-sarisari">EVP Sarisari Store</SelectItem>
              <SelectItem value="trailhead">Trailhead Outdoors</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 relative"
          data-testid="button-notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 bg-[#f28b32] text-[#172a3d] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 hidden md:inline-flex" data-testid="button-help">
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white/80 hover:bg-white/10 hidden md:inline-flex" data-testid="button-settings">
          <Settings2 className="w-4 h-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 gap-2 h-auto py-1"
              data-testid="button-user-menu"
            >
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-[#2d8190] text-white text-xs">
                  AH
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden lg:inline">EVP Sarisari Store</span>
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