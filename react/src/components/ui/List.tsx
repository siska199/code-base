import { TItemList } from "@types";
import Badge from "./Badge";
import variantBadge from "@lib/utils/variants/ui/variant-badge";
import { cn } from "@lib/utils/helper";

interface TProps {
  items: TItemList[];
  customeClass?: {
    ul?: string;
    li?: string;
    label?: string;
  };
  title?: string;
  variantBadge?: {
    [key: number]: keyof typeof variantBadge;
  };
}

const List = (props: TProps) => {
  const { title, items, customeClass, variantBadge, ...attrs } = props;

  const renderItems = (items: TItemList[], level: number) => {
    return (
      <ul
        className={cn({
          "list-disc px-4 flex flex-col ": true,
          "ml-4": title,
          [customeClass?.ul || ""]: customeClass?.ul,
        })}
        {...attrs}
      >
        {items.map((item, i) => (
          <li key={i} className={` ${customeClass?.li} ${item?.label ? "my-1" : "mb-0"}`}>
            {item.label && (
              <Badge
                label={item.label}
                variant={variantBadge?.[level] || "soft-primary"}
                className={cn({
                  "mr-2 ": true,
                  [customeClass?.label || ""]: customeClass?.label,
                })}
              />
            )}
            {item.content}
            {item.childs && renderItems(item.childs, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {title && <Badge label={title} variant={"soft-warning"} />}
      {renderItems(items, 0)}
    </div>
  );
};

export default List;
