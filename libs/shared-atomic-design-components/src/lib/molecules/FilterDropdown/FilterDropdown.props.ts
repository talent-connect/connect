export interface FilterDropdownProps {
  label: string
  className: string
  selected: string[]
  items: ({ label: string; value: string })[]
  onChange: (item: string) => void
}