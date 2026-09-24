import Link from "next/link";
import Image from "next/image";
import { getMenuItems } from "@/lib/data";

const MobileStickyMenu = async () => {
  const menuItems = await getMenuItems(3);

  if (menuItems.length === 0) return null;

  return (
    <nav
      aria-label="Mobile quick links"
      className="block md:hidden fixed bottom-0 left-0 right-0 z-30 flex h-14 items-center justify-around border-t bg-white shadow-md"
    >
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.link || "#"}
          className="flex flex-col items-center text-gray-600 transition-colors hover:text-blue-600"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt=""
              width={24}
              height={24}
              unoptimized
              className="h-6 w-6 object-contain"
            />
          ) : null}
          <span className="text-xs">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileStickyMenu;
