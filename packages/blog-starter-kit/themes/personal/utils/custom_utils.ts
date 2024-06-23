export const getPublicURL = (key: string): string => {
	return `https://res.cloudinary.com/dulafvhbs/image/upload/v1719131243/${key}`;
};

export const getSVGAssetURL = (name: string): string => {
	return getPublicURL(`assets/${name}.svg`);
};
