import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

const StringToBoolean = new Map([
    ['Yes', true],
    ['No', false],
    [undefined, false],
])

export function isHotZoneReportValid({dateOfIssue, validUntil}) {
    return isWithinRange(
        new Date(),
        startOfDay(dateOfIssue),
        endOfDay(validUntil)
    )
}

export function boolean(string) {
    return StringToBoolean.get(string)
}

export function normalizeTags(tags) {
    if (Array.isArray(tags)) {
        return Array.from(new Set(tags.map(tag => tag.trim().toLowerCase())))
    }
}
