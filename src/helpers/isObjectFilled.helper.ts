// eslint-disable-next-line
export const isObjectFilled = (obj: any, excludeKeys: string[] = []): boolean => {
	for (const key in obj) {
		if (excludeKeys.includes(key)) continue
		if (obj[key] === null || obj[key] === '') return false
		if (Array.isArray(obj[key])) {
			for (const item of obj[key]) {
				if (!isObjectFilled(item, excludeKeys)) return false
			}
		}
	}
	return true
}
