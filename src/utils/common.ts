export const isNullOrUndefined = (value: unknown): value is null | undefined => {
    return value === null || value === undefined
}

export const isUndefinedOrWhitespace = (s: string | undefined | null) => (
    isNullOrUndefined(s) || s.trim().length === 0
)

export const isDefinedNotEmpty = (s: string | undefined | null): s is string => (
    !isUndefinedOrWhitespace(s)
)