"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getSVGAssetURL } from "../utils/custom_utils";

export default function ResourceNavbar({
	featuredSearches = [],
	topSearches = [],
	showSearchBar = true,
	sticky = false,
}) {
  type menuItem = {
    name: string;
    icon: string;
    url: string;
    target?: string;
  }
	const DEFAULT_SEARCH_PLACEHOLDER = "Search from 700+ resources";
	const defaultMenuItems: menuItem[] = [
		{
			name: "Share Feedback",
			icon: "message_icon",
			url: "https://forms.gle/cnggHzPDGdt8tUAd6",
		},
		{
			name: "Suggest Resources",
			icon: "chat",
			url: "https://forms.gle/4zuXqj2sw5quZST17",
		},
		{
			name: "About",
			icon: "about_us",
			url: "/about",
			target: "none",
		},
	];

	const mobileMenuExtraItems = [
		{ name: "Design Library", icon: "box", url: "/design-library" },
	];

	const searchParams = useSearchParams();

	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean | null>(null);
	const [searchPlaceholder, setSearchPlaceholder] = useState(
		DEFAULT_SEARCH_PLACEHOLDER
	);
	const [categorySelected, setCategorySelected] = useState(false);
	const [menuItems, setMenuItems] = useState<menuItem[]>([
		...defaultMenuItems,
		...mobileMenuExtraItems,
	]);

	useEffect(() => {
		setMenuItems(() =>
			isMobile
				? [...defaultMenuItems, ...mobileMenuExtraItems]
				: defaultMenuItems
		);
	}, [isMobile]);

	useEffect(() => {
		const categoryQParam = searchParams.get("category");
		setCategorySelected(() => !!categoryQParam);
	}, [searchParams]);

	useEffect(() => {
		// Handle resize
		const handleResize = () => {
			if (window.innerWidth < 768) {
				if (isMobile) return;
				setIsMobile(true);
			} else {
				if (!isMobile) return;
				setIsMobile(false);
			}
		};
		window.addEventListener("resize", handleResize);
		isMobile == null && setIsMobile(window.innerWidth < 768);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isMobile]);

	return (
		<nav
			className={
				(sticky ? "sticky top-0 border-b-[1px] border-offWhiteGrey/40 " : "") +
				"bg-black justify-between flex w-full flex-wrap items-center text-neutral-500 shadow-lg py-4 px-4 z-10"
			}
		>
			<div className="mx-4">
				<Link href="/">
					{categorySelected && isMobile ? (
						<div className="left-0 z-20 flex justify-between items-center gap-2 cursor-pointer text-white">
							<img className="rotate-180" src="/chevron_right.svg" />
							<span>Home</span>
						</div>
					) : (
						<Image src={getSVGAssetURL('logo')} alt="UIPedia Logo" width={90} height={22} />
					)}
				</Link>
			</div>

			<div className="flex gap-8 items-center text-[#e0e0e0] text-[14px] ">
				{isMobile === false && (
					<>
						<Link href="/design-library">
							<span className="flex items-center gap-2">
								<span>Design Library</span>
								<img
									className="mt-1"
									src={getSVGAssetURL('coming_soon')}
									alt="coming soon"
								/>
							</span>
						</Link>
						<span>Resources</span>
					</>
				)}
				<span className="relative [&>svg]:w-7 cursor-pointer">
					<div onClick={() => setMenuOpen((prev) => !prev)}>
						<svg
							width="31"
							height="31"
							viewBox="0 0 31 31"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="0.25"
								y="0.25"
								width="30.5"
								height="30.5"
								rx="4.75"
								stroke="url(#paint0_linear_55_71)"
								strokeWidth="0.5"
							/>
							<path d="M9 9H23" stroke="white" strokeLinecap="round" />
							<path d="M9 15H23" stroke="white" strokeLinecap="round" />
							<path d="M9 21H23" stroke="white" strokeLinecap="round" />
							<defs>
								<linearGradient
									id="paint0_linear_55_71"
									x1="-3.01389"
									y1="-4.30556"
									x2="35.7361"
									y2="34.0139"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="white" />
									<stop offset="0.473958" stopColor="white" stopOpacity="0.2" />
									<stop offset="1" stopColor="white" />
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div
						className={`${
							menuOpen ? "absolute" : "hidden"
						} w-max bg-[#212121] text-white p-2 right-0 top-[40px] rounded-xl`}
					>
						{menuItems.map((item, index) => (
							<div
								className="px-3 py-2 flex items-center gap-3"
								key={index}
								onClick={() =>
									window.open(
										item.url,
										item.target == "none" ? "_self" : "_blank"
									)
								}
							>
								<img src={getSVGAssetURL(item.icon)} alt={item.icon} />
								<span>{item.name}</span>
							</div>
						))}
					</div>
				</span>
			</div>
		</nav>
	);
}
