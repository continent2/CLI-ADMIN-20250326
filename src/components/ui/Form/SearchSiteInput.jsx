import { Input } from "components/ui";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchSiteInput() {
  return (
    <Input
      prefix={<MagnifyingGlassIcon className="size-6" />}
      classNames={{
        root: "h-full",
        input: "border-0 py-2 text-sm",
      }}
      placeholder="사이트 검색"
    />
  );
}
