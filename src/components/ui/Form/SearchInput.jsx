import { Input } from "components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchInput({ onSearch, value }) {
  return (
    <Input
      value={value}
      onChange={(e) => onSearch(e.target.value)} // Only update state, don't trigger search
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        root: "shrink-0",
        input: "py-2 text-sm",
      }}
      placeholder="검색"
    />
  );
}
