// Turns the guest list CSV into households. This is the only place that knows
// the CSV layout, so adapt it here once the final format is decided.
//
// Provisional format: one row per household, names separated by ";", and one
// gender per name in the same order (f/w/female or m/male).
//
//   names,genders
//   Anna Müller; Tom Müller; Mia Müller,f; m; f
//   John Smith,m
import { parse } from 'csv-parse/sync'

import type { Gender } from '../src/server/db/schema.ts'

export type ImportedGuest = { name: string; gender: Gender }
export type ImportedHousehold = { guests: ImportedGuest[] }

const genderAliases: Record<string, Gender> = {
  f: 'female',
  w: 'female',
  female: 'female',
  weiblich: 'female',
  m: 'male',
  male: 'male',
  männlich: 'male',
}

function splitList(value: string | undefined) {
  return (value ?? '')
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
}

export function parseGuestCsv(content: string): ImportedHousehold[] {
  const rows: Record<string, string>[] = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  })

  return rows.map((row, i) => {
    const line = i + 2
    const names = splitList(row.names)
    const genders = splitList(row.genders)
    if (names.length === 0) {
      throw new Error(`Row ${line}: no names found`)
    }
    if (genders.length !== names.length) {
      throw new Error(
        `Row ${line}: ${names.length} names but ${genders.length} genders`,
      )
    }
    return {
      guests: names.map((name, j) => {
        const gender = genderAliases[genders[j].toLowerCase()]
        if (!gender) {
          throw new Error(
            `Row ${line}: unknown gender "${genders[j]}" for ${name} (use f or m)`,
          )
        }
        return { name, gender }
      }),
    }
  })
}
